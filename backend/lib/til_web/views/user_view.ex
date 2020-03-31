defmodule TilWeb.UserView do
  use TilWeb, :view

  def render("index.json", %{users: users}) do
    users
    |> Enum.map(&serialize_user/1)
  end

  def render("show.json", %{user: user}) do
    serialize_user(user)
  end

  def render("show_with_nested.json", %{user: user}) do
    serialize_user(user, :nested)
  end

  defp serialize_user(user) do
    %{
      uuid: user.uuid,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      image: user.image
    }
  end

  defp serialize_user(user, :nested) do
    %{
      uuid: user.uuid,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      image: user.image,
      posts: render(TilWeb.PostView, "index.json", posts: user.posts)
    }
  end
end
