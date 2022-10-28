import { useContext, useEffect, useState } from "react";
import { Store } from "../context/Store";

export const useLogout = () => {
  const { dispatch } = useContext(Store);

  const logout_user = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  return logout_user();
};

export default useLogout;
