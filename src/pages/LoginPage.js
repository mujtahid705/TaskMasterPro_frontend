import styles from "./LoginPage.module.css";
import { Card, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import CustomMessage from "../components/CustomMessage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminId,
  setIsLoading,
  setIsLoggedIn,
  setToken,
} from "../redux/userSlice";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [status, setStatus] = useState();

  // const token = localStorage.getItem("token_excelort");

  // useEffect(() => {
  //   if (token) {
  //     navigate("/home");
  //   }
  // }, [token, navigate]);

  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${BASE_URL}/admins/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();
      console.log("DATA: ", data);

      if (!response.ok) {
        setStatus({ type: "error", message: data.message });
      } else {
        setStatus({ type: "success", message: "Logged In" });

        dispatch(setIsLoggedIn(data.admin));
        dispatch(setToken(data.token));
        dispatch(setAdminId(data.admin.id));

        // localStorage.setItem("token_taskmaster", data.token);

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
      <div className={styles.container}>
        <div className={styles.text_container}>
          <p className={styles.title}>TaskMaster Pro</p>
          <p className={styles.description}>Project Admin Login</p>
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
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
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
              Don't have an account? Register{" "}
              <Link className={styles.link} to="/register">
                Here
              </Link>
              !
            </p>
          </div>
        </div>
        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default LoginPage;
