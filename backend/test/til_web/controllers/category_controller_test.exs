defmodule TilWeb.CategoryControllerTest do
  use TilWeb.ConnCase
  import Til.Factory
  import Til.Guardian

  describe "GET /api/categories" do
    test "returns all existing categories as public", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      response =
        conn
        |> get(Routes.category_path(conn, :index))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      [first_responded_category, second_responded_category] = parsed_response_body

      assert length(parsed_response_body) == 2

      assert first_responded_category["name"] == first_category.name
      assert second_responded_category["name"] == second_category.name
    end
  end

  describe "GET /api/categories/:id" do
    test "returns category with only reviewed and public assigned posts when not authenticated", %{conn: conn} do
      first_post = insert(:post, title: "first post", reviewed: true, is_public: true)
      second_post = insert(:post, title: "second post", reviewed: true, is_public: true)
      third_post = insert(:post, title: "third post", reviewed: true, is_public: false)
      fourth_post = insert(:post, title: "fourth post", reviewed: false, is_public: true)

      first_category = insert(:category, name: "Elixir", posts: [first_post, second_post, third_post, fourth_post])

      response =
        conn
        |> get(Routes.category_path(conn, :show, first_category.id))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      %{ "posts" => posts } = parsed_response_body

      assert length(posts) == 2

      [first_responded_post, second_responded_post] = posts

      assert first_responded_post["title"] == first_post.title
      assert second_responded_post["title"] == second_post.title
    end

    test "returns category with only reviewd posts when authenticated", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      first_post = insert(:post, title: "first post", reviewed: true, is_public: true)
      second_post = insert(:post, title: "second post", reviewed: true, is_public: true)
      third_post = insert(:post, title: "third post", reviewed: true, is_public: false)
      fourth_post = insert(:post, title: "fourth post", reviewed: false, is_public: true)

      first_category = insert(:category, name: "Elixir", posts: [first_post, second_post, third_post, fourth_post])

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.category_path(conn, :show, first_category.id))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      %{ "posts" => posts } = parsed_response_body

      assert length(posts) == 3

      [first_responded_post, second_responded_post, third_responded_post] = posts

      assert first_responded_post["title"] == first_post.title
      assert second_responded_post["title"] == second_post.title
      assert third_responded_post["title"] == third_post.title
    end
  end
end
