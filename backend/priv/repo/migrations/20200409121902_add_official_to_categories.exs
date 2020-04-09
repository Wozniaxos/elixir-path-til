defmodule Til.Repo.Migrations.AddOfficialToCategories do
  use Ecto.Migration

  def change do
    alter table(:categories) do
      add :official, :boolean, null: false, default: false
    end
  end
end
