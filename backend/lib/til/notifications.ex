defmodule Til.Notifications do
  def notify_post_published(post) do
    message = build_notification_message(:post_published, post)
    Til.Notifications.NotificationSupervisor.run_notifier([:post_published, %{message: message}])
  end

  def notify_post_created(post, hashed_id) do
    message = build_notification_message(:post_created, post, hashed_id)
    Til.Notifications.NotificationSupervisor.run_notifier([:post_created, %{message: message}])
  end

  def build_notification_message(:post_published, post) do
    "#{author_string(post)} created post <#{frontend_host()}/posts/#{post.id}|#{post.title}> #{categories_string(post)}"
  end

  def build_notification_message(:post_created, post, hashed_id) do
    "#{author_string(post)} created post <#{frontend_host()}/review-posts?hashed_id=#{hashed_id}|#{post.title}> #{categories_string(post)}"
  end

  # private

  defp frontend_host, do: Application.get_env(:til, :frontend_host)
  defp categories_string(post), do: "#{Enum.map post.categories, &("##{&1.name} ")}"
  defp author_string(post), do: "#{post.author.first_name} #{post.author.last_name}"
end
