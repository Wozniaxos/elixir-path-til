defmodule Til.Guardian do
  use Guardian, otp_app: :til
  alias Til.Accounts

  def subject_for_token(email, _claims) do
    sub = to_string(email)
    {:ok, sub}
  end
  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(claims) do
    email = claims["sub"]
    resource = Accounts.get_user_by(email: email)
    {:ok,  resource}
  end
  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end
