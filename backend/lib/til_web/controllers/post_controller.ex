defmodule TilWeb.PostController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent
  alias Til.ShareableContent.Post

  def index(conn, _) do
    conn
      |> put_status(:ok)
      |> render("index_with_nested.json", posts: ShareableContent.get_posts)
  end

  def show(conn, %{"id" => id}) do
    conn
      |> put_status(:ok)
      |> render("show_with_nested.json", post: ShareableContent.get_post(id))
  end

  def create(conn, params) do
    current_user_uuid = conn.private.guardian_default_resource.uuid
    author = Accounts.get_user_by(uuid: current_user_uuid)

    case ShareableContent.create_post(author, params) do
      {:ok, post} ->
        conn
        |> put_status(:created)
        |> render("show_with_nested.json", post: ShareableContent.get_post(post.id))

      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        render_changeset_error(conn, changeset)
    end
  end

  def update(conn, %{"id" => id} = params) do
    current_user_uuid = conn.private.guardian_default_resource.uuid
    post = ShareableContent.get_post(id)
    current_user = Accounts.get_user_by(uuid: current_user_uuid)

    with :ok <- Bodyguard.permit(Post, :update, current_user, post) do
      case ShareableContent.update_post(post, params) do
        {:ok, post} ->
          conn
          |> put_status(:ok)
          |> render("show_with_nested.json", post: ShareableContent.get_post(post.id))

        {:error, %Ecto.Changeset{errors: _} = changeset} ->
          render_changeset_error(conn, changeset)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    current_user_uuid = conn.private.guardian_default_resource.uuid
    post = ShareableContent.get_post(id)
    current_user = Accounts.get_user_by(uuid: current_user_uuid)

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
