defmodule Til.ShareableContent do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}

  def get_post(id), do: Repo.get!(Post, id) |> preload_post_data() |> Post.populate_reaction_count()

  def get_public_posts do
    public_posts_query = from p in Post, where: p.is_public == true and p.reviewed == true

    Repo.all(public_posts_query) |> preload_post_data() |> Enum.map(&Post.populate_reaction_count/1)
  end

  def get_internal_posts do
    public_posts_query = from p in Post, where: p.reviewed == true

    Repo.all(public_posts_query) |> preload_post_data() |> Enum.map(&Post.populate_reaction_count/1)
  end

  def get_post_by(attrs) do
    case Repo.get_by(Post, attrs) do
      nil -> nil
      post ->
        post
        |> preload_post_data()
        |> Post.populate_reaction_count()
    end
  end

  def create_post(author, attrs \\ %{}) do
    %Post{author_id: author.id}
    |> change_post(attrs)
    |> Repo.insert()
  end

  def update_post(post, attrs \\ %{}) do
    post
    |> change_post(attrs)
    |> Repo.update()
  end

  def delete_post(post), do: Repo.delete(post)

  def get_categories, do: Repo.all(Category)

  def get_or_create_category(name) do
    case Repo.get_by(Category, name: name) do
      nil -> %Category{name: name} |> Repo.insert!()
      category -> category
    end
  end

  def encode_post_id(id) do
    jwt_handler().encode_and_sign(
      id,
      %{},
      ttl: {100, :weeks}
    )
  end

  def decode_post_id(encoded) do
    jwt_handler().decode_and_verify(encoded)
  end

  #private

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

