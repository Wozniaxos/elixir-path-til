defmodule TilWeb.AuthControllerTest do
  use TilWeb.ConnCase
  alias Til.Accounts

  describe "/auth/:provider/callback" do
    test "user gets created when requested email is NOT persisted in the database", %{conn: conn} do
      subject_email = "peter@parker.com"

      ueberauth_auth = %{
        credentials: %{token: "google_token"},
        info: %{email: subject_email, first_name: "Peter", last_name: "Parker", image: "some_image"},
        provider: :google,
        uid: "google_uid"
      }

      assert Accounts.get_user_by(email: subject_email) == nil

      conn
      |> assign(:ueberauth_auth, ueberauth_auth)
      |> get(Routes.auth_path(conn, :callback, "google"))

      created_user = Accounts.get_user_by(email: subject_email)

      assert created_user.email == subject_email
      assert created_user.first_name == "Peter"
      assert created_user.last_name == "Parker"
      assert created_user.image == "some_image"
      assert not is_nil created_user.uuid
    end

    test "returns 200 OK status with json containing token and user information", %{conn: conn} do
      ueberauth_auth = %{
        credentials: %{token: "google_token"},
        info: %{email: "peter@parker.com", first_name: "Peter", last_name: "Parker", image: "some_image"},
        provider: :google,
        uid: "google_uid"
      }

      conn =
        conn
        |> assign(:ueberauth_auth, ueberauth_auth)
        |> get(Routes.auth_path(conn, :callback, "google"))

      assert conn.status == 302

      assert String.contains?(
        conn.resp_body,
        "localhost:3000/auth?auth_token="
      )
    end
  end
end
