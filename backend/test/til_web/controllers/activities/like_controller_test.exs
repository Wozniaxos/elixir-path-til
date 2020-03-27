defmodule TilWeb.Activities.LikeControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.ShareableContent
  alias Til.Repo
  alias Til.Activities.Like

  describe "POST /api/posts/likes" do
    test "creates like for post when not liked yet and returns ok", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_like_path(conn, :like, post.id))

      assert response.status == 200

      likes = Repo.all(Like)

      assert length(likes) == 1

      [like] = likes

      assert like.user_id == current_user.id
      assert like.post_id == post.id
    end

    test "does not create new like and throws error when post is already liked", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)
      insert(:like, user_id: current_user.id, post_id: post.id)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_like_path(conn, :like, post.id))

      assert response.status == 400

      likes = Repo.all(Like)

      assert length(likes) == 1

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      IO.inspect parsed_response_body

      assert not is_nil(parsed_response_body["errors"])
    end

    test "throws error when post doesn't exists", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_like_path(conn, :like, 12312497))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil(parsed_response_body["errors"])
    end

    test "throws error when user is not authenticated", %{conn: conn} do
      post = insert(:post)

      response =
        conn
        |> post(Routes.post_like_path(conn, :like, post.id))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
    end
  end

  describe "DELETE /api/posts/likes" do
    test "deletes like properly and returns ok", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)
      insert(:like, user_id: current_user.id, post_id: post.id)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.post_like_path(conn, :unlike, post.id))

      assert response.status == 200

      likes = Repo.all(Like)

      assert length(likes) == 0
    end

    test "throws error if like for post doesn't exists", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.post_like_path(conn, :unlike, 19238417))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["error"]["message"] == "not found"
    end

    test "throws error if not authenticated", %{conn: conn} do
      post = insert(:post)

      response =
        conn
        |> delete(Routes.post_like_path(conn, :unlike, post.id))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
    end
  end
end
