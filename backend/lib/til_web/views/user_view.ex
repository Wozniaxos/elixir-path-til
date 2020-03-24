defmodule TilWeb.UserView do
  use TilWeb, :view

  def render("show.json", %{user: user}) do
    serialize_user(user)
  end

  defp serialize_user(user) do
    %{
      uuid: user.uuid,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      image: user.image
    }
  end
end
