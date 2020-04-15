defmodule Til.Statistics do
  alias Til.Accounts
  alias Til.Repo
  import Ecto.Query
  alias Til.Activities.Reaction
  alias Til.ShareableContent.Post
  alias Til.Statistics.UserStatistics

  def get_users_statistics(only_public) do
    Accounts.get_users_with_posts(only_public) |> Enum.map(fn user -> get_user_statistics(user, only_public) end)
  end

  def get_user_statistics(user, only_public) do
    default_users_statistics = %UserStatistics{user: user}

    statistics_fullfilment = %{
      post_count: length(user.posts),
      reactions_given: Map.merge(default_users_statistics.reactions_given, get_user_reactions(user.id)),
      reactions_received: Map.merge(default_users_statistics.reactions_received, get_user_received_reactions(user.id, only_public))
    }

    Map.merge(default_users_statistics, statistics_fullfilment)
  end

  # private

  defp get_user_reactions(user_id) do
    reactions_detailed_query =
      from r in Reaction,
        where: r.user_id == ^user_id,
        group_by: r.type,
        select: {r.type, count(r.type)}

    reactions_total_query =
      from r in Reaction,
        where: r.user_id == ^user_id,
        select: {"total", count(r.id)}

    reactions_total_query
    |> union(^reactions_detailed_query)
    |> Repo.all()
    |> Enum.into(%{}, fn {k, v} -> {String.to_atom(k), v} end)
  end

  defp get_user_received_reactions(user_id, only_public) do
    reactions_total_query =
      reactions_received_base_query(user_id, only_public)
      |> select([p, r], {"total", count(r.id)})

    reactions_detailed_query =
      reactions_received_base_query(user_id, only_public)
      |> group_by([p, r], r.type)
      |> select([p, r], {r.type, count(r.type)})

    reactions_total_query
    |> union(^reactions_detailed_query)
    |> Repo.all()
    |> Enum.into(%{}, fn {k, v} -> {String.to_atom(k), v} end)
  end

  defp reactions_received_base_query(user_id, only_public) do
    from p in Post,
      where: p.author_id == ^user_id and p.reviewed == true and p.is_public in ^is_public_in(only_public),
      join: r in Reaction,
      on: r.post_id == p.id
  end

  defp is_public_in(true), do: [true]

  defp is_public_in(false), do: [true, false]
end
