defmodule TilWeb.AuthControllerTest do
  use TilWeb.ConnCase
  import Til.Factory
  import Til.Guardian
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

  describe "GET /api/me" do
    test "returns current user", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.auth_path(conn, :me))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["uuid"] == current_user.uuid
      assert parsed_response_body["email"] == current_user.email
      assert parsed_response_body["firstName"] == current_user.first_name
      assert parsed_response_body["lastName"] == current_user.last_name
      assert parsed_response_body["image"] == current_user.image
    end

    test "throws error when not authenticated", %{conn: conn} do
      response =
        conn
        |> get(Routes.auth_path(conn, :me))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
    end
  end
end
