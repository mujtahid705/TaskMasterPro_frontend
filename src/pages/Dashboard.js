import { useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import styles from "./Dashboard.module.css";
import DashboardSection from "../components/dashboard/DashboardSection";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Dashboard = () => {
  const [active, setActive] = useState("Projects");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {!isLoggedIn && <Navigate to="/login" />}
      {isLoggedIn && (
        <div className={styles.container}>
          <div className={styles.leftSection}>
            <SideBar active={active} setActive={setActive} />
          </div>

          <div className={styles.rightSection}>
            <DashboardSection active={active} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
