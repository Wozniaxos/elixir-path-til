defmodule TilWeb.Posts.ReactionController do
  use TilWeb, :controller
  alias Til.Activities

  def react(%{private: %{:guardian_default_resource => current_user}} = conn, %{"post_id" => id, "type" => type}) do
    user = Til.Accounts.get_user(current_user.uuid)
    {post_id, ""} = Integer.parse(id)

    case Activities.react_to_post(post_id, user.id, type) do
      {:ok, _} ->
        conn
        |> put_status(:ok)
        |> json(%{})

      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> put_view(TilWeb.ErrorView)
        |> render("400.json", changeset: changeset)
    end
  end

  def unreact(%{private: %{:guardian_default_resource => current_user}} = conn, %{"post_id" => post_id, "type" => type}) do
    user = Til.Accounts.get_user(current_user.uuid)

    case Activities.unreact_to_post(post_id, user.id, type) do
      {:ok, _} ->
        conn
        |> put_status(:ok)
        |> json(%{})

      {:error, %{message: message}} ->
        conn
        |> put_status(:bad_request)
        |> put_view(TilWeb.ErrorView)
        |> render("400.json", message: message)
    end
  end
end
