import { useDispatch, useSelector } from "react-redux";
import { searchUserThunk } from "../../../api/searchUser.api";
import { handleFieldChange } from "../../../redux/reducers/targetAccount.reducer";
import Input from "../../Input/input";
import Button from "../../Button/button";
import { handleTargetFieldChange } from "../../../redux/reducers/targetUser.reducer";
import { resetPasswordThunk } from "../../../api/resetPassword.api";
import AccountNav from "../account-nav/account-nav";
import "./reset-password.scss";

const ResetPassword = () => {
  const { error, loading, userNameValue, domainValue, id, userName, password } = useSelector(
    (store) => ({
      error: store.targetAccountState.error,
      loading: store.targetAccountState.loading,
      userNameValue: store.targetAccountState.userNameValue,
      domainValue: store.targetAccountState.domainValue,
      id: store.targetUserState.id,
      userName: store.targetUserState.userName,
      password: store.targetUserState.password,
    })
  );
  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };
  const handleSecondFormChange = (value, props) => {
    dispatch(handleTargetFieldChange({ value, props }));
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(searchUserThunk());
  };

  const handleResetPasswordSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPasswordThunk());
  };

  return (
    <div className="admin__block">
      <AccountNav exitOnly={true} />
      <div className="box">
        <h2 className="box__title">Reset Password</h2>
        <form
          action=""
          className="box__form"
          onSubmit={handleSearchSubmit}
        >
          <ul>
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
          onSubmit={handleResetPasswordSubmit}
        >
          <ul>
            <li>
              <Input
                className="reset__form--domain"
                id="userName--target"
                label="Reset password of :"
                value={!!id ? userName : ""}
                required={true}
                disabled={!id ? true : loading ? true : false}
              />
            </li>
            <li className="reset__form--password--field">
              <Input
                className="reset__form--password"
                id="password"
                label="New password :"
                type="password"
                value={password}
                disabled={!id ? true : loading ? true : false}
                required={true}
                handleInputChange={(value) => handleSecondFormChange(value, "password")}
              />
              <span
                className="material-symbols-outlined"
                onClick={handleCopyClick}
                title="Copy password on clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                </svg>
              </span>
            </li>
          </ul>
          {!!error && <span className="error">{error}</span>}
          <Button
            type="submit"
            className="reset__form--button button"
            content="Reset"
            disabled={!id ? true : loading ? true : false}
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
