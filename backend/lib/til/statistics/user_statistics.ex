defmodule Til.Statistics.UserStatistics do
  @enforce_keys [:user]
  defstruct(
    user: %{},
    reactions_given: %{
      total: 0,
      like: 0,
      love: 0,
      funny: 0,
      surprised: 0
    },
    post_count: 0,
    reactions_received: %{
      total: 0,
      like: 0,
      love: 0,
      funny: 0,
      surprised: 0
    })
end
