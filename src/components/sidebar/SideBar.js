import { HomeOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import styles from "./SideBar.module.css";

const SideBar = ({ active, setActive }) => {
  const OPTIONS = [
    { title: "Projects", icon: <HomeOutlined /> },
    { title: "Employees", icon: <TeamOutlined /> },
    { title: "Settings", icon: <SettingOutlined /> },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {OPTIONS.map((option, index) => (
          <div
            key={index}
            className={active === option.title ? styles.active : styles.option}
            onClick={() => setActive(option.title)}
          >
            {option.icon && option.icon}
            <p>{option.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
