import { useDispatch } from "react-redux";
import Button from "../Button/button";
import "./header.scss";
import { redirect } from "../../redux/reducers/router.reducer";
import { ROUTES } from "../../utils/routes.util";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    dispatch(redirect({ route: ROUTES.login }));
  };

  return (
    <div className="header">
      <div className="header__title">
        <h1 className="header__title--first">Office Task</h1>
        <span className="header__title--second">Flow</span>
      </div>
      <div className="header__log-out">
        <Button
          className="header__log-out--button"
          handleButtonClick={() => handleLogOutClick()}
          content={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Header;
