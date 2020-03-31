defmodule Til.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Til.ShareableContent.Post

  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :image, :string
    field :uuid, :string

    has_many :posts, Post, foreign_key: :author_id
  end

  def changeset(struct, params) do
    struct
    |> cast(params, [:uuid, :email, :first_name, :last_name, :image])
    |> validate_format(:email, ~r/@/)
    |> validate_required([:email, :uuid])
    |> unique_constraint(:email)
  end
end
