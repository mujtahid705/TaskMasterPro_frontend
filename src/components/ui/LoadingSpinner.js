import { Flex, Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <div style={{ margin: "1.5rem 0" }}>
      <Flex align="center" justify="center" gap="middle">
        <Spin size="large" />
      </Flex>
    </div>
  );
};

export default LoadingSpinner;
