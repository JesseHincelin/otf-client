const UserNavButton = ({ className, type, handleButtonClick, content }) => {
  const handleClick = () => {
    if (!handleButtonClick) return;
    handleButtonClick();
  };

  return (
    <button
      className={`${className} user-nav__button`}
      type={type || "button"}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default UserNavButton;
