import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading, setProjects } from "./redux/userSlice";

export const BASE_URL = "http://localhost:5000/api";
// export const BASE_URL = process.env.BASE_URL;

export const useGetProjects = () => {
  const dispatch = useDispatch();

  const getProjectsApiCall = useCallback(
    async (token, admin_id) => {
      try {
        dispatch(setIsLoading(true));
        const response = await fetch(`${BASE_URL}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ admin_id }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.log("ERROR: ", data.message);
        } else {
          dispatch(setIsLoading(false));
          dispatch(setProjects(data));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  return getProjectsApiCall;
};
