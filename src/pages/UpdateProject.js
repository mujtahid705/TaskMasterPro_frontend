import { Button, Form, Input, Select } from "antd";
import styles from "./CreateProject.module.css";
import { setIsLoading } from "../redux/userSlice";
import { Navigate, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useEffect, useState } from "react";
import CustomMessage from "../components/CustomMessage";

const UpdateProject = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [status, setStatus] = useState();
  const [currentProject, setCurrentProject] = useState();
  const [employees, setEmployees] = useState();
  const [assignedTo, setAssignedTo] = useState();

  // Creating an of assigned names
  const assignedNames = (arr) => {
    const temp = [];
    arr.map((item) => temp.push(item.name));
    return temp;
  };

  // Get Current Project Details
  const getProjectDetails = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${BASE_URL}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const assignedNamesArr = assignedNames(data.assignedTo);
      setAssignedTo(assignedNamesArr);

      dispatch(setIsLoading(false));
      setCurrentProject(data);
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      setStatus({
        type: "error",
        message: "Error fetching project details",
      });
    }
  };

  const getEmployees = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${BASE_URL}/employees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ admin_id: currentProject.createdBy }),
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
    getProjectDetails();
  }, []);

  useEffect(() => {
    if (currentProject) {
      getEmployees();
    }
  }, [currentProject]);

  const onFinish = async (values) => {
    let assignedArray = [];
    try {
      values.assignedTo.map((item) => {
        assignedArray.push(JSON.parse(item));
      });
    } catch (err) {
      assignedArray = currentProject.assignedTo;
    }

    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "PUT",
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
      {isLoggedIn && (
        <div>
          <p className={styles.title}>Update Project</p>
          {currentProject && employees && !isLoading && (
            <div className={styles.container}>
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
                    initialValue={currentProject.name}
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
                    initialValue={currentProject.description}
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
                    initialValue={currentProject.status}
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

                  <Form.Item
                    label="Assigned To"
                    name="assignedTo"
                    initialValue={assignedTo}
                  >
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
                        Update Project
                      </Button>
                    )}

                    {isLoading && (
                      <Button type="primary" htmlType="submit" disabled>
                        Update Project
                      </Button>
                    )}
                  </Form.Item>
                </Form>

                <div className={styles.status}>
                  {status && (
                    <CustomMessage
                      message={status.message}
                      type={status.type}
                    />
                  )}
                </div>
              </div>
              {isLoading && <LoadingSpinner />}
            </div>
          )}
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default UpdateProject;
