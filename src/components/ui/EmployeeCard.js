import { useDispatch, useSelector } from "react-redux";
import styles from "./EmployeeCard.module.css";
import { BASE_URL } from "../../api";
import { setEmployees, setIsLoading } from "../../redux/userSlice";
import { useEffect, useState } from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const EmployeeCard = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const token = useSelector((state) => state.user.token);
  const admin_id = useSelector((state) => state.user.admin_id);

  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${BASE_URL}/employees/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ admin_id }),
      });
      const data = await response.json();
      console.log("DATA: ", data);
      setEmployees(data);

      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getEmployees();
  }, [token, admin_id]);

  // Delete Employee
  const deleteEmployee = async (id) => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${BASE_URL}/employees/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      getEmployees();
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      {!isLoading && (
        <div className={styles.container}>
          <div className={styles.addEmployee}>
            <p className={styles.addBtn}>
              <Link className={styles.link} to="/dashboard/create-employee">
                <PlusCircleFilled />
              </Link>
            </p>
          </div>
          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.username}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link to={`/dashboard/update-employee/${employee.id}`}>
                        <button className={styles.editButton}>Edit</button>
                      </Link>
                      <button
                        onClick={() => deleteEmployee(employee.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {employees.length === 0 && (
            <p className={styles.noEmployees}>No employees found!</p>
          )}
        </div>
      )}
    </>
  );
};

export default EmployeeCard;
