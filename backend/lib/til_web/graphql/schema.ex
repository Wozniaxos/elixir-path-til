defmodule TilWeb.GraphQL.Schema do
  use Absinthe.Schema

  import_types Absinthe.Type.Custom
  import_types TilWeb.GraphQL.Schema.AccountTypes
  import_types TilWeb.GraphQL.Schema.ActivityTypes
  import_types TilWeb.GraphQL.Schema.ShareableContentTypes

  alias TilWeb.GraphQL.Resolvers

  query do
    @desc "Get all posts"
    field :posts, list_of(:post) do
      resolve &Resolvers.ShareableContent.list_posts/3
    end

    @desc "Get all categories"
    field :categories, list_of(:category) do
      resolve &Resolvers.ShareableContent.list_categories/3
    end
  end

  mutation do
    @desc "Create a user"
    field :register, :user do
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &Resolvers.Accounts.register/3
    end

    @desc "Create a session"
    field :login, :session do
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &Resolvers.Accounts.login/3
    end

    @desc "Create a post"
    field :create_post, :post do
      arg :title, non_null(:string)
      arg :body, :string
      arg :is_public, :boolean
      arg :reviewed, :boolean

      resolve &Resolvers.ShareableContent.create_post/3
    end
  end
end
