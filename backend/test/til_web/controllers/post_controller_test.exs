defmodule TilWeb.PostControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}

  describe "GET /api/posts" do
    test "returns only public and reviewed posts for unauthenticated users", %{conn: conn} do
      insert(:post, title: "public post", is_public: true, reviewed: true)
      insert(:post, is_public: false, reviewed: false)
      insert(:post, is_public: false, reviewed: true)
      insert(:post, is_public: true, reviewed: false)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body) == 1
      [post] = parsed_response_body
      assert post["title"] == "public post"
    end

    test "returns only reviewed posts for authenticated users", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:post, title: "public reviewed post", is_public: true, reviewed: true)
      insert(:post, title: "internal reviewed post", is_public: false, reviewed: true)
      insert(:post, is_public: true, reviewed: false)
      insert(:post, is_public: false, reviewed: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body) == 2
      [first_post, second_post] = parsed_response_body
      assert first_post["title"] == "public reviewed post"
      assert second_post["title"] == "internal reviewed post"
    end

    test "returns posts with categories", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      insert(:post, reviewed: true, categories: [first_category, second_category])
      insert(:post, reviewed: true, categories: [first_category])

      response =
        conn
        |> get(Routes.post_path(conn, :index))


      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      [first_post, second_post] = parsed_response_body
      assert first_post["categories"] == [first_category.name, second_category.name]
      assert second_post["categories"] == [first_category.name]
    end

    test "returns all existing posts with proper reaction count", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      first_post = insert(:post, reviewed: true, is_public: true)
      second_post = insert(:post, reviewed: true, is_public: true)

      insert(:reaction, user_id: first_user.id, post_id: first_post.id)
      insert(:reaction, user_id: second_user.id, post_id: first_post.id)
      insert(:reaction, user_id: first_user.id, post_id: second_post.id)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      [first_responded_post, second_responded_post] = parsed_response_body
      assert first_responded_post["reactionCount"] == 2
      assert second_responded_post["reactionCount"] == 1
    end

    test "returns all existing posts with proper reactions", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      first_post = insert(:post, reviewed: true)
      second_post = insert(:post, reviewed: true)

      insert(:reaction, user_id: first_user.id, post_id: first_post.id)
      insert(:reaction, user_id: second_user.id, post_id: first_post.id)
      insert(:reaction, user_id: first_user.id, post_id: second_post.id)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      [first_responded_post, second_responded_post] = parsed_response_body

      [first_responded_reaction, second_responded_reaction] = first_responded_post["reactions"]
      [third_responded_reaction] = second_responded_post["reactions"]

      assert first_responded_reaction["user_uuid"] == first_user.uuid
      assert first_responded_reaction["post_id"] == first_post.id
      assert first_responded_reaction["user_id"] == nil

      assert second_responded_reaction["user_uuid"] == second_user.uuid
      assert second_responded_reaction["post_id"] == first_post.id
      assert second_responded_reaction["user_id"] == nil

      assert third_responded_reaction["user_uuid"] == first_user.uuid
      assert third_responded_reaction["post_id"] == second_post.id
      assert third_responded_reaction["user_id"] == nil
    end

    test "searches properly with post title > author name > category name > post body priority", %{conn: conn} do
      first_user = insert(:user, first_name: "Bruce", last_name: "Wayne")
      second_user = insert(:user, first_name: "Peter", last_name: "Parker")

      # No fit at all
      insert(:post, title: "No fit title 5", body: "no fit body", author: second_user, reviewed: true)
      # Only fit for post body
      insert(:post, title: "No fit title 4", body: "Bruce post body", author: second_user, reviewed: true)
      # Only fit for category name
      first_category = insert(:category, name: "Bruce category")
      second_category = insert(:category, name: "no fit category")
      insert(:post,
        title: "Not fit title 3",
        body: "some not fit body",
        author: second_user,
        reviewed: true,
        categories: [first_category, second_category]
      )
      # Only fit for author name
      insert(:post, title: "Not fit title", body: "some not fit body", author: first_user, reviewed: true)
      # Only fit for title
      insert(:post, title: "Bruce post", body: "some not fit body", author: second_user, reviewed: true)

      response =
        conn
        |> get(Routes.post_path(conn, :index), %{
          q: "bruce"
        })

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body) == 3
      [first_responded_post, second_responded_post, third_responded_post] = parsed_response_body

      assert first_responded_post["title"] == "Bruce post"
      assert second_responded_post["author"]["firstName"] == "Bruce"
      assert third_responded_post["body"] == "Bruce post body"
    end

    test "searches properly when authenticated", %{conn: conn} do
      first_user = insert(:user, first_name: "Bruce", last_name: "Wayne")
      {:ok, token, _} = encode_and_sign(first_user.uuid, %{})

      second_user = insert(:user, first_name: "Peter", last_name: "Parker")

      # No fit at all
      insert(:post, title: "No fit title 5", body: "no fit body", author: second_user, reviewed: true)
      # Only fit for post body
      insert(:post, title: "No fit title 4", body: "Bruce post body", author: second_user, reviewed: true)
      # Only fit for category name
      first_category = insert(:category, name: "Bruce category")
      second_category = insert(:category, name: "no fit category")
      insert(:post,
        title: "Not fit title 3",
        body: "some not fit body",
        author: second_user,
        reviewed: true,
        categories: [first_category, second_category]
      )
      # Only fit for author name
      insert(:post, title: "Not fit title", body: "some not fit body", author: first_user, reviewed: true, is_public: false)
      # Only fit for title
      insert(:post, title: "Bruce post", body: "some not fit body", author: second_user, reviewed: true, is_public: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_path(conn, :index), %{
          q: "bruce"
        })

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body) == 3
      [first_responded_post, second_responded_post, third_responded_post] = parsed_response_body

      assert first_responded_post["title"] == "Bruce post"
      assert second_responded_post["author"]["firstName"] == "Bruce"
      assert third_responded_post["body"] == "Bruce post body"
    end

    test "searches properly when not authenticated", %{conn: conn} do
      first_user = insert(:user, first_name: "Bruce", last_name: "Wayne")
      second_user = insert(:user, first_name: "Peter", last_name: "Parker")

      # No fit at all
      insert(:post, title: "No fit title 5", body: "no fit body", author: second_user, reviewed: true)
      # Only fit for post body
      insert(:post, title: "No fit title 4", body: "Bruce post body", author: second_user, reviewed: true)
      # Only fit for category name
      first_category = insert(:category, name: "Bruce category")
      second_category = insert(:category, name: "no fit category")
      insert(:post,
        title: "Not fit title 3",
        body: "some not fit body",
        author: second_user,
        reviewed: true,
        categories: [first_category, second_category]
      )
      # Only fit for author name
      insert(:post, title: "Not fit title", body: "some not fit body", author: first_user, reviewed: true, is_public: false)
      # Only fit for title
      insert(:post, title: "Bruce post", body: "some not fit body", author: second_user, reviewed: true, is_public: false)

      response =
        conn
        |> get(Routes.post_path(conn, :index), %{
          q: "bruce"
        })

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body) == 1
      [responded_post] = parsed_response_body

      assert responded_post["body"] == "Bruce post body"
    end
  end

  describe "GET /api/posts/:id" do
    test "returns particular post if public and reviewed for unauthenticated user", %{conn: conn} do
      post = insert(:post, reviewed: true, is_public: true, title: "public post")

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["title"] == "public post"
    end

    test "returns particular post if only reviewed for authenticated user", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})
      post = insert(:post, reviewed: true, is_public: false, title: "internal reviewed post")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["title"] == "internal reviewed post"
    end

    test "returns particular post with categories", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      post_title = "Some post"

      post = insert(:post, reviewed: true, title: post_title, categories: [first_category, second_category])

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["title"] == post_title
      assert parsed_response_body["categories"] == [first_category.name, second_category.name]
    end

    test "returns particular post with proper reaction count", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      post = insert(:post, reviewed: true)

      insert(:reaction, user_id: first_user.id, post_id: post.id)
      insert(:reaction, user_id: second_user.id, post_id: post.id)

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["reactionCount"] == 2
    end

    test "returns particular post with proper reactions data", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      post = insert(:post, reviewed: true)

      insert(:reaction, user_id: first_user.id, post_id: post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: post.id, type: "love")

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      [first_responded_reaction, second_responded_reaction] = parsed_response_body["reactions"]

      assert first_responded_reaction["user_uuid"] == first_user.uuid
      assert first_responded_reaction["post_id"] == post.id
      assert first_responded_reaction["user_id"] == nil
      assert first_responded_reaction["type"] == "like"

      assert second_responded_reaction["user_uuid"] == second_user.uuid
      assert second_responded_reaction["post_id"] == post.id
      assert second_responded_reaction["user_id"] == nil
      assert second_responded_reaction["type"] == "love"
    end

    test "does not return particular post if not public for unauthenticated users", %{conn: conn} do
      post = insert(:post, is_public: false, reviewed: true)

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "not found"}}
    end

    test "does not return particular post if not reviewed for authenticated users", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post, is_public: false, reviewed: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "not found"}}
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
          categories: []
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

    test "creates reviewed post and returns 201 status with created post", %{conn: conn} do
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
          categories: [],
          reviewed: true
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

    test "creates public post and returns 201 status with created post", %{conn: conn} do
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
          categories: [],
          reviewed: false,
          public: true
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
          categories: [first_category.name, second_category.name]
        })

      assert response.status == 201

      %{categories: categories} = Repo.get_by(Post, title: post_title) |> Repo.preload([:categories])

      assert length(categories) == 2

      [post_first_category, post_last_category] = categories

      assert post_first_category.id == first_category.id
      assert post_last_category.id == second_category.id
    end

    test "creates new categories as unofficial during post creation", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: "Some post title",
          categories: [first_category.name, second_category.name, "ML", "Vue"]
        })

      assert response.status == 201

      %{categories: categories} = Repo.get_by(Post, title: "Some post title") |> Repo.preload([:categories])
      assert length(categories) == 4
      [post_first_category, post_second_category, post_third_category, post_fourth_category] = categories
      assert post_first_category.id == first_category.id
      assert post_second_category.id == second_category.id
      assert post_third_category.name == "ML"
      assert post_third_category.official == false
      assert post_fourth_category.name == "Vue"
      assert post_fourth_category.official == false
      assert length(Repo.all(Category)) == 4
    end

    test "throws error while creating public and reviewed post", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:category, name: "Machine Learning")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: "Some post title",
          is_public: true,
          reviewed: true
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "can't create public reviewed post"}}
      assert length(Repo.all(Post)) == 0
    end

    test "throws 401 error when not authenticated", %{conn: conn} do
      post_body = "Some post body"

      response =
        conn
        |> post(Routes.post_path(conn, :create), %{
          body: post_body,
          categories: []
        })

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "unauthenticated"}}
    end
  end
end
