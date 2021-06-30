defmodule TilWeb.JSONAPI.ReactionView do
  use JSONAPI.View, type: "reactions"

  def fields do
    [:post_id, :type, :user_uuid]
  end
end
