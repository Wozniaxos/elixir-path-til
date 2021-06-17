defmodule TilWeb.JSONAPI.UserView do
  use JSONAPI.View, type: "users"

  def fields do
    [:uuid, :email, :firstName, :lastName, :image]
  end

  def relationships do
    [
      posts: TilWeb.JSONAPI.PostView,
    ]
  end
end
