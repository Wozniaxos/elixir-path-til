defmodule TilWeb.JSONAPI.PostView do
  use JSONAPI.View, type: "posts"

  def fields do
    [:id, :title, :body, :is_public, :reaction_count, :reviewed, :inserted_at]
  end

  def relationships do
    [
      author: {TilWeb.JSONAPI.UserView, :include},
      categories: TilWeb.JSONAPI.CategoryView,
      reactions: TilWeb.JSONAPI.ReactionView,
    ]
  end
end
