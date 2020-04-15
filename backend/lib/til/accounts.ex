defmodule Til.Accounts do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.Accounts.User
  alias Til.ShareableContent.Post

  def get_user(uuid), do: Repo.get_by(User, uuid: uuid)

  def get_user_by(attrs), do: Repo.get_by(User, attrs)

  def get_user_with_posts(uuid, only_public), do: Repo.get_by(User, uuid: uuid) |> preload_posts(only_public)

  def get_user_with_all_posts(uuid), do: Repo.get_by(User, uuid: uuid) |> preload_posts()

  def get_users, do: Repo.all(User)

  def get_users_with_posts(only_public), do: Repo.all(User) |> preload_posts(only_public)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs |> Map.merge(%{uuid: Ecto.UUID.generate}))
    |> Repo.insert()
  end

  # private

  defp preload_posts(user) do
    user |> Repo.preload([:posts])
  end

  defp preload_posts(user, only_public) do
    post_query = from p in Post, where: p.is_public in ^is_public_in(only_public) and p.reviewed == true
    user |> Repo.preload([posts: post_query])
  end

  defp is_public_in(true), do: [true]

  defp is_public_in(false), do: [true, false]
end
