defmodule TilWeb.Router do
  use TilWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :authenticated do
    plug TilWeb.Plug.AuthAccessPipeline
  end

  scope "/auth", TilWeb do
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  scope "/api", TilWeb do
    pipe_through :api
    resources "/posts", PostController, only: [:index, :show]
    resources "/categories", CategoryController, only: [:index]

    pipe_through :authenticated
    resources "/posts", PostController, only: [:create, :update, :delete]
  end
end
