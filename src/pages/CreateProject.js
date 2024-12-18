import { Button, Form, Input, Select } from "antd";
import styles from "./CreateProject.module.css";
import { setIsLoading } from "../redux/userSlice";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useState, useEffect } from "react";
import CustomMessage from "../components/CustomMessage";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const admin_id = useSelector((state) => state.user.admin_id);

  const [status, setStatus] = useState();
  const [employees, setEmployees] = useState();

  // Get Employees
  const getEmployees = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${BASE_URL}/employees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ admin_id: admin_id }),
      });

      const data = await response.json();
      setEmployees(data);
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  console.log(isLoading, "LOADING");

  const onFinish = async (values) => {
    let assignedArray = [];
    values.assignedTo.map((item) => {
      assignedArray.push(JSON.parse(item));
    });

    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${BASE_URL}/projects/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          status: values.status,
          assignedTo: assignedArray,
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
      {!isLoading && (
        <div className={styles.container}>
          <p className={styles.title}>Create New Project</p>
          {employees && (
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
                  label="Project Name"
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
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description!",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Please input your status!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="Not Started">
                      Not Started
                    </Select.Option>
                    <Select.Option value="In Progress">
                      In Progress
                    </Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Assigned To" name="assignedTo">
                  <Select mode="multiple">
                    {employees.map((employee) => (
                      <Select.Option
                        key={employee.id}
                        value={JSON.stringify({
                          id: employee.id,
                          name: employee.name,
                        })}
                      >
                        {employee.name}
                      </Select.Option>
                    ))}
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
                      Create Project
                    </Button>
                  )}
                  {isLoading && (
                    <Button type="primary" htmlType="submit" disabled>
                      Create Project
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
          )}
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default CreateProject;
