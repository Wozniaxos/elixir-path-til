defmodule Til.Repo.Migrations.CreatePostsCategories do
  use Ecto.Migration

  def change do
    create table(:posts_categories) do
      add(:post_id, references(:posts))
      add(:category_id, references(:categories))
    end

    create unique_index(:posts_categories, [:post_id, :category_id])
  end
end
