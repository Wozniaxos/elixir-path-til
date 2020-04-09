defmodule Til.HTTPoisonMock do
  def post(_, _), do: {:ok, %{}}
end
