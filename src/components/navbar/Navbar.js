import { Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <Link className={styles.link} to="/">
          <p className={styles.title}>TaskMaster Pro</p>
        </Link>
      </p>
      <div className={styles.right_container}>
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <Button onClick={() => dispatch(setLogout())}>Logout</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
