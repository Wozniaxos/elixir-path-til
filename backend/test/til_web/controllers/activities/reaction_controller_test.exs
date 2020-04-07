defmodule TilWeb.Activities.ReactionControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.ShareableContent
  alias Til.Repo
  alias Til.Activities.Reaction

  describe "POST /api/posts/reactions" do
    test "creates reaction given type for post when not reacted yet and returns ok", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)
      insert(:reaction, user_id: current_user.id, post_id: post.id, type: "love")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_reaction_path(conn, :react, post.id), %{
          type: "like"
        })

      assert response.status == 200

      reactions = Repo.all(Reaction)
      assert length(reactions) == 2
      [_, reaction] = reactions
      assert reaction.user_id == current_user.id
      assert reaction.post_id == post.id
      assert reaction.type == "like"
    end

    test "does not create new reaction and throws error when post is already reacted with given type", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)
      insert(:reaction, user_id: current_user.id, post_id: post.id, type: "like")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_reaction_path(conn, :react, post.id), %{
          type: "like"
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["errors"] == %{"post_id" => ["has already been taken"]}

      reactions = Repo.all(Reaction)
      assert length(reactions) == 1
    end

    test "does not create new reaction and throws error when not allowed reaction type", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_reaction_path(conn, :react, post.id), %{
          type: "someweirdnotallowedtype"
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["errors"] == %{"type" => ["is invalid"]}

      reactions = Repo.all(Reaction)
      assert length(reactions) == 0
    end

    test "throws error when post doesn't exists", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_reaction_path(conn, :react, 12312497), %{
          type: "like"
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["errors"] == %{"post_id" => ["does not exist"]}
    end

    test "throws error when user is not authenticated", %{conn: conn} do
      post = insert(:post)

      response =
        conn
        |> post(Routes.post_reaction_path(conn, :react, post.id))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["message"] == "unauthenticated"
    end
  end

  describe "DELETE /api/posts/reactions" do
    test "deletes reaction given type properly and returns ok", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)

      insert(:reaction, user_id: current_user.id, post_id: post.id, type: "like")
      insert(:reaction, user_id: current_user.id, post_id: post.id, type: "love")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.post_reaction_path(conn, :unreact, post.id, "like"))

      assert response.status == 200

      reactions = Repo.all(Reaction)
      assert length(reactions) == 1
    end

    test "throws error if reaction for post given type doesn't exists", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.post_reaction_path(conn, :unreact, 19238417, "like"))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["error"]["message"] == "not found"
    end

    test "throws error if user is not authenticated", %{conn: conn} do
      post = insert(:post)

      response =
        conn
        |> delete(Routes.post_reaction_path(conn, :unreact, post.id, "like"))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["message"] == "unauthenticated"
    end
  end
end
