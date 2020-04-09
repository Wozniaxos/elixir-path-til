defmodule TilWeb.Plug.AuthInfoPipeline do
  use Guardian.Plug.Pipeline, otp_app: :til

  plug Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}
  plug Guardian.Plug.LoadResource, allow_blank: true
end
