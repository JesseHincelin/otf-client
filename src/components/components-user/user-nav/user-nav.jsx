import { useDispatch } from "react-redux";
import UserNavButton from "./user-nav-button";
import { redirect } from "../../../redux/reducers/router.reducer";
import { ROUTES } from "../../../utils/routes.util";
import "./user-nav.scss";

const UserNav = () => {
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(redirect({ route: ROUTES.user.userDashboard }));
  };
  const handleCalendarClick = () => {};
  const handleTodayTasksClick = () => {};
  const handleNewTodoClick = () => {
    dispatch(redirect({ route: ROUTES.user.newTodo }));
  };
  const handleNewCategorieClick = () => {
    dispatch(redirect({ route: ROUTES.user.newCategorie }));
  };
  const handleNotificationsClick = () => {};

  return (
    <nav className="user-nav">
      <ul className="user-nav__list">
        <li>
          <UserNavButton
            className={"user-nav__list--button"}
            content="Home"
            handleButtonClick={handleHomeClick}
          />
        </li>
        <li>
          <UserNavButton
            className={"user-nav__list--button"}
            content="Calendar"
            handleButtonClick={handleCalendarClick}
          />
        </li>
        <li>
          <UserNavButton
            className={"user-nav__list--button"}
            content="Today Tasks"
            handleButtonClick={handleTodayTasksClick}
          />
        </li>
        <li>
          <UserNavButton
            className={"user-nav__list--button"}
            content="New to-do"
            handleButtonClick={handleNewTodoClick}
          />
        </li>
        <li>
          <UserNavButton
            className={"user-nav__list--button"}
            content="New categorie"
            handleButtonClick={handleNewCategorieClick}
          />
        </li>
        <li>
          <UserNavButton
            className={"user-nav__list--button"}
            content="Notifications"
            handleButtonClick={handleNotificationsClick}
          />
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
