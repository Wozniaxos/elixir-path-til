defmodule Til.Repo.Migrations.ChangeLikesForReactions do
  use Ecto.Migration

  def change do
    drop unique_index(:likes, [:user_id, :post_id], name: :user_post_pair)

    drop table(:likes)

    create table(:reactions) do
      add :user_uuid, :string
      add :type, :string
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :post_id, references(:posts, on_delete: :nothing), null: false

      timestamps()
    end

    create unique_index(:reactions, [:post_id, :user_id, :type], name: :user_post_reaction)
  end
end
