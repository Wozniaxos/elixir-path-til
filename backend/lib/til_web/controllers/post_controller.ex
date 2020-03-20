defmodule TilWeb.PostController do
  use TilWeb, :controller

  def request(conn, _) do
    conn
    |> put_status(200)
    |> json(%{message: "Message from posts!"})
  end
end
