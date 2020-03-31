defmodule Til.Policies.PostPolicyTest do
  # use ExUnit.Case
  use TilWeb.ConnCase
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.Post

  # setup do
  #   :ok = Ecto.Adapters.SQL.Sandbox.checkout(Til.Repo)
  # end

  describe "update" do
    test "returns ok when user is author of post" do
      user = insert(:user)
      post = insert(:post, author: user)

      assert Bodyguard.permit(Post, :update, user, post) == :ok
    end

    test "throws error when user is not author of post" do
      user = insert(:user)
      post = insert(:post)

      assert Bodyguard.permit(Post, :update, user, post) == {:error, :unauthorized}
    end
  end

  describe "delete" do
    test "returns ok when user is author of post" do
      user = insert(:user)
      post = insert(:post, author: user)

      assert Bodyguard.permit(Post, :delete, user, post) == :ok
    end

    test "throws error when user is not author of post" do
      user = insert(:user)
      post = insert(:post)

      assert Bodyguard.permit(Post, :delete, user, post) == {:error, :unauthorized}
    end
  end
end
