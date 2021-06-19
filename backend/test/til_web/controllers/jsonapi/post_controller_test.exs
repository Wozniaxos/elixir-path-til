defmodule TilWeb.JSONAPI.PostControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}

  describe "GET /api/v2/posts" do
    test "returns only public and reviewed posts with included author", %{conn: conn} do
      first_post = insert(:post, title: "public post", is_public: true, reviewed: true)
      insert(:post, is_public: false, reviewed: false)
      insert(:post, is_public: false, reviewed: true)
      insert(:post, is_public: true, reviewed: false)

      response =
        conn
        |> get(Routes.jsonapi_post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert length(parsed_response_body["data"]) == 1
      [post] = parsed_response_body["data"]

      assert post["attributes"]["title"] == "public post"
      assert post["attributes"]["insertedAt"] !== nil

      [author] = parsed_response_body["included"]

      assert author["attributes"]["uuid"] !== nil
    end
  end

  describe "GET /api/posts/:id" do
    test "returns particular post if public and reviewed for unauthenticated user", %{conn: conn} do
      post = insert(:post, reviewed: true, is_public: true, title: "public post")

      response =
        conn
        |> get(Routes.jsonapi_post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["data"]["attributes"]["title"] == "public post"
    end
  end
end
