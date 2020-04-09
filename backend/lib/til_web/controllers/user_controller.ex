defmodule TilWeb.UserController do
  use TilWeb, :controller
  alias Til.Accounts

  def index(conn, _) do
    users = Accounts.get_users()

    conn
      |> put_status(:ok)
      |> render("index.json", users: users)
  end

  def show(conn, %{"id" => user_uuid}) do
    user = Accounts.get_user_with_public_posts(user_uuid)

    conn
      |> put_status(:ok)
      |> render("show_with_nested.json", user: user)
  end
end
