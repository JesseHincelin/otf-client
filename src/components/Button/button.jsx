import "./button.scss";

const Button = (props) => {
  const { type, handleButtonClick, className, disabled, content } = props;

  const handleClick = () => {
    if (!handleButtonClick) return;
    handleButtonClick();
  };

  return (
    <button
      type={type || "button"}
      onClick={handleClick}
      className={`button ${className || ""}`}
      disabled={!!disabled}
    >
      {content || "button"}
    </button>
  );
};

export default Button;
