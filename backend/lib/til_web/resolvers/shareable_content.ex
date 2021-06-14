defmodule TilWeb.Resolvers.ShareableContent do
  alias Til.ShareableContent

  def list_posts(_parent, _args, _context) do
    {:ok, ShareableContent.get_posts(true, nil)}
  end

  def list_categories(__parent, _args, _context) do
    {:ok, ShareableContent.get_categories()}
  end

  def create_post(__parent, args, %{context: %{current_user: current_user}}) do
    with {:ok, post} <- ShareableContent.create_post(current_user, Map.merge(args, %{author_id: current_user.id})) do
      {:ok, post}
    else
      {:error, _, _} -> {:error, "something went wrong"}
    end
  end

  def create_post(_parent, _args, _context), do: {:error, "Not Authorized"}
end
