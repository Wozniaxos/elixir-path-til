defmodule Til.ShareableContent.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Til.Accounts.User
  alias Til.ShareableContent.Category
  alias Til.Activities.Like

  schema "posts" do
    field :title, :string
    field :body, :string
    field :is_public, :boolean
    field :likes_count, :integer, virtual: true

    belongs_to :author, User
    has_many(:likes, Like)
    many_to_many :categories, Category, join_through: "posts_categories", on_replace: :delete, on_delete: :delete_all
    timestamps()
  end

  def changeset(post, attrs) do
    post
    |> cast(attrs, [
      :title,
      :body,
      :author_id,
      :is_public
    ])
    |> validate_required([:title])
    |> unique_constraint(:title)
  end

  def populate_likes_count(post) do
    %{post | likes_count: length(post.likes)}
  end
end
