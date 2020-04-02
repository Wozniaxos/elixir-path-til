export const initialState = {
  categories: [],
  currentUser: null,
  users: [],
  posts: []
};

export const user = {
  email: "l.walczak@selleo.com",
  firstName: null,
  image:
    "https://lh5.googleusercontent.com/-4na6W1JJVa0/AAAAAAAAAAI/AAAAAAAAAAA/SDwbLxAgbqc/photo.jpg",
  lastName: null,
  uuid: "36528600-e215-49bf-8d5b-e1096b63c876"
};

export const allUsers = [
  {
    email: "l.walczak@selleo.com",
    firstName: null,
    image:
      "https://lh5.googleusercontent.com/-4na6W1JJVa0/AAAAAAAAAAI/AAAAAAAAAAA/SDwbLxAgbqc/photo.jpg",
    lastName: null,
    uuid: "36528600-e215-49bf-8d5b-e1096b63c876"
  },
  {
    email: "maciekPlacek@selleo.com",
    firstName: null,
    image:
      "https://lh5.googleusercontent.com/-4na6W1JJVa0/AAAAAAAAAAIdsdfjdkjdfi/photo.jpg",
    lastName: null,
    uuid: "36528600-e215-49bf-8d5b-dadlfj33343443"
  }
];

export const categories = [
  { id: 1, name: "java" },
  { id: 2, name: "javascript" }
];

export const posts = [
  {
    author: {
      email: "l.walczak@selleo.com",
      firstName: null,
      image:
        "https://lh5.googleusercontent.com/-4na6W1JJVa0/AAAAAAAAAAI/AAAAAAAAAAA/SDwbLxAgbqc/photo.jpg",
      lastName: null,
      uuid: "36528600-e215-49bf-8d5b-e1096b63c876"
    },
    body: "adsfdf",
    categoriesIds: [2, 1],
    id: 1,
    isPublic: false,
    likes: [
      {
        post_id: 1,
        user_uuid: "36528600-e215-49bf-8d5b-e1096b63c876"
      }
    ],
    likesCount: 1,
    title: "title "
  },
  {
    author: {
      email: "l.walczak@selleo.com",
      firstName: null,
      image:
        "https://lh5.googleusercontent.com/-4na6W1JJVa0/AAAAAAAAAAI/AAAAAAAAAAA/SDwbLxAgbqc/photo.jpg",
      lastName: null,
      uuid: "36528600-e215-49bf-8d5b-e1096b63c876"
    },
    body: "adfefsddf",
    categoriesIds: [3],
    id: 2,
    isPublic: false,
    likes: [],
    likesCount: 0,
    title: "maciekdfd"
  }
];
