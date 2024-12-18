import styles from "./DashboardSection.module.css";
import EmployeeCard from "../ui/EmployeeCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetProjects } from "../../api";
import LoadingSpinner from "../ui/LoadingSpinner";
import ProjectsSection from "./ProjectsSection";

const DashboardSection = ({ active }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const isLoading = useSelector((state) => state.user.isLoading);
  const admin_id = useSelector((state) => state.user.admin_id);
  const refresh = useSelector((state) => state.user.refresh);

  const getProjects = useGetProjects();

  useEffect(() => {
    if (token && admin_id) {
      getProjects(token, admin_id);
    }
  }, [token, getProjects, refresh]);

  return (
    <div className={styles.container}>
      <h1>
        Hi {user.name.split(" ")[1] ? user.name.split(" ")[1] : user.name}!
      </h1>
      <p>Your {active}:</p>

      {isLoading && <LoadingSpinner />}

      {active === "Projects" && <ProjectsSection />}

      {active === "Employees" && <EmployeeCard />}
    </div>
  );
};

export default DashboardSection;
