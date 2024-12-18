import { Button, Form, Input, Select } from "antd";
import styles from "./CreateProject.module.css";
import { setIsLoading } from "../redux/userSlice";
import { Navigate, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useState, useEffect } from "react";
import CustomMessage from "../components/CustomMessage";

const UpdateEmployee = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [status, setStatus] = useState();
  const [currentEmployee, setCurrentEmployee] = useState();

  // Get Current Employee Details
  const getEmployeeDetails = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${BASE_URL}/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Employee: ", data);

      setCurrentEmployee(data);
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      setStatus({
        type: "error",
        message: "Error fetching employee details",
      });
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${BASE_URL}/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          password: values.password,
          role: values.role,
        }),
      });

      const data = await response.json();
      console.log("Updated Employee: ", data);

      if (!response.ok) {
        setStatus({ type: "error", message: data.message });
      } else {
        setStatus({ type: "success", message: data.message });

        setTimeout(() => {
          dispatch(setIsLoading(false));
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {!isLoggedIn && <Navigate to="/login" />}
      {!isLoading && currentEmployee && isLoggedIn && (
        <div className={styles.container}>
          <p className={styles.title}>Update Employee</p>
          <div className={styles.formContainer}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 800,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                initialValue={currentEmployee.name}
                rules={[
                  {
                    required: true,
                    message: "Please input your employee name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                initialValue={currentEmployee.username}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
                initialValue={currentEmployee.role}
                rules={[
                  {
                    required: true,
                    message: "Please input your role!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="Project Manager">
                    Project Manager
                  </Select.Option>
                  <Select.Option value="Team Leader">Team Leader</Select.Option>
                  <Select.Option value="General Worker">
                    General Worker
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                {!isLoading && (
                  <Button type="primary" htmlType="submit">
                    Update Employee
                  </Button>
                )}
                {isLoading && (
                  <Button type="primary" htmlType="submit" disabled>
                    Update Employee
                  </Button>
                )}
              </Form.Item>
            </Form>

            <div className={styles.status}>
              {status && (
                <CustomMessage message={status.message} type={status.type} />
              )}
            </div>
          </div>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default UpdateEmployee;
