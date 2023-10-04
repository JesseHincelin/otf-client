import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/button";
import { ROUTES } from "../../../utils/routes.util";
import { redirect } from "../../../redux/reducers/router.reducer";
import { resetTargetUser } from "../../../redux/reducers/targetUser.reducer";
import {
  resetDeleteAccount,
  resetTargetAccount,
} from "../../../redux/reducers/targetAccount.reducer";
import { resetCreateAccount } from "../../../redux/reducers/createAccount.reducer";

const AccountNav = (props) => {
  const { exitOnly } = props;
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
  };

  return (
    <>
      {!exitOnly ? (
        <div className="account__nav">
          <Button
            className={
              currentRoute === ROUTES.admin.createAccount
                ? "account__nav--create-account--button active"
                : "account__nav--create-account--button"
            }
            handleButtonClick={() => handleNavClick("createAccount")}
            disabled={currentRoute === ROUTES.admin.createAccount}
            content="Create account"
          />
          <Button
            className={
              currentRoute === ROUTES.admin.editAccount
                ? "account__nav--edit-account--button active"
                : "account__nav--edit-account--button"
            }
            handleButtonClick={() => handleNavClick("editAccount")}
            disabled={currentRoute === ROUTES.admin.editAccount}
            content="Edit account"
          />
          <Button
            className={
              currentRoute === ROUTES.admin.deleteAccount
                ? "account__nav--delete-account--button active"
                : "account__nav--delete-account--button"
            }
            handleButtonClick={() => handleNavClick("deleteAccount")}
            disabled={currentRoute === ROUTES.admin.deleteAccount}
            content="Delete account"
          />
        </div>
      ) : null}
      <Button
        className="account__nav--exit--button "
        handleButtonClick={() => handleQuitClick("adminDashboard")}
        content="X"
      />
    </>
  );
};

export default AccountNav;
