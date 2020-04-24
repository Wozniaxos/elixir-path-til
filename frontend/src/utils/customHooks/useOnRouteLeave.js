import { useLocation } from "react-router-dom";

export const useOnRouteLeave = route => {
  const location = useLocation();

  if (location.pathname !== route) {
    return true;
  }
};
