import { useHistory } from "react-router-dom";
import { useQuery } from "../utils";

const AuthHandler = ({ setIsLoggedIn }) => {
  const query = useQuery();
  const token = query.get("auth_token");
  const history = useHistory();

  window.localStorage.setItem("til_token", token);

  if (token) setIsLoggedIn(true);
  history.push("/");

  return null;
};

export default AuthHandler;
