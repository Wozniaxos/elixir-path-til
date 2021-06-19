defmodule TilWeb.GraphQL.Resolvers.Accounts do
  alias Til.Accounts
  alias Til.Accounts.User

  def register(_parent, args, _context) do
    Accounts.create_user(args)
  end

  def login(_parent, %{email: email, password: password}, _info) do
    with %User{} = user <- Accounts.get_user_by(email: email),
        Comeonin.Argon2.check_pass(password, user.password),
        {:ok, jwt, _} <- jwt_handler().encode_and_sign(user.uuid) do
      {:ok, %{token: jwt}}
    else
      _ -> {:error, "Incorrect email or password"}
    end
  end

  defp jwt_handler do
    Application.get_env(:til, :guardian, Til.Guardian)
  end
end
