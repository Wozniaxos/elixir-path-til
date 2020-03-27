defmodule Til.Repo.Migrations.RemoveLikesCountFromPosts do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      remove :likes_count
    end
  end
end
