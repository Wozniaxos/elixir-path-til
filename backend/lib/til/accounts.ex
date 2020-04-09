defmodule Til.Accounts do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.Accounts.User
  alias Til.ShareableContent.Post

  def get_user(uuid), do: Repo.get_by(User, uuid: uuid)

  def get_user_by(attrs), do: Repo.get_by(User, attrs)

  def get_user_with_all_posts(uuid), do: Repo.get_by(User, uuid: uuid) |> preload_posts()

  def get_user_with_public_posts(uuid), do: Repo.get_by(User, uuid: uuid) |> preload_public_posts()

  def get_users, do: Repo.all(User)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs |> Map.merge(%{uuid: Ecto.UUID.generate}))
    |> Repo.insert()
  end

  # private

  defp preload_posts(user) do
    user |> Repo.preload([:posts])
  end

  defp preload_public_posts(user) do
    public_posts_query = from p in Post, where: p.is_public == true

    user |> Repo.preload([posts: public_posts_query])
  end
end
