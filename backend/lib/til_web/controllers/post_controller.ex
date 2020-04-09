defmodule TilWeb.PostController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent
  alias Til.Notifications

  def index(%{private: %{:guardian_default_resource => _}} = conn, _) do
    posts = ShareableContent.get_internal_posts()

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
    case ShareableContent.get_post_by(id: id, reviewed: true) do
      nil ->
        conn
        |> put_status(:bad_request)
        |> put_view(TilWeb.ErrorView)
        |> render("400.json", message: "not found")

      post ->
        conn
        |> put_status(:ok)
        |> render("show_with_nested.json", post: post)
    end
  end

  def show(conn, %{"id" => id}) do
    case ShareableContent.get_post_by(id: id, is_public: true, reviewed: true) do
      nil ->
        conn
        |> put_status(:bad_request)
        |> put_view(TilWeb.ErrorView)
        |> render("400.json", message: "not found")

      post ->
        conn
        |> put_status(:ok)
        |> render("show_with_nested.json", post: post)
    end
  end

  def create(conn, %{"is_public" => true, "reviewed" => true}) do
    conn
    |> put_status(:bad_request)
    |> put_view(TilWeb.ErrorView)
    |> render("400.json", message: "can't create public reviewed post")
  end

  def create(%{private: %{:guardian_default_resource => current_user}} = conn, %{"reviewed" => true} = params) do
    author = Accounts.get_user(current_user.uuid)

    case ShareableContent.create_post(author, params) do
      {:ok, post} ->
        post = ShareableContent.get_post(post.id)
        Notifications.notify_post_published(post)

        conn
        |> put_status(:created)
        |> render("show_with_nested.json", post: post)

      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        render_changeset_error(conn, changeset)
    end
  end

  def create(%{private: %{:guardian_default_resource => current_user}} = conn, params) do
    author = Accounts.get_user(current_user.uuid)

    case ShareableContent.create_post(author, params) do
      {:ok, post} ->
        post = ShareableContent.get_post(post.id)

        {:ok, encoded_id, _} = ShareableContent.encode_post_id(post.id)
        Notifications.notify_post_created(post, encoded_id)

        conn
        |> put_status(:created)
        |> render("show_with_nested.json", post: post)

      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        render_changeset_error(conn, changeset)
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
