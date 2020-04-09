defmodule TilWeb.Posts.ReviewControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.Post

  describe "GET /api/posts/:hashed_id/reviews" do
    test "returns post with hashed id", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post, title: "hashed post", is_public: false)
      insert(:post, title: "other post", is_public: false)

      {:ok, hashed_id, _} = encode_and_sign(post.id, %{})

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_review_path(conn, :show, hashed_id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["title"] == "hashed post"
    end

    test "returns error when invalid token", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:post, title: "hashed post", is_public: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_review_path(conn, :show, "somerandomstring"))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"error" => %{"message" => "not found"}}
    end

    test "returns error when user is not authenticated", %{conn: conn} do
      post = insert(:post, title: "hashed post", is_public: false)
      {:ok, hashed_id, _} = encode_and_sign(post.id, %{})

      response =
        conn
        |> get(Routes.post_review_path(conn, :show, hashed_id))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"message" => "unauthenticated"}
    end
  end

  describe "PUT /api/posts/:hashed_id/reviews" do
    test "returns and public post", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post, title: "hashed post", is_public: false)
      {:ok, hashed_id, _} = encode_and_sign(post.id, %{})

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_review_path(conn, :publish, hashed_id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert Repo.get!(Post, post.id).is_public == true

      assert parsed_response_body["isPublic"] == true
    end

    test "returns error when invalid token", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:post, title: "hashed post", is_public: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_review_path(conn, :publish, "somerandomstring"))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"error" => %{"message" => "not found"}}
    end

    test "returns error when user is not authenticated", %{conn: conn} do
      post = insert(:post, title: "hashed post", is_public: false)
      {:ok, hashed_id, _} = encode_and_sign(post.id, %{})

      response =
        conn
        |> put(Routes.post_review_path(conn, :publish, hashed_id))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"message" => "unauthenticated"}
    end
  end
end
