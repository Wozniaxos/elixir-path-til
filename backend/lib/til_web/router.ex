defmodule TilWeb.Router do
  use TilWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug TilWeb.Plug.AuthInfoPipeline
  end

  pipeline :authenticated do
    plug TilWeb.Plug.AuthAccessPipeline
  end

  pipeline :graphql do
    plug TilWeb.Context
  end

  scope "/auth", TilWeb do
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  scope "/api", TilWeb do
    pipe_through :api
    resources "/users", UserController, only: [:index, :show]
    resources "/posts", PostController, only: [:index, :show]
    resources "/categories", CategoryController, only: [:index, :show]

    scope "/statistics", Statistics do
      resources "/users", UserStatisticsController, only: [:index, :show]
    end

    pipe_through :authenticated
    get "/me", MeController, :index do
      resources "/me/posts", Me.PostController, only: [:update, :delete]
    end

    resources "/posts", PostController, only: [:create, :update, :delete] do
      post "/reactions", Posts.ReactionController, :react
      delete "/reactions/:type", Posts.ReactionController, :unreact
      get "/review", Posts.ReviewController, :show
      put "/review", Posts.ReviewController, :approve
    end
  end

  scope "/api/graphql" do
    pipe_through :api
    pipe_through :graphql

    forward "/", Absinthe.Plug, [schema: TilWeb.GraphQL.Schema, adapter: Absinthe.Adapter.LanguageConventions]
  end

  if Mix.env == :dev do
    pipe_through :api
    pipe_through :graphql
    forward "/graphiql", Absinthe.Plug.GraphiQL, [schema: TilWeb.GraphQL.Schema, adapter: Absinthe.Adapter.LanguageConventions]
  end
end
