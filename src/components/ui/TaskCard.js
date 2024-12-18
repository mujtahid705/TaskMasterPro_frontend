import {
  CaretLeftOutlined,
  CheckSquareFilled,
  CheckSquareOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import styles from "./TaskCard.module.css";
import { useEffect, useState } from "react";

const TaskCard = ({ taskId, projectId, title, description, status }) => {
  const [checked, setChecked] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);

  useEffect(() => {
    if (status === "Completed") {
      setChecked(true);
    }
  }, [status]);

  const updateStatusHandler = () => {
    let newStatus;
    if (status === "Not Completed") {
      newStatus = "Completed";
    } else {
      newStatus = "Not Completed";
    }
    // *** WILL CALL THE useUpdateProjectStatus CUSTOM HOOK HERE ***
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section1}>
          <div className={styles.titleContainer}>
            <CheckSquareFilled
              className={checked ? styles.checked : styles.notChecked}
              onClick={updateStatusHandler}
            />
            <p className={styles.title}>{title}</p>
          </div>

          <div className={styles.container2}>
            <CaretLeftOutlined
              className={checked ? styles.arrowClicked : styles.arrow}
              onClick={() => setArrowClicked(!arrowClicked)}
            />
            <DeleteFilled className={styles.delete} />
          </div>
        </div>

        {arrowClicked && (
          <div className={styles.section2}>
            <p className={styles.description}>{description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskCard;
