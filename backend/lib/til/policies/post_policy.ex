defmodule Til.Policies.PostPolicy do
  @behaviour Bodyguard.Policy

  alias Til.Accounts.User
  alias Til.ShareableContent.Post

  def authorize(:update, %User{id: user_id}, %Post{author: %User{id: author_id}}) when user_id == author_id, do: :ok

  def authorize(:delete, %User{id: user_id}, %Post{author: %User{id: author_id}}) when user_id == author_id, do: :ok

  def authorize(_, _, _), do: :error
end
