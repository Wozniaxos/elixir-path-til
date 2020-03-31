defmodule TilWeb.FallbackController do
  use TilWeb, :controller

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:forbidden)
    |> put_view(TilWeb.ErrorView)
    |> render(:"403")
  end
end
