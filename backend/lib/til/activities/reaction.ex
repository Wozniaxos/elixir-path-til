defmodule Til.Activities.Reaction do
  use Ecto.Schema
  import Ecto.Changeset
  alias Til.Accounts.User
  alias Til.ShareableContent.Post

  schema "reactions" do
    field :type, :string

    belongs_to :user, User
    belongs_to :post, Post

    timestamps()
  end

  def changeset(reaction, attrs) do
    reaction
    |> cast(attrs, [:user_id, :post_id, :type])
    |> validate_required([:user_id, :post_id, :type])
    |> validate_inclusion(:type, ["like", "funny", "love", "surprised"])
    |> foreign_key_constraint(:post_id)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:post_id, name: :user_post_reaction)
  end
end
