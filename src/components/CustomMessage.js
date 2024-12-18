const CustomMessage = ({ message, type }) => {
  return (
    <>
      {type === "error" && <p style={{ color: "red" }}>{message}</p>}
      {type === "success" && <p style={{ color: "#8bc34a" }}>{message}</p>}
      {type === "Loading" && <p>{message}</p>}
    </>
  );
};

export default CustomMessage;
