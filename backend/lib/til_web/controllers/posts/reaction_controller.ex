defmodule TilWeb.Posts.ReactionController do
  use TilWeb, :controller
  alias Til.Activities

  def react(%{private: %{:guardian_default_resource => current_user}} = conn, %{"post_id" => post_id, "type" => type}) do
    user = Til.Accounts.get_user(current_user.uuid)

    with {:ok, _} <- Activities.react_to_post(post_id, user.id, type) do
      conn
      |> put_status(:ok)
      |> json(%{})
    end
  end

  def unreact(%{private: %{:guardian_default_resource => current_user}} = conn, %{"post_id" => post_id, "type" => type}) do
    user = Til.Accounts.get_user(current_user.uuid)

    with {:ok, _} <- Activities.unreact_to_post(post_id, user.id, type) do
      conn
      |> put_status(:ok)
      |> json(%{})
    end
  end
end
