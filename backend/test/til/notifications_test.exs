
defmodule Til.NotificationsTest do
  use TilWeb.ConnCase
  import Til.Factory

  describe "post published notification" do
    test "builds notification message properly" do
      first_category = insert(:category)
      second_category = insert(:category)
      post = insert(:post, categories: [first_category, second_category])

      expected_message = "#{post.author.first_name} #{post.author.last_name} created post <#{Application.get_env(:til, :frontend_host)}/posts/#{post.id}|#{post.title}> ##{first_category.name} ##{second_category.name} "
      assert Til.Notifications.build_notification_message(:post_published, post) == expected_message
    end
  end

  describe "post created notification" do
    test "builds notification message properly" do
      first_category = insert(:category)
      second_category = insert(:category)
      post = insert(:post, categories: [first_category, second_category])

      expected_message = "#{post.author.first_name} #{post.author.last_name} created post <#{Application.get_env(:til, :frontend_host)}/review-posts?hashed_id=somehashedid|#{post.title}> ##{first_category.name} ##{second_category.name} "
      assert Til.Notifications.build_notification_message(:post_created, post, "somehashedid") == expected_message
    end
  end
end
