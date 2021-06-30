# lib/graphql_tutorial_web/schema/product_types.ex
defmodule TilWeb.GraphQL.Schema.ActivityTypes do
  use Absinthe.Schema.Notation

  @desc "A reaction"
  object :reaction do
    field :id, :id
    field :type, :string
    field :user, :user
    field :post, :post
  end
end
