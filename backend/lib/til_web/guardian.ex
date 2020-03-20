defmodule Til.Guardian do
  use Guardian, otp_app: :til
  alias Til.Accounts

  def subject_for_token(uuid, _claims) do
    sub = to_string(uuid)
    {:ok, sub}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(claims) do
    uuid = claims["sub"]
    resource = Accounts.get_user_by(uuid: uuid)
    {:ok,  resource}
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end
