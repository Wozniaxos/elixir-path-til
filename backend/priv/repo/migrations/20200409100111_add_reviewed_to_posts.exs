defmodule Til.Repo.Migrations.AddReviewedToPosts do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :reviewed, :boolean, null: false, default: false
    end
  end
end
