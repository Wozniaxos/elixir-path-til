defmodule TilWeb.UserController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent

  def index(conn, _) do
    conn
      |> put_status(:ok)
      |> render("index.json", users: Accounts.get_users())
  end

  def show(conn, %{"id" => user_uuid}) do
    conn
      |> put_status(:ok)
      |> render("show_with_nested.json", user: Accounts.get_user_by_with_posts(uuid: user_uuid), preload: [:posts])
  end
end
