defmodule Til.Factory do
  use ExMachina.Ecto, repo: Til.Repo
  alias Til.Accounts.User
  alias Til.ShareableContent.{Post, Category}
  alias Til.Activities.Reaction

  def user_factory do
    %User{
      uuid: Ecto.UUID.generate,
      email: sequence(:email, &"email-#{&1}@til.com"),
      first_name: "Peter",
      last_name: "Parker",
      image: "some_image"
    }
  end

  def post_factory do
    %Post{
      title: sequence(:title, &"post-title-#{&1}"),
      body: "some body",
      is_public: true,
      reviewed: false,
      reaction_count: 1,
      author: build(:user)
    }
  end

  def category_factory do
    %Category{
      name: sequence(:name, &"name-#{&1}")
    }
  end

  def reaction_factory do
    %Reaction{}
  end
end
