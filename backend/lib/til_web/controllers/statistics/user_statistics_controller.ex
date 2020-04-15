defmodule TilWeb.Statistics.UserStatisticsController do
  use TilWeb, :controller
  alias Til.Statistics
  alias Til.Accounts

  def index(conn, _) do
    only_public = is_nil conn.private[:guardian_default_resource]
    users_statistics = Statistics.get_users_statistics(only_public)

    conn
      |> put_status(:ok)
      |> render("index.json", users_statistics: users_statistics)
  end

  def show(conn, %{"id" => uuid}) do
    only_public = is_nil conn.private[:guardian_default_resource]
    user_statistics = Accounts.get_user_with_posts(uuid, only_public) |> Statistics.get_user_statistics(only_public)

    conn
      |> put_status(:ok)
      |> render("show.json", user_statistics: user_statistics)
  end
end
