defmodule TilWeb.CategoryView do
  use TilWeb, :view
  alias Til.Repo

  def render("index.json", %{categories: categories}) do
    categories
    |> Enum.map(&serialize_post/1)
  end

  defp serialize_post(category) do
    %{
      id: category.id,
      name: category.name
    }
  end
end
