defmodule TilWeb.MeController do
  use TilWeb, :controller
  plug Ueberauth
  alias Til.Accounts

  def index(%{private: %{:guardian_default_resource => current_user}} = conn, _) do
    user = Accounts.get_user_with_all_posts(current_user.uuid)

    conn
    |> put_view(TilWeb.UserView)
    |> render("show_with_nested.json", user: user)
  end
end
