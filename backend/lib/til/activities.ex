defmodule Til.Activities do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.Activities.Reaction

  def get_user_reaction_for_post(post_id, user_id, type) do
    user_reaction_for_post_query =
      from r in Reaction,
        where: r.post_id == ^post_id and r.user_id == ^user_id and r.type == ^type

    Repo.one(user_reaction_for_post_query)
  end

  def react_to_post(post_id, user_id, type) do
    %Reaction{}
    |> Reaction.changeset(%{user_id: user_id, post_id: post_id, type: type})
    |> Repo.insert()
  end

  def unreact_to_post(post_id, user_id, type) do
    case get_user_reaction_for_post(post_id, user_id, type) do
      %Reaction{} = reaction -> delete_reaction(reaction)
      _ -> {:error, %{message: "not found"}}
    end
  end

  # private

  defp delete_reaction(reaction) do
    Repo.delete(reaction)
  end
end
