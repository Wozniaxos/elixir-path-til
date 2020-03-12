defmodule TilWeb.Router do
  use TilWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TilWeb do
    pipe_through :api
  end
end
