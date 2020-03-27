defmodule Til.Repo.Migrations.CreateLikes do
  use Ecto.Migration

  def change do
    create table(:likes) do
      add :user_uuid, :string
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :post_id, references(:posts, on_delete: :nothing), null: false

      timestamps()
    end

    create unique_index(:likes, [:user_id, :post_id], name: :user_post_pair)
  end
end
