import { useHistory } from "react-router-dom";
import { useQuery } from "../utils";
import { useDispatch } from "react-redux";
import { saveCurrentUser } from "../store/actions/actions";

const AuthHandler = () => {
  const query = useQuery();
  const token = query.get("auth_token");
  const history = useHistory();
  const dispatch = useDispatch();

  window.localStorage.setItem("til_token", token);

  dispatch(saveCurrentUser());
  history.push("/");

  return null;
};

export default AuthHandler;
