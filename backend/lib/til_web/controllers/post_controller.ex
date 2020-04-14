defmodule TilWeb.PostController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent
  alias Til.Notifications

  def index(%{private: %{:guardian_default_resource => _}} = conn, _) do
    posts = ShareableContent.get_approved_posts()

    conn
      |> put_status(:ok)
      |> render("index_with_nested.json", posts: posts)
  end

  def index(conn, _) do
    posts = ShareableContent.get_public_posts()

    conn
      |> put_status(:ok)
      |> render("index_with_nested.json", posts: posts)
  end

  def show(%{private: %{:guardian_default_resource => _}} = conn, %{"id" => id}) do
    with {:ok, post} <- ShareableContent.get_approved_post(id) do
      conn
      |> put_status(:ok)
      |> render("show_with_nested.json", post: post)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, post} <- ShareableContent.get_public_post(id) do
      conn
      |> put_status(:ok)
      |> render("show_with_nested.json", post: post)
    end
  end

  def create(%{private: %{:guardian_default_resource => current_user}} = conn, params) do
    author = Accounts.get_user(current_user.uuid)

    with {:ok, post} <- ShareableContent.create_post(author, params) do
      conn
        |> put_status(:created)
        |> render("show_with_nested.json", post: post)
    end
  end
end
