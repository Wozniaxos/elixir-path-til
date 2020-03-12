defmodule TilWeb.AuthController do
  use TilWeb, :controller
  plug Ueberauth
  alias Til.Accounts

  def request(conn, _), do: conn

  def callback(
    %{
      assigns: %{
        ueberauth_auth: %{
          info: %{email: email, first_name: first_name, last_name: last_name, image: image},
          credentials: %{token: token},
          uid: uid
        }
      }
    } = conn, _
  ) do
    case Accounts.get_user_by(email: email) do
      nil ->
        {:ok, user} =
          Accounts.create_user(%{
            email: email,
            first_name: first_name,
            last_name: last_name,
            image: image
          })
      user ->
    end

    {:ok, jwt, _} = jwt_handler().encode_and_sign(email)

    conn
    |> put_resp_header("authorization", "Bearer #{jwt}")
    |> redirect(
      external: "#{Application.get_env(:til, :frontend_host)}"
    )
  end

  defp jwt_handler do
    Application.get_env(:til, :guardian, Til.Guardian)
  end
end
