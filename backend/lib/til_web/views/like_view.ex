defmodule TilWeb.LikeView do
  use TilWeb, :view
  alias Til.Repo

  def render("index.json", %{likes: likes}) do
    likes
    |> Enum.map(&serialize_like/1)
  end

  defp serialize_like(like) do
    %{
      post_id: like.post_id,
      user_uuid: like.user.uuid
    }
  end
end
