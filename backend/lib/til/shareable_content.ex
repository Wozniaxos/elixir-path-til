defmodule Til.ShareableContent do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}
  alias Til.Notifications

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

  def get_approved_post(id) do
    get_post_by(id: id, reviewed: true)
  end

  def get_public_post(id) do
    get_post_by(id: id, is_public: true, reviewed: true)
  end

  def get_public_posts do
    public_posts_query = from p in Post, where: p.is_public == true and p.reviewed == true

    Repo.all(public_posts_query) |> preload_post_data() |> Enum.map(&Post.populate_reaction_count/1)
  end

  def get_approved_posts do
    public_posts_query = from p in Post, where: p.reviewed == true

    Repo.all(public_posts_query) |> preload_post_data() |> Enum.map(&Post.populate_reaction_count/1)
  end

  def create_post(_, %{"is_public" => true, "reviewed" => true}) do
    {:error, :public_reviewed_forbidden}
  end

  def create_post(author, %{"reviewed" => true} = attrs) do
    case %Post{author_id: author.id} |> change_post(attrs) |> Repo.insert() do
      {:ok, post} ->
        {:ok, post} = get_post(post.id)
        Notifications.notify_post_published(post)
        {:ok, post}
      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        {:error, :changeset, changeset}
    end
  end

  def create_post(author, attrs) do
    case %Post{author_id: author.id} |> change_post(attrs) |> Repo.insert() do
      {:ok, post} ->
        {:ok, post} = get_post(post.id)
        {:ok, encoded_id, _} = encode_post_id(post.id)
        Notifications.notify_post_created(post, encoded_id)
        {:ok, post}
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
      Notifications.notify_post_published(post)
      {:ok, post}
    else
      {:error, :not_found} -> {:error, :post_approved}
      {:error, %Ecto.Changeset{errors: _} = changeset} -> {:error, :changeset, changeset}
      {:error, _} -> {:error, :not_found}
    end
  end

  def get_categories, do: Repo.all(Category)

  #private

  defp get_or_create_category(name) do
    case Repo.get_by(Category, name: name) do
      nil -> %Category{name: name} |> Repo.insert!()
      category -> category
    end
  end

  defp encode_post_id(id) do
    jwt_handler().encode_and_sign(
      id,
      %{},
      ttl: {100, :weeks}
    )
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

