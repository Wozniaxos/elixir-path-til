defmodule Til.ShareableContent do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}
  alias Ecto.Adapters.SQL

  def get_post(id) do
    case Repo.get(Post, id) do
      nil -> {:error, :not_found}
      post ->
        {
          :ok,
          post
          |> preload_post_data()
          |> Post.populate_reaction_count()
        }
    end
  end

  def get_post_by(attrs) do
    case Repo.get_by(Post, attrs) do
      nil -> {:error, :not_found}
      post ->
        {
          :ok,
          post
          |> preload_post_data()
          |> Post.populate_reaction_count()
        }
    end
  end

  def get_hidden_post(hashed_id) do
    with {:ok, %{"sub" => id}} <- decode_post_id(hashed_id),
         {:ok, post} <- get_post_by(id: id, reviewed: false)
    do
      {:ok, post}
    else
      {:error, _} -> {:error, :not_found}
    end
  end

  def get_post(id, only_public) do
    get_post_by(id: id, reviewed: true, is_public: only_public)
  end

  def get_posts(only_public, %{"q" => search_query}) do
    sql = """
    select p.* from posts p
      join users u on u.id = p.author_id
      join lateral (
        select ts_rank_cd(
          setweight(to_tsvector(p.title), 'A')
          ||
          setweight(to_tsvector(u.first_name || ' ' || u.last_name), 'B')
          ||
          setweight(to_tsvector(p.body), 'D')
          ,
          plainto_tsquery($1)
        ) as rank
      ) ranks on true
      where ranks.rank > 0 and p.is_public = ANY($2) and p.reviewed = true
      order by ranks.rank desc, p.inserted_at desc
    """

    results = SQL.query!(Repo, sql, [search_query, is_public_in(only_public)])

    results.rows
      |> Enum.map(&Repo.load(Post, {results.columns, &1}))
      |> Repo.preload([:categories, :author, reactions: :user])
      |> Enum.map(&Post.populate_reaction_count/1)
  end

  def get_posts(only_public, _) do
    base_posts_query(only_public)
    |> Repo.all()
    |> Enum.map(&Post.populate_reaction_count/1)
  end

  def create_post(_, %{"is_public" => true, "reviewed" => true}) do
    {:error, :public_reviewed_forbidden}
  end

  def create_post(author, attrs) do
    case %Post{author_id: author.id} |> change_post(attrs) |> Repo.insert() do
      {:ok, post} -> get_post(post.id)
      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        {:error, :changeset, changeset}
    end
  end

  def update_post(post, attrs \\ %{}) do
    with {:ok, post} <- post |> change_post(attrs) |> Repo.update() do
      get_post(post.id)
    else
      {:error, %Ecto.Changeset{errors: _} = changeset} -> {:error, :changeset, changeset}
    end
  end

  def delete_post(post), do: Repo.delete(post)

  def approve_post(hashed_id) do
    with {:ok, %{"sub" => id}} <- decode_post_id(hashed_id),
         {:ok, post} <- get_post_by(id: id, reviewed: false),
         {:ok, post} <- update_post(post, %{reviewed: true})
    do
      {:ok, post}
    else
      {:error, :not_found} -> {:error, :post_approved}
      {:error, %Ecto.Changeset{errors: _} = changeset} -> {:error, :changeset, changeset}
      {:error, _} -> {:error, :not_found}
    end
  end

  def get_categories, do: Repo.all(Category)

  def encode_post_id(id) do
    jwt_handler().encode_and_sign(
      id,
      %{},
      ttl: {100, :weeks}
    )
  end

  #private

  defp base_posts_query(only_public) do
    from(
      p in Post,
      order_by: [desc: p.inserted_at],
      where: p.is_public in ^is_public_in(only_public) and p.reviewed == true,
      preload: [:categories, :author, reactions: :user]
    )
  end

  defp is_public_in(true), do: [true]

  defp is_public_in(false), do: [true, false]

  defp get_or_create_category(name) do
    case Repo.get_by(Category, name: name) do
      nil -> %Category{name: name} |> Repo.insert!()
      category -> category
    end
  end

  defp decode_post_id(encoded) do
    jwt_handler().decode_and_verify(encoded)
  end

  defp change_post(post, attrs) do
    category_names = if attrs["categories"], do: attrs["categories"], else: []
    categories = category_names |> Enum.map(&get_or_create_category/1)

    post
    |> Post.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:categories, categories)
  end

  defp preload_post_data(post_data), do: Repo.preload(post_data, [:categories, :author, reactions: :user])

  defp jwt_handler do
    Application.get_env(:til, :guardian, Til.Guardian)
  end
end

