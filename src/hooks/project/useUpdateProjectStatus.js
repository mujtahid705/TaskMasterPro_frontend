import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/userSlice";
import { BASE_URL } from "../../api";

const useUpdateProjectStatus = (id, taskId, status) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  console.log(token);

  const updateStatus = async () => {
    dispatch(setIsLoading(true));
    try {
      // *** WORKING ON API CALL WHICH I WILL USE IN TASKCARD.JS updateStatusHandler FUNCTION ***
      const response = await fetch(`${BASE_URL}/projects/task-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskId: taskId,
          status: status,
        }),
      });

      if (!response.ok) {
        console.log("Error");
        return null;
      }

      const data = await response.json();
      console.log(data);

      return data;
    } catch (err) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { updateStatus };
};

export default useUpdateProjectStatus;
