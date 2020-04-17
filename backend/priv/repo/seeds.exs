alias Til.ShareableContent.{Category, Post}
alias Til.Accounts.User
alias Til.Repo

categories = [
  "android", "angular", "aws", "chrome", "commandline", "crystal", "css", "docker", "elasticsearch",
  "elixir", "ember", "emberjs", "erlang", "flutter", "general", "git", "heroku", "html", "javascript", "k8s",
  "linux", "markdown", "meetup", "mongodb", "nodejs", "osx", "phoenix", "rails", "react", "react-native", "redis",
  "ruby", "rust", "sql", "terraform", "vault"
]

Enum.map(categories, fn category ->
  Repo.insert! %Category{
    name: category,
    official: true
  }
end)

# user1 = Repo.insert! %User{
#     first_name: "Mick",
#     email: "Mick@dkjf.pl",
#     uuid: Ecto.UUID.generate()
#   }

# user2 = Repo.insert! %User{
#     first_name: "John",
#     email: "john@dkjf.pl",
#     uuid: Ecto.UUID.generate()
#   }

# user3 = Repo.insert! %User{
#     first_name: "Phil",
#     email: "phil@dkjf.pl",
#     uuid: Ecto.UUID.generate()
#   }

# user4 = Repo.insert! %User{
#     first_name: "Greg",
#     email: "greg@dkjf.pl",
#     uuid: Ecto.UUID.generate()
#   }


# Repo.insert! %Post{
#   author: user1,
#   title: "markdown",
#   body: "this is markdown with js",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user2,
#   title: "elixir",
#   body: "this is markdown with elixir",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user3,
#   title: "angular",
#   body: "this is angular with js",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user1,
#   title: "html",
#   body: "this is aws with chrome",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user4,
#   title: "mongodb",
#   body: "this is mongdb with erlang and flutter",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user1,
#   title: "sql",
#   body: "sql osx and nodejs",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user4,
#   title: "crystal",
#   body: "sql osx crystal and nodejs",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user1,
#   title: "css",
#   body: "css osx and nodejs",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user4,
#   title: "docker",
#   body: "docker rails git and nodejs",
#   is_public: true,
#   reviewed: true,
# }
