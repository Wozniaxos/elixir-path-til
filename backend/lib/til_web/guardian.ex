defmodule Til.Guardian do
  use Guardian, otp_app: :til
  alias Til.Accounts

  def subject_for_token(uuid, _claims) do
    sub = to_string(uuid)
    {:ok, sub}
  end

  def resource_from_claims(claims) do
    uuid = claims["sub"]
    resource = Accounts.get_user(uuid)
    {:ok,  resource}
  end
end
