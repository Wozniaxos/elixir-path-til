defmodule TilWeb.Context do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    case build_context(conn) do
      {:ok, context} ->
        put_private(conn, :absinthe, %{context: context})

      _ ->
        conn
    end
  end

  defp build_context(%{private: %{:guardian_default_resource => current_user}}) do
    {:ok, %{current_user: current_user} }
  end

  defp build_context(_conn) do
  end
end
