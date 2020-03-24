alias Til.ShareableContent.Category
alias Til.Repo

categories = [
  "android", "angular", "aws", "chrome", "commandline", "crystal", "css", "docker", "elasticsearch",
  "elixir", "ember", "emberjs", "erlang", "flutter", "general", "git", "heroku", "html", "javascript", "k8s",
  "linux", "markdown", "meetup", "mongodb", "nodejs", "osx", "phoenix", "rails", "react", "react-native", "redis",
  "ruby", "rust", "sql", "terraform", "vault"
]

Enum.map(categories, fn category ->
  Repo.insert! %Category{
    name: category
  }
end)
