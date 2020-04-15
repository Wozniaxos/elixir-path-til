defmodule TilWeb.UserControllerTest do
  use TilWeb.ConnCase
  import Til.Factory
  import Til.Guardian

  describe "GET /api/users" do
    test "returns all users as public", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      response =
        conn
        |> get(Routes.user_path(conn, :index))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      [first_responded_user, second_responded_user] = parsed_response_body

      assert first_responded_user["uuid"] == first_user.uuid
      assert second_responded_user["uuid"] == second_user.uuid
      assert first_responded_user["firstName"] == first_user.first_name
      assert second_responded_user["firstName"] == second_user.first_name
      assert first_responded_user["email"] == first_user.email
      assert second_responded_user["email"] == second_user.email
      assert first_responded_user["lastName"] == first_user.last_name
      assert second_responded_user["lastName"] == second_user.last_name
    end
  end

  describe "GET /api/users/:id" do
    test "returns particular user with only public posts when no authenticated", %{conn: conn} do
      user = insert(:user)
      insert(:post, title: "public post", author: user, is_public: true, reviewed: true)
      insert(:post, author: user, is_public: false, reviewed: true)

      response =
        conn
        |> get(Routes.user_path(conn, :show, user.uuid))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      assert parsed_response_body["uuid"] == user.uuid
      assert parsed_response_body["firstName"] == user.first_name
      assert parsed_response_body["email"] == user.email
      assert parsed_response_body["lastName"] == user.last_name

      assert length(parsed_response_body["posts"]) == 1

      [post] = parsed_response_body["posts"]

      assert post["title"] == "public post"
    end

    test "returns particular user with all reviewed posts when authenticated", %{conn: conn} do
      user = insert(:user)
      {:ok, token, _} = encode_and_sign(user.uuid, %{})
      insert(:post, title: "public post", author: user, is_public: true, reviewed: true)
      insert(:post, author: user, is_public: false, reviewed: true)


      post = insert(:post, reviewed: true, is_public: false, title: "internal reviewed post")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.user_path(conn, :show, user.uuid))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body["posts"]) == 2
    end
  end
end
