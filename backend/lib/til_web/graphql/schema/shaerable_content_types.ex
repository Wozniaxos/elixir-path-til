# lib/graphql_tutorial_web/schema/product_types.ex
defmodule TilWeb.GraphQL.Schema.ShareableContentTypes do
  use Absinthe.Schema.Notation

  @desc "A post"
  object :post do
    field :id, :id
    field :title, :string
    field :body, :string
    field :is_public, :boolean
    field :reviewed, :boolean
    field :reaction_count, :integer
    field :author, :user
    field :reactions, list_of(:reaction)
    field :categories, list_of(:category)
  end

  @desc "A category"
  object :category do
    field :id, :id
    field :name, :string
    field :official, :boolean
    field :posts, list_of(:post)
  end
end
