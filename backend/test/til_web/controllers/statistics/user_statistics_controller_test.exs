defmodule TilWeb.Statistics.UserStatisticsControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory

  describe "GET /api/statistics/users" do
    test "returns users with proper statistics", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      # First user posts
      first_post = insert(:post, author: first_user, reviewed: true)
      second_post = insert(:post, author: first_user, reviewed: true)

      # Second user posts
      third_post = insert(:post, author: second_user, reviewed: true)
      fourth_post = insert(:post, author: second_user, reviewed: true)

      # First user reactions
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "like")
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "love")
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "surprised")
      insert(:reaction, user_id: first_user.id, post_id: fourth_post.id, type: "funny")
      insert(:reaction, user_id: first_user.id, post_id: fourth_post.id, type: "like")

      # Second user reactions
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "funny")

      response =
        conn
        |> get(Routes.user_statistics_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == [
        %{
          "user" => %{
            "uuid" => first_user.uuid,
            "email" => first_user.email,
            "firstName" => first_user.first_name,
            "lastName" => first_user.last_name,
            "image" => first_user.image,
          },
          "postCount" => 2,
          "reactionsGiven" => %{
            "total" => 5,
            "like" => 2,
            "love" => 1,
            "funny" => 1,
            "surprised" => 1
          },
          "reactionsReceived" => %{
            "total" => 4,
            "like" => 2,
            "love" => 1,
            "funny" => 1,
            "surprised" => 0
          }
        },
        %{
          "user" => %{
            "uuid" => second_user.uuid,
            "email" => second_user.email,
            "firstName" => second_user.first_name,
            "lastName" => second_user.last_name,
            "image" => second_user.image,
          },
          "postCount" => 2,
          "reactionsGiven" => %{
            "total" => 4,
            "like" => 2,
            "love" => 1,
            "funny" => 1,
            "surprised" => 0
          },
          "reactionsReceived" => %{
            "total" => 5,
            "like" => 2,
            "love" => 1,
            "funny" => 1,
            "surprised" => 1
          }
        }
      ]
    end

    test "when no authenticated counts statistics only for reviewed and public posts", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      first_post = insert(:post, author: first_user, reviewed: true, is_public: true)
      second_post = insert(:post, author: first_user, reviewed: true, is_public: false)
      third_post = insert(:post, author: first_user, reviewed: false, is_public: true)
      fourth_post = insert(:post, author: first_user, reviewed: false, is_public: false)

      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: third_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: third_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: fourth_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: fourth_post.id, type: "love")

      response =
        conn
        |> get(Routes.user_statistics_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      [first_responded_user, _] = parsed_response_body
      assert first_responded_user["postCount"] == 1
      assert first_responded_user["reactionsReceived"] == %{
        "total" => 2,
        "like" => 1,
        "love" => 1,
        "funny" => 0,
        "surprised" => 0
      }
    end

    test "when authenticated counts statistics only for reviewed posts", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)
      {:ok, token, _} = encode_and_sign(first_user.uuid, %{})

      first_post = insert(:post, author: first_user, reviewed: true, is_public: true)
      second_post = insert(:post, author: first_user, reviewed: true, is_public: false)
      third_post = insert(:post, author: first_user, reviewed: false, is_public: true)
      fourth_post = insert(:post, author: first_user, reviewed: false, is_public: false)

      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: third_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: third_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: fourth_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: fourth_post.id, type: "love")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.user_statistics_path(conn, :index))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert response.status == 200
      [first_responded_user, _] = parsed_response_body
      assert first_responded_user["postCount"] == 2
      assert first_responded_user["reactionsReceived"] == %{
        "total" => 4,
        "like" => 2,
        "love" => 2,
        "funny" => 0,
        "surprised" => 0
      }
    end
  end

  describe "GET /api/statistics/users/:id" do
    test "returns particular user with relevant statistics", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      # First user posts
      first_post = insert(:post, author: first_user, reviewed: true)
      second_post = insert(:post, author: first_user, reviewed: true)

      # Second user posts
      third_post = insert(:post, author: second_user, reviewed: true)
      fourth_post = insert(:post, author: second_user, reviewed: true)

      # First user reactions
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "like")
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "love")
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "surprised")
      insert(:reaction, user_id: first_user.id, post_id: fourth_post.id, type: "funny")
      insert(:reaction, user_id: first_user.id, post_id: fourth_post.id, type: "like")

      # Second user reactions
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "funny")

      response =
        conn
        |> get(Routes.user_statistics_path(conn, :show, first_user.uuid))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{
        "user" => %{
          "uuid" => first_user.uuid,
          "email" => first_user.email,
          "firstName" => first_user.first_name,
          "lastName" => first_user.last_name,
          "image" => first_user.image,
        },
        "postCount" => 2,
        "reactionsGiven" => %{
          "total" => 5,
          "like" => 2,
          "love" => 1,
          "funny" => 1,
          "surprised" => 1
        },
        "reactionsReceived" => %{
          "total" => 4,
          "like" => 2,
          "love" => 1,
          "funny" => 1,
          "surprised" => 0
        }
      }
    end

    test "when no authenticated counts statistics only for reviewed and public posts", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      first_post = insert(:post, author: first_user, reviewed: true, is_public: true)
      second_post = insert(:post, author: first_user, reviewed: true, is_public: false)
      third_post = insert(:post, author: first_user, reviewed: false, is_public: true)
      fourth_post = insert(:post, author: first_user, reviewed: false, is_public: false)

      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: third_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: third_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: fourth_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: fourth_post.id, type: "love")

      response =
        conn
        |> get(Routes.user_statistics_path(conn, :show, first_user.uuid))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["postCount"] == 1
      assert parsed_response_body["reactionsReceived"] == %{
        "total" => 2,
        "like" => 1,
        "love" => 1,
        "funny" => 0,
        "surprised" => 0
      }
    end

    test "when authenticated counts statistics only for reviewed posts", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)
      {:ok, token, _} = encode_and_sign(first_user.uuid, %{})

      first_post = insert(:post, author: first_user, reviewed: true, is_public: true)
      second_post = insert(:post, author: first_user, reviewed: true, is_public: false)
      third_post = insert(:post, author: first_user, reviewed: false, is_public: true)
      fourth_post = insert(:post, author: first_user, reviewed: false, is_public: false)

      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: third_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: third_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: fourth_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: fourth_post.id, type: "love")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.user_statistics_path(conn, :show, first_user.uuid))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["postCount"] == 2
      assert parsed_response_body["reactionsReceived"] == %{
        "total" => 4,
        "like" => 2,
        "love" => 2,
        "funny" => 0,
        "surprised" => 0
      }
    end
  end
end
