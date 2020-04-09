defmodule Til.Notifications.NotificationSupervisor do
  use DynamicSupervisor

  def start_link(init_arg) do
    DynamicSupervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  def init(_init_arg) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  def run_notifier(params) do
    spec = {Til.Notifications.Notifiers.SlackNotifier, params}

    DynamicSupervisor.start_child(__MODULE__, spec)
  end
end
