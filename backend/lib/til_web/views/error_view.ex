defmodule TilWeb.ErrorView do
  use TilWeb, :view

  def render("400.json", %{changeset: changeset}) do
    %{errors: Ecto.Changeset.traverse_errors(changeset, &translate_error/1)}
  end

  def render("400.json", %{message: message}) do
    %{error: %{message: message}}
  end

  def render("403.html", _assigns) do
    "Forbidden"
  end

  def template_not_found(template, _assigns) do
    %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  end
end

