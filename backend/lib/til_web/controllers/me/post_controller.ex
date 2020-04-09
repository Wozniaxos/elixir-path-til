
defmodule TilWeb.Me.PostController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent
  alias Til.ShareableContent.Post

  def update(conn, %{"reviewed" => _}) do
    conn
    |> put_status(:bad_request)
    |> put_view(TilWeb.ErrorView)
    |> render("400.json", message: "post reviewed property can't be modified")
  end

  def update(%{private: %{:guardian_default_resource => current_user}} = conn, %{"id" => id} = params) do
    post = ShareableContent.get_post(id)
    current_user = Accounts.get_user(current_user.uuid)

    with :ok <- Bodyguard.permit(Post, :update, current_user, post) do
      case ShareableContent.update_post(post, params) do
        {:ok, post} ->
          post = ShareableContent.get_post(post.id)

          conn
          |> put_status(:ok)
          |> put_view(TilWeb.PostView)
          |> render("show_with_nested.json", post: post)

        {:error, %Ecto.Changeset{errors: _} = changeset} ->
          render_changeset_error(conn, changeset)
      end
    end
  end

  def delete(%{private: %{:guardian_default_resource => current_user}} = conn, %{"id" => id}) do
    post = ShareableContent.get_post(id)
    current_user = Accounts.get_user(current_user.uuid)

    with :ok <- Bodyguard.permit(Post, :delete, current_user, post) do
      case ShareableContent.delete_post(post) do
        {:ok, _} ->
          conn
          |> put_status(:ok)
          |> json(%{})

        {:error, %Ecto.Changeset{errors: _} = changeset} ->
          render_changeset_error(conn, changeset)
      end
    end
  end

  # private

  defp render_changeset_error(conn, changeset) do
    conn
    |> put_status(:bad_request)
    |> put_view(TilWeb.ErrorView)
    |> render("400.json", changeset: changeset)
  end
end
