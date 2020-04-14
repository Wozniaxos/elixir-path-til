defmodule TilWeb.FallbackController do
  use TilWeb, :controller

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:forbidden)
    |> put_view(TilWeb.ErrorView)
    |> render(:"403")
  end

  def call(conn, {:error, :changeset, changeset}) do
    render_error(conn, changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    render_error(conn, message: "not found")
  end

  def call(conn, {:error, :post_approved}) do
    render_error(conn, message: "post is already approved")
  end

  def call(conn, {:error, :public_reviewed_forbidden}) do
    render_error(conn, message: "can't create public reviewed post")
  end

  def call(conn, {:error, :wrong_post_token}) do
    render_error(conn, message: "wrong post token provided")
  end

  # private

  defp render_error(conn, params) do
    conn
    |> put_status(:bad_request)
    |> put_view(TilWeb.ErrorView)
    |> render("400.json", params)
  end
end


