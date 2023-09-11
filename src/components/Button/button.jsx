import "./button.scss";

const Button = (props) => {
  const { type, handleButtonClick, className, content } = props;

  const handleClick = () => {
    if (!handleButtonClick) return;
    handleButtonClick();
  };

  return (
    <button
      type={type || "button"}
      onClick={handleClick}
      className={`button ${className || ""}`}
    >
      {content || "button"}
    </button>
  );
};

export default Button;
