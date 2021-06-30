defmodule TilWeb.JSONAPI.CategoryView do
  use JSONAPI.View, type: "categories"

  def fields do
    [:id, :name]
  end


  def relationships do
    [
      posts: TilWeb.JSONAPI.PostView,
    ]
  end
end
