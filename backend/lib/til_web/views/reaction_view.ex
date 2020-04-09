defmodule TilWeb.ReactionView do
  use TilWeb, :view

  def render("index.json", %{reactions: reactions}) do
    reactions
    |> Enum.map(&serialize_reaction/1)
  end

  defp serialize_reaction(reaction) do
    %{
      post_id: reaction.post_id,
      type: reaction.type,
      user_uuid: reaction.user.uuid
    }
  end
end
