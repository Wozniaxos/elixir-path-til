defmodule Til.Accounts do
  import Ecto, warn: false
  alias Til.Repo
  alias Til.Accounts.User

  def get_user(id), do: Repo.get!(User, id)

  def get_user_by(attrs), do: Repo.get_by(User, attrs)

  def get_user_with_posts(id), do: Repo.get!(User, id) |> Repo.preload([:posts])

  def get_user_by_with_posts(attrs), do: Repo.get_by(User, attrs) |> Repo.preload([:posts])

  def get_users, do: Repo.all(User)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs |> Map.merge(%{uuid: Ecto.UUID.generate}))
    |> Repo.insert()
  end
end
