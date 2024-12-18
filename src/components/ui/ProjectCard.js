import styles from "./ProjectCard.module.css";
import { useState } from "react";
import { Button, Modal } from "antd";
import { BASE_URL } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setIsLoading, setRefresh } from "../../redux/userSlice";
import { Link } from "react-router-dom";

const ProjectCard = ({ title, description, status, id, assignedTo }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector((state) => state.user.token);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    setIsModalOpen(false);
    dispatch(setIsLoading(true));
    console.log(id);

    try {
      const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(setRefresh());
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <div className={styles.title_status_container}>
          <p className={styles.title}>{title}</p>
          {status === "Not Started" && (
            <p className={styles.status + " " + styles.not_started}>
              Not Started
            </p>
          )}
          {status === "In Progress" && (
            <p className={styles.status + " " + styles.in_progress}>
              In Progress
            </p>
          )}
          {status === "Completed" && (
            <p className={styles.status + " " + styles.completed}>Completed</p>
          )}
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      {assignedTo.length > 0 && (
        <div className={styles.assigned_employees}>
          <p>Assigned to:</p>
          {assignedTo.map((employee, index) => (
            <div key={index} className={styles.employeeInfo}>
              <p>{employee.name}</p>
              {index < assignedTo.length - 1 && <span>|</span>}
            </div>
          ))}
        </div>
      )}

      <div className={styles.btns_container}>
        <Link to={`/dashboard/project/${id}`}>
          <Button>View</Button>
        </Link>

        <Link to={`/dashboard/update-project/${id}`}>
          <Button>Edit</Button>
        </Link>

        <Button type="primary" danger onClick={showModal}>
          Delete
        </Button>
      </div>

      <Modal
        title="Confirm Delete!"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this project?</p>
      </Modal>
    </div>
  );
};

export default ProjectCard;
