defmodule TilWeb.MeControllerTest do
  use TilWeb.ConnCase
  import Til.Factory
  import Til.Guardian

  describe "GET /api/me" do
    test "returns current user with all posts", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:post, author: current_user, is_public: true)
      insert(:post, author: current_user, is_public: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.me_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["uuid"] == current_user.uuid
      assert parsed_response_body["email"] == current_user.email
      assert parsed_response_body["firstName"] == current_user.first_name
      assert parsed_response_body["lastName"] == current_user.last_name
      assert parsed_response_body["image"] == current_user.image
      assert length(parsed_response_body["posts"]) == 2
    end

    test "throws error when not authenticated", %{conn: conn} do
      response =
        conn
        |> get(Routes.me_path(conn, :index))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["message"] == "unauthenticated"
    end
  end
end
