
defmodule TilWeb.Me.PostController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent
  alias Til.ShareableContent.Post

  def update(conn, %{"reviewed" => _}) do
    {:error, :unauthorized}
  end

  def update(%{private: %{:guardian_default_resource => current_user}} = conn, %{"id" => id} = params) do
    current_user = Accounts.get_user(current_user.uuid)

    with {:ok, post} <- ShareableContent.get_post(id),
         :ok <- Bodyguard.permit(Post, :update, current_user, post),
         {:ok, updated_post} <- ShareableContent.update_post(post, params)
    do
      conn
        |> put_status(:ok)
        |> put_view(TilWeb.PostView)
        |> render("show_with_nested.json", post: updated_post)
    end
  end

  def delete(%{private: %{:guardian_default_resource => current_user}} = conn, %{"id" => id}) do
    Accounts.get_user(current_user.uuid)

    with {:ok, post} <- ShareableContent.get_post(id),
         :ok <- Bodyguard.permit(Post, :delete, current_user, post),
         ShareableContent.delete_post(post)
    do
      conn
      |> put_status(:ok)
      |> json(%{})
    end
  end
end
