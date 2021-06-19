defmodule TilWeb.SchemaTest do
  use TilWeb.ConnCase
  import Til.Factory

  @posts_query """
  query Posts {
    posts {
      title,
      isPublic,
    }
  }
  """

  @register_mutation """
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
    }
  }
  """

  @login_mutation """
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
  """

  @create_post_mutation """
  mutation CreatePost($title: String!) {
    createPost(title: $title) {
      id
      title
    }
  }
  """

  test "query: posts returns only public and reviewed posts", %{conn: conn} do
    insert(:post, title: "public post", is_public: true, reviewed: true)
    insert(:post, is_public: false, reviewed: false)
    insert(:post, is_public: false, reviewed: true)
    insert(:post, is_public: true, reviewed: false)

    conn =
      post(conn, "/api/graphql", %{
        "query" => @posts_query
      })

    response = json_response(conn, 200)["data"]["posts"]
    assert length(response) == 1
    [post] = response
    assert post["title"] == "public post"
    assert post == %{"isPublic" => true, "title" => "public post"}
  end

  test "mutation: register", %{conn: conn} do
    conn =
      post(conn, "/api/graphql", %{
        "query" => @register_mutation,
        "variables" => %{email: "lol@lol.com", password: "somepassword"}
      })

    assert json_response(conn, 200) == %{
             "data" => %{"register" => %{"email" => "lol@lol.com"}}
           }
  end

  test "mutation: login throws error on wrong credentials", %{conn: conn} do
    conn =
      post(conn, "/api/graphql", %{
        "query" => @login_mutation,
        "variables" => %{email: "lol@lol.com", password: "somepassword"}
      })

    assert json_response(conn, 200) == %{
              "data" => %{"login" => nil}, "errors" => [%{"locations" => [%{"column" => 3, "line" => 2}], "message" => "Incorrect email or password", "path" => ["login"]}]
           }
  end

  test "mutation: login returns token on successed login", %{conn: conn} do
    conn =
      post(conn, "/api/graphql", %{
        "query" => @register_mutation,
        "variables" => %{email: "lol@lol.com", password: "somepassword"}
      })

    conn =
      post(conn, "/api/graphql", %{
        "query" => @login_mutation,
        "variables" => %{email: "lol@lol.com", password: "somepassword"}
      })

    assert json_response(conn, 200)["data"]["login"]["token"] !== nil
  end

  test "mutation: create_post returns error when no authorized", %{conn: conn} do
    conn =
      post(conn, "/api/graphql", %{
        "query" => @create_post_mutation,
        "variables" => %{title: "lol@lol.com"}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"createPost" => nil}, "errors" => [%{"locations" => [%{"column" => 3, "line" => 2}], "message" => "Not Authorized", "path" => ["createPost"]}]
     }
  end

  test "mutation: create_post creates post when authorized", %{conn: conn} do
    post(conn, "/api/graphql", %{
      "query" => @register_mutation,
      "variables" => %{email: "lol@lol.com", password: "somepassword"}
    })

    login_request =
      post(conn, "/api/graphql", %{
        "query" => @login_mutation,
        "variables" => %{email: "lol@lol.com", password: "somepassword"}
      })

    token = json_response(login_request, 200)["data"]["login"]["token"]

    create_post_request = conn
      |> put_req_header("authorization", "Bearer #{token}")
      |> post("/api/graphql", %{
        "query" => @create_post_mutation,
        "variables" => %{title: "lol post"}
      })

    assert json_response(create_post_request, 200)["data"]["createPost"]["title"] == "lol post"
  end
end
