defmodule TilWeb.JSONAPI.PostController do
  use TilWeb, :controller
  # It allows to controll includes by queries
  plug JSONAPI.QueryParser, view: TilWeb.JSONAPI.PostView
  alias Til.ShareableContent

  def index(conn, params) do
    only_public = is_nil conn.private[:guardian_default_resource]
    posts = ShareableContent.get_posts(only_public, params)

    conn
      |> put_status(:ok)
      |> put_view(TilWeb.JSONAPI.PostView)
      |> render("index.json", %{data: posts})
  end

  def show(conn, %{"id" => id}) do
    only_public = is_nil conn.private[:guardian_default_resource]

    with {:ok, post} <- ShareableContent.get_post(id, only_public) do
      conn
      |> put_status(:ok)
      |> put_view(TilWeb.JSONAPI.PostView)
      |> render("show.json", %{data: post})
    end
  end
end
