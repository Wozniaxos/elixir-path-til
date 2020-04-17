import { useLocation } from "react-router-dom";

export const useRouteLeave = route => {
  const location = useLocation();

  if (location.pathname !== route) {
    return true;
  }
};
