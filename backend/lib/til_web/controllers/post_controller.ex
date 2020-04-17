defmodule TilWeb.PostController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent
  alias Til.Notifications

  def index(conn, params) do
    only_public = is_nil conn.private[:guardian_default_resource]
    posts = ShareableContent.get_posts(only_public, params)

    conn
      |> put_status(:ok)
      |> render("index_with_nested.json", posts: posts)
  end

  def show(conn, %{"id" => id}) do
    only_public = is_nil conn.private[:guardian_default_resource]

    with {:ok, post} <- ShareableContent.get_post(id, only_public) do
      conn
      |> put_status(:ok)
      |> render("show_with_nested.json", post: post)
    end
  end

  def create(%{private: %{:guardian_default_resource => current_user}} = conn, %{"reviewed" => false} = params) do
    author = Accounts.get_user(current_user.uuid)

    with {:ok, post} <- ShareableContent.create_post(author, params),
         {:ok, encoded_id} <- ShareableContent.encode_post_id(post.id)
    do
      Notifications.notify_post_created(post, encoded_id)

      conn
        |> put_status(:created)
        |> render("show_with_nested.json", post: post)
    end
  end

  def create(%{private: %{:guardian_default_resource => current_user}} = conn, params) do
    author = Accounts.get_user(current_user.uuid)

    with {:ok, post} <- ShareableContent.create_post(author, params) do
      Notifications.notify_post_published(post)

      conn
        |> put_status(:created)
        |> render("show_with_nested.json", post: post)
    end
  end
end
