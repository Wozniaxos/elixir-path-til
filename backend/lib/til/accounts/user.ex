defmodule Til.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :image, :string
  end

  def changeset(struct, params) do
    struct
    |> cast(params, [:email, :first_name, :last_name, :image])
    |> validate_format(:email, ~r/@/)
    |> validate_required([:email])
    |> unique_constraint(:email)
  end
end
