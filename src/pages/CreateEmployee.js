import { Button, Form, Input, Select } from "antd";
import styles from "./CreateProject.module.css";
import { setIsLoading } from "../redux/userSlice";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useState } from "react";
import CustomMessage from "../components/CustomMessage";

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [status, setStatus] = useState();

  const onFinish = async (values) => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${BASE_URL}/employees/create`, {
        method: "POST",
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
      {isLoggedIn && (
        <div className={styles.container}>
          <p className={styles.title}>Add New Employee</p>
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
                rules={[
                  {
                    required: true,
                    message: "Please input your project name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
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
                    Add Employee
                  </Button>
                )}
                {isLoading && (
                  <Button type="primary" htmlType="submit" disabled>
                    Add Employee
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
          {isLoading && <LoadingSpinner />}
        </div>
      )}
    </>
  );
};

export default CreateEmployee;
