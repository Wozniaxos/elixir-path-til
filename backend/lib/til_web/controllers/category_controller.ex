defmodule TilWeb.CategoryController do
  use TilWeb, :controller
  alias Til.ShareableContent

  def index(conn, _) do
    categories = ShareableContent.get_categories()

    conn
      |> put_status(:ok)
      |> render("index.json", categories: categories)
  end

  def show(conn, %{"id" => id}) do
    only_public_posts = is_nil conn.private[:guardian_default_resource]

    with {:ok, category} <- ShareableContent.get_category(id, only_public_posts) do
      conn
      |> put_status(:ok)
      |> render("show.json", category: category)
    end
  end
end
