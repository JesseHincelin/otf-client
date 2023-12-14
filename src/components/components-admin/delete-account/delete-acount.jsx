import { useDispatch, useSelector } from "react-redux";
import { handleFieldChange } from "../../../redux/reducers/targetAccount.reducer";
import Input from "../../Input/input";
import Button from "../../Button/button";
import { deleteAccountThunk } from "../../../api/deleteAccount.api";
import { searchUserThunk } from "../../../api/searchUser.api";
import AccountNav from "../account-nav/account-nav";
import { useEffect } from "react";
import "./delete-account.scss";
import Popup from "../Popup/popup";
import { USER_ROLE } from "../../../utils/global.util";

const DeleteAccount = () => {
  const {
    error,
    loading,
    userNameValue,
    domainValue,
    id,
    userName,
    role,
    activePopup,
    userRole,
    userDomain,
  } = useSelector((store) => ({
    error: store.targetAccountState.error,
    loading: store.targetAccountState.loading,
    userNameValue: store.targetAccountState.userNameValue,
    domainValue: store.targetAccountState.domainValue,
    id: store.targetUserState.id,
    userName: store.targetUserState.userName,
    role: store.targetUserState.role,
    activePopup: store.popupState.activePopup,
    userRole: store.userState.role,
    userDomain: store.userState.domain,
  }));

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (userRole !== USER_ROLE.SUPER_ADMIN) {
      dispatch(handleFieldChange({ value: userDomain, props: "domainValue" }));
    }
    dispatch(searchUserThunk());
  };

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteAccountThunk());
  };

  // useEffect(() => {
  //   console.log(" id of user to delete :", id);
  // }, [id]);

  return (
    <div className="admin__block">
      <AccountNav />
      <div className="box">
        <h2 className="box__title">Delete account</h2>
        <form
          action=""
          className="box__form"
          onSubmit={handleSearchSubmit}
        >
          <ul>
            {userRole === USER_ROLE.SUPER_ADMIN && (
              <li>
                <Input
                  className="search__form--domain"
                  id="domain"
                  label="Domain :"
                  value={domainValue}
                  disabled={loading}
                  required={true}
                  handleInputChange={(value) => handleFormChange(value, "domainValue")}
                />
              </li>
            )}
            <li>
              <Input
                className="search__form--userName"
                id="userName"
                label="User-Name :"
                value={userNameValue}
                disabled={loading}
                required={true}
                handleInputChange={(value) => handleFormChange(value, "userNameValue")}
              />
            </li>
          </ul>
          <Button
            type="submit"
            className="search__form--button button"
            content="Search"
            disabled={loading}
          />
        </form>
        <form
          action=""
          className="box__form"
          onSubmit={handleDeleteSubmit}
        >
          <ul>
            <li>
              <Input
                className="delete__user--domain"
                id="delete__user"
                label="Account to delete :"
                value={`${userName} - ${role}`}
                disabled={!id}
                readOnly={true}
                // handleInputChange={(value) => handleFormChange(value, "domainValue")}
              />
            </li>
          </ul>
          {!!error && <span className="error">{error}</span>}
          <Button
            type="submit"
            className="delete__form--button button"
            content="Delete"
            disabled={loading}
          />
        </form>
      </div>
      {!!activePopup && <Popup />}
    </div>
  );
};

export default DeleteAccount;
