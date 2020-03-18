defmodule Til.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :text, null: false
      add :first_name, :string
      add :last_name, :string
      add :image, :string
      add :uuid, :string
    end

    unique_index(:users, :email, :uuid)
  end
end
