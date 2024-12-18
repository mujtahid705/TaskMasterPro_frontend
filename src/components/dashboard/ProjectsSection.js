import styles from "./ProjectsSection.module.css";
import ProjectCard from "../ui/ProjectCard";
import { useSelector } from "react-redux";
import { PlusCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const projects = useSelector((state) => state.user.projects);

  return (
    <div className={styles.container}>
      <div className={styles.addProject}>
        <p className={styles.addBtn}>
          <Link className={styles.link} to="/dashboard/create-project">
            <PlusCircleFilled />
          </Link>
        </p>
      </div>

      <div className={styles.projectGrid}>
        {projects.length === 0 && (
          <p className={styles.noProjects}>No projects found!</p>
        )}
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            id={project._id}
            title={project.name}
            description={project.description}
            status={project.status}
            assignedTo={project.assignedTo}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
