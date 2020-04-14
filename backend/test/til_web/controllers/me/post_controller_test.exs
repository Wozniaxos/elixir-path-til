defmodule TilWeb.Me.PostControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}

  describe "PUT /api/posts" do
    test "updates post and returns 200 status with updated post", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post, author: current_user)

      post_title = "Some updated post title"
      post_body = "Some updated post body"

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: post_title,
          body: post_body
        })

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      updated_post = Repo.get!(Post, post.id)

      assert updated_post.title == post_title
      assert updated_post.body == post_body

      assert parsed_response_body["title"] == post_title
      assert parsed_response_body["body"] == post_body
      assert parsed_response_body["author"]["email"] == post.author.email
    end

    test "updates post with proper categories", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_title = "Some post title"

      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      third_category = insert(:category, name: "Machine Learning")

      post = insert(:post, author: current_user, categories: [first_category, second_category])

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: post_title,
          categories: [third_category.name]
        })

      assert response.status == 200

      %{categories: categories} = Repo.get!(Post, post.id) |> Repo.preload([:categories])

      assert length(categories) == 1

      [post_category] = categories

      assert post_category.id == third_category.id
    end

    test "creates new categories as unofficial during post update", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      post = insert(:post, author: current_user, categories: [first_category, second_category])

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: "Some post title",
          categories: ["ML", "Vue"]
        })

      assert response.status == 200

      %{categories: categories} = Repo.get!(Post, post.id) |> Repo.preload([:categories])
      assert length(categories) == 2
      [first_post_category, second_post_category] = categories
      assert first_post_category.name == "ML"
      assert second_post_category.name == "Vue"
      assert first_post_category.official == false
      assert second_post_category.official == false
      assert length(Repo.all(Category)) == 4
    end

    test "throws error when not a post author", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)
      {:ok, token, _} = encode_and_sign(first_user.uuid, %{})

      post = insert(:post, author: second_user)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: "Some title",
        })

      assert response.status == 403

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"errors" => %{"detail" => "Forbidden"}}
    end

    test "throws error when trying to update reviewed property", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post, author: current_user)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_path(conn, :update, post.id), %{
          reviewed: true,
        })

      assert response.status == 403

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"errors" => %{"detail" => "Forbidden"}}
    end

    test "throws 400 error when lack of title", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_body = "Some post body"
      post = insert(:post, author: current_user)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: "",
          body: post_body,
          categories: []
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"title" => ["can't be blank"]}}
    end

    test "throws 401 error when no authenticated", %{conn: conn} do
      post_body = "Some post body"
      post = insert(:post)

      response =
        conn
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: "",
          body: post_body,
          categories: []
        })

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "unauthenticated"}}
    end
  end

  describe "DELETE /api/posts" do
    test "deletes post properly", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post, author: current_user)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.post_path(conn, :delete, post.id))

      assert response.status == 200

      assert length(Repo.all(Post)) == 0
    end

    test "deletes post without deleting categories", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      post = insert(:post, author: current_user, categories: [first_category, second_category])

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.post_path(conn, :delete, post.id))

      assert response.status == 200

      assert length(Repo.all(Category)) == 2
    end

    test "deletes post containing rections properly", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post, author: current_user)
      insert(:reaction, user_id: current_user.id, post_id: post.id, type: "love")
      insert(:reaction, user_id: current_user.id, post_id: post.id, type: "funny")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.post_path(conn, :delete, post.id))

      assert response.status == 200

      assert length(Repo.all(Post)) == 0
    end

    test "throws error when not a post author", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)
      {:ok, token, _} = encode_and_sign(first_user.uuid, %{})

      post = insert(:post, author: second_user)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.post_path(conn, :delete, post.id))

      assert response.status == 403

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"errors" => %{"detail" => "Forbidden"}}
    end

    test "throws 401 error when no authenticated", %{conn: conn} do
      post = insert(:post)

      response =
        conn
        |> delete(Routes.post_path(conn, :delete, post.id))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "unauthenticated"}}
    end
  end
end
