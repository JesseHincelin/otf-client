import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../utils/routes.util";
import Button from "../../Button/button";
import { redirect } from "../../../redux/reducers/router.reducer";
import { resetTargetUser } from "../../../redux/reducers/targetUser.reducer";
import { resetTargetAccount } from "../../../redux/reducers/targetAccount.reducer";
import { resetCreateAccount } from "../../../redux/reducers/createAccount.reducer";
import { resetGroupeValue } from "../../../redux/reducers/groupe.reducer";

const GroupeNav = () => {
  const { currentRoute } = useSelector((store) => store.routerState);

  const dispatch = useDispatch();

  const handleQuitClick = (props) => {
    dispatch(redirect({ route: ROUTES[props] }));
  };

  const handleNavClick = (props) => {
    if (currentRoute === ROUTES.admin[props]) return;
    dispatch(redirect({ route: ROUTES.admin[props] }));
    dispatch(resetTargetUser());
    dispatch(resetTargetAccount());
    dispatch(resetCreateAccount());
    dispatch(resetGroupeValue());
  };

  return (
    <>
      <div className="groupe__nav">
        <Button
          className={
            currentRoute === ROUTES.admin.createGroupe
              ? "account__nav--create-groupe--button active"
              : "account__nav--create-groupe--button"
          }
          handleButtonClick={() => handleNavClick("createGroupe")}
          disabled={currentRoute === ROUTES.admin.createGroupe}
          content="Create groupe"
        />
        <Button
          className={
            currentRoute === ROUTES.admin.editGroupe
              ? "account__nav--edit-groupe--button active"
              : "account__nav--edit-groupe--button"
          }
          handleButtonClick={() => handleNavClick("editGroupe")}
          disabled={currentRoute === ROUTES.admin.editGroupe}
          content="Edit groupe"
        />
        <Button
          className={
            currentRoute === ROUTES.admin.deleteGroupe
              ? "account__nav--delete-groupe--button active"
              : "account__nav--delete-groupe--button"
          }
          handleButtonClick={() => handleNavClick("deleteGroupe")}
          disabled={currentRoute === ROUTES.admin.deleteGroupe}
          content="Delete groupe"
        />
      </div>
      <Button
        className="groupe__nav--exit--button "
        handleButtonClick={() => handleQuitClick("adminDashboard")}
        content="X"
      />
    </>
  );
};

export default GroupeNav;
