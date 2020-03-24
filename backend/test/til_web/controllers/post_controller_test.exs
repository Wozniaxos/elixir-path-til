defmodule TilWeb.PostControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}

  describe "GET /api/posts" do
    test "returns all existing posts with categories as public", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      insert(:post, categories: [first_category, second_category])
      insert(:post, categories: [first_category])

      response =
        conn
        |> get(Routes.post_path(conn, :index))


      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      [first_post, second_post] = parsed_response_body

      assert first_post["categoriesIds"] == [first_category.id, second_category.id]
      assert second_post["categoriesIds"] == [first_category.id]
    end
  end

  describe "GET /api/posts/:id" do
    test "returns particular post with categories as public", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      post_title = "Some post"

      post = insert(:post, title: post_title, categories: [first_category, second_category])

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["title"] == post_title
      assert parsed_response_body["categoriesIds"] == [first_category.id, second_category.id]
    end
  end

  describe "POST /api/posts" do
    test "creates post and returns 201 status with created post", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_title = "Some post title"
      post_body = "Some post body"

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: post_title,
          body: post_body,
          categoriesIds: []
        })

      assert response.status == 201

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      created_post = Repo.get_by(Post, title: post_title)

      assert created_post.title == post_title
      assert created_post.body == post_body

      assert parsed_response_body["title"] == post_title
      assert parsed_response_body["body"] == post_body
      assert parsed_response_body["author"]["email"] == current_user.email
    end

    test "creates post with proper categories", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_title = "Some post title"

      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      insert(:category, name: "Machine Learning")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: post_title,
          categoriesIds: [first_category.id, second_category.id]
        })

      assert response.status == 201

      %{categories: categories} = Repo.get_by(Post, title: post_title) |> Repo.preload([:categories])

      assert length(categories) == 2

      [post_first_category, post_last_category] = categories

      assert post_first_category.id == first_category.id
      assert post_last_category.id == second_category.id
    end

    test "throws 400 error when lack of title", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_body = "Some post body"

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          body: post_body,
          categories_ids: []
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["errors"]
    end

    test "throws 401 error when not authenticated", %{conn: conn} do
      post_body = "Some post body"

      response =
        conn
        |> post(Routes.post_path(conn, :create), %{
          body: post_body,
          categories_ids: []
        })

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
    end
  end

  describe "PUT /api/posts" do
    test "updates post and returns 200 status with updated post", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)

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

      post = insert(:post, categories: [first_category, second_category])

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: post_title,
          categoriesIds: [third_category.id]
        })

      assert response.status == 200

      %{categories: categories} = Repo.get!(Post, post.id) |> Repo.preload([:categories])

      assert length(categories) == 1

      [post_category] = categories

      assert post_category.id == third_category.id
    end

    test "throws 400 error when lack of title", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_body = "Some post body"
      post = insert(:post)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: "",
          body: post_body,
          categories_ids: []
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["errors"]
    end

    test "throws 401 error when no authenticated", %{conn: conn} do
      post_body = "Some post body"
      post = insert(:post)

      response =
        conn
        |> put(Routes.post_path(conn, :update, post.id), %{
          title: "",
          body: post_body,
          categories_ids: []
        })

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
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

    test "throws 401 error when no authenticated", %{conn: conn} do
      post = insert(:post)

      response =
        conn
        |> delete(Routes.post_path(conn, :delete, post.id))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
    end
  end
end
