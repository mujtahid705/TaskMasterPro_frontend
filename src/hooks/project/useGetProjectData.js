import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../api";
import { setIsLoading } from "../../redux/userSlice";
import { useCallback, useEffect, useState } from "react";

const useGetProjectData = (id) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [projectData, setProjectData] = useState(null);

  const getData = useCallback(async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data, "DATA1");
      setProjectData(data);
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
    }
  }, [id, token, dispatch]);

  useEffect(() => {
    getData();
  }, []);

  return projectData;
};

export default useGetProjectData;
