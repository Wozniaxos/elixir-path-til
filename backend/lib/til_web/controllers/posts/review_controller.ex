defmodule TilWeb.Posts.ReviewController do
  use TilWeb, :controller
  alias Til.ShareableContent

  def show(conn, %{"post_id" => hashed_id}) do
    with {:ok, post} <- ShareableContent.get_hidden_post(hashed_id) do
      conn
        |> put_status(:ok)
        |> put_view(TilWeb.PostView)
        |> render("show_with_nested.json", post: post)
    end
  end


  def approve(conn, %{"post_id" => hashed_id}) do
    with {:ok, post} <- ShareableContent.approve_post(hashed_id) do
      conn
        |> put_status(:ok)
        |> put_view(TilWeb.PostView)
        |> render("show_with_nested.json", post: post)
    end
  end
end
