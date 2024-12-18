import styles from "./LoginPage.module.css";
import { Card, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import CustomMessage from "../components/CustomMessage";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { setIsLoading } from "../redux/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState();
  const isLoading = useSelector((state) => state.user.isLoading);

  // const token = localStorage.getItem("token_excelort");

  // useEffect(() => {
  //   if (token) {
  //     navigate("/home");
  //   }
  // }, [token, navigate]);

  const onFinish = async (values) => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${BASE_URL}/admins/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();
      console.log("DATA: ", data);

      if (!response.ok) {
        setStatus({ type: data.status, message: data.errors.username[0] });
      } else {
        setStatus({ type: "success", message: data.message });

        setTimeout(() => {
          dispatch(setIsLoading(false));
          navigate("/login");
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
      <div className={styles.container}>
        <div className={styles.text_container}>
          <p className={styles.title}>TaskMaster Pro</p>
          <p className={styles.description}>Register as a project Admin</p>
        </div>

        <div className={styles.login_card}>
          <Card
            style={{
              width: 500,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
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
                    message: "Please input your name!",
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
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div className={styles.status}>
              {status && (
                <CustomMessage message={status.message} type={status.type} />
              )}
            </div>
          </Card>
          <div className={styles.register}>
            <p>
              Already have an account? Login{" "}
              <Link className={styles.link} to="/login">
                Here
              </Link>
              !
            </p>
          </div>
        </div>
        <p>HEY jafnsaof asjfnasnf nskfasknf asjfnasnf nskfasknf</p>
        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default RegisterPage;
