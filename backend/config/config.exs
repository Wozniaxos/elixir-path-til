# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :til,
  ecto_repos: [Til.Repo],
  frontend_host: System.get_env("FRONTEND_HOST")

# Configures the endpoint
config :til, TilWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "TGVCmQ52f5S76w5dAtjqzbne4axUj2kB8RO7wedO1m9YqDT0z42fvovvjgWIRer3",
  render_errors: [view: TilWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Til.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "vJGJD9ib"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, []}
  ]

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_CLIENT_SECRET")

# Configure the authentication plug pipeline
config :til, TilWeb.Plug.AuthAccessPipeline,
  module: Til.Guardian,
  error_handler: TilWeb.Plug.AuthErrorHandler

config :til, Til.Guardian,
  issuer: "til",
  secret_key: System.get_env("GUARDIAN_SECRET")

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
