defmodule TilWeb.CategoryController do
  use TilWeb, :controller
  alias Til.ShareableContent

  def index(conn, _) do
    categories = ShareableContent.get_categories()

    conn
      |> put_status(:ok)
      |> render("index.json", categories: categories)
  end
end
