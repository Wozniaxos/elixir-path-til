defmodule TilWeb.Posts.ReviewController do
  use TilWeb, :controller
  alias Til.ShareableContent
  alias Til.Notifications

  def show(conn, %{"post_id" => hashed_id}) do
    case ShareableContent.decode_post_id(hashed_id) do
      {:ok, %{"sub" => id}} ->
        post = ShareableContent.get_post(id)

        conn
        |> put_status(:ok)
        |> put_view(TilWeb.PostView)
        |> render("show_with_nested.json", post: post)

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> put_view(TilWeb.ErrorView)
        |> render("400.json", message: "not found")
    end
  end


  def publish(conn, %{"post_id" => hashed_id}) do
    case ShareableContent.decode_post_id(hashed_id) do
      {:ok, %{"sub" => id}} ->
        post = ShareableContent.get_post(id)

        case ShareableContent.update_post(post, %{is_public: true}) do
          {:ok, post} ->
            post = ShareableContent.get_post(post.id)
            Notifications.notify_post_published(post)

            conn
            |> put_status(:ok)
            |> put_view(TilWeb.PostView)
            |> render("show_with_nested.json", post: post)

          {:error, %Ecto.Changeset{errors: _} = changeset} ->
            conn
            |> put_status(:bad_request)
            |> put_view(TilWeb.ErrorView)
            |> render("400.json", changeset: changeset)
        end

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> put_view(TilWeb.ErrorView)
        |> render("400.json", message: "not found")
    end
  end
end
