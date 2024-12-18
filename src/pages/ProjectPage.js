import { Navigate, useParams } from "react-router";
import styles from "./ProjectPage.module.css";
import useGetProjectData from "../hooks/project/useGetProjectData";
import { useSelector } from "react-redux";
import { PlusCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import cover from "../assets/cover.jpg";
import TaskCard from "../components/ui/TaskCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProjectPage = () => {
  const { id } = useParams();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.user.isLoading);

  const projectData = useGetProjectData(id);
  console.log(projectData, "PROJECT DATA");

  return (
    <>
      {!isLoggedIn && <Navigate to="/login" />}
      {isLoggedIn && !isLoading && projectData && (
        <>
          <div className={styles.coverContainer}>
            <img className={styles.coverImg} src={cover} />
            <h1 className={styles.title}>{projectData.name}</h1>
            <p className={styles.description}>{projectData.description}</p>
            <p className={styles.status}>Status: {projectData.status}</p>
          </div>

          <div className={styles.addTask}>
            <p className={styles.addBtn}>
              <Link className={styles.link} to="/dashboard/add-task">
                <PlusCircleFilled />
              </Link>
            </p>
          </div>

          <div className={styles.tasksSection}>
            {projectData.tasks.map((task, index) => (
              <TaskCard
                key={index}
                taskId={task._id}
                projectId={id}
                title={task.title}
                description={task.description}
                status={task.status}
              />
            ))}
            {projectData.tasks.length === 0 && <p>No Tasks Found!</p>}
          </div>
        </>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ProjectPage;
