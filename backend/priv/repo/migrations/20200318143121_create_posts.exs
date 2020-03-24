defmodule Til.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :title, :string, null: false
      add :body, :text
      add :is_public, :boolean, null: false, default: false
      add :likes_count, :integer, null: false, default: 0
      add :author_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create unique_index(:posts, [:title])
    create index(:posts, [:author_id])
  end
end
