defmodule TilWeb.CategoryView do
  use TilWeb, :view

  def render("index.json", %{categories: categories}) do
    categories
    |> Enum.map(&serialize_category/1)
  end

  def render("show.json", %{category: category}) do
    serialize_category(category, :with_posts)
  end

  # private

  defp serialize_category(category) do
    %{
      id: category.id,
      name: category.name,
    }
  end

  defp serialize_category(category, :with_posts) do
    %{
      id: category.id,
      name: category.name,
      posts: render(TilWeb.PostView, "index_with_nested.json", posts: category.posts)
    }
  end
end
