defmodule Til.Notifications.Notifiers.SlackNotifier do
  use GenServer, restart: :transient

  def start_link(notification_params) do
    GenServer.start_link(__MODULE__, notification_params)
  end

  def init(notification_params) do
    GenServer.cast(self(), notification_params)
    {:ok, %{}}
  end

  def handle_cast([:post_published, %{message: message}], _state) do
    body = Jason.encode!(%{text: message})

    with {:ok, _} <- http_adapter().post feed_hook(), body do {:stop, :normal, %{}} end
  end

  def handle_cast([:post_created, %{message: message}], _state) do
    body = Jason.encode!(%{text: message})

    with {:ok, _} <- http_adapter().post review_hook(), body do {:stop, :normal, %{}} end
  end

  def terminate(:normal, _state), do: :ok

  # private

  defp http_adapter, do: Application.get_env(:til, :http_adapter)
  defp review_hook, do: Application.get_env(:til, :slack_review_hook)
  defp feed_hook, do: Application.get_env(:til, :slack_feed_hook)
end


