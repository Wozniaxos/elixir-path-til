defmodule TilWeb.CategoryControllerTest do
  use TilWeb.ConnCase
  import Til.Factory

  describe "GET /api/categories" do
    test "returns all existing categories as public", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      response =
        conn
        |> get(Routes.category_path(conn, :index))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      [first_responded_category, second_responded_category] = parsed_response_body

      assert length(parsed_response_body) == 2

      assert first_responded_category["name"] == first_category.name
      assert second_responded_category["name"] == second_category.name
    end
  end
end
