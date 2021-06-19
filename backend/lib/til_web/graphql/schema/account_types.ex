# lib/graphql_tutorial_web/schema/product_types.ex
defmodule TilWeb.GraphQL.Schema.AccountTypes do
  use Absinthe.Schema.Notation

  @desc "A user"
  object :user do
    field :id, :id
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :image, :string
    field :uuid, :string
    field :posts, list_of(:post)
  end

  @desc "session value"
  object :session do
    field(:token, :string)
    field(:user, :user)
  end
end
