use Mix.Config

# Configure your database
config :til, Til.Repo,
  username: "postgres",
  password: "postgres",
  database: "til_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :til, TilWeb.Endpoint,
  http: [port: 4002],
  server: false

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: "xxx",
  client_secret: "xxx"

# Print only warnings and errors during test
config :logger, level: :warn
