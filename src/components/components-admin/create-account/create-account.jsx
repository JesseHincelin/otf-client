import { useDispatch, useSelector } from "react-redux";
import Input from "../../Input/input";
import { handleFieldChange } from "../../../redux/reducers/createAccount.reducer";
import Select from "../../Select/select";
import { ROLE, ROLE_COMPLETE, TEST_OPTIONS } from "../../../utils/selectOptions.util";
import Button from "../../Button/button";
import "./create-account.scss";
import AccountNav from "../account-nav/account-nav";
import { createAccountThunk } from "../../../api/createAccount.api";
import { useEffect } from "react";

const CreateAccount = (props) => {
  const {
    error,
    loading,
    userNameValue,
    passwordValue,
    domainValue,
    groupeValue,
    role,
    userRole,
    userDomain,
  } = useSelector((store) => ({
    error: store.createAccountState.error,
    loading: store.createAccountState.loading,
    userNameValue: store.createAccountState.userNameValue,
    passwordValue: store.createAccountState.passwordValue,
    domainValue: store.createAccountState.domainValue,
    groupeValue: store.createAccountState.groupeValue,
    role: store.createAccountState.role,
    userRole: store.userState.role,
    userDomain: store.userState.domain,
  }));

  const dispatch = useDispatch();

  const domainOption = ["Select the domain :", userDomain]; // a passer par un reducer plus tard

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(passwordValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createAccountThunk());
  };

  useEffect(() => {
    console.log(userNameValue, passwordValue, domainValue, groupeValue, role);
  }, [userNameValue, passwordValue, domainValue, groupeValue, role]);

  return (
    <div className="admin__block">
      <AccountNav />
      <div className="box">
        <h2 className="box__title">Create account</h2>
        <form
          action="box__form"
          onSubmit={handleSubmit}
        >
          <ul>
            <li>
              <Input
                className="create-account__form--userName"
                id="userName"
                label="User-Name :"
                value={userNameValue}
                disabled={loading}
                required={true}
                handleInputChange={(value) => handleFormChange(value, "userNameValue")}
              />
            </li>
            <li className="create-account__form--password--field">
              <Input
                className="create-account__form--password"
                id="password"
                label="Password :"
                type="password"
                value={passwordValue}
                disabled={loading}
                required={true}
                handleInputChange={(value) => handleFormChange(value, "passwordValue")}
              />
              <span
                className="material-symbols-outlined"
                onClick={handleCopyClick}
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
            <li>
              <Select
                className="domain"
                options={domainOption}
                id="domain"
                label="Domain :"
                required={true}
                disabled={loading}
                handleSelectChange={(value) => handleFormChange(value, "domainValue")}
              />
            </li>
            <li>
              <Select
                className="groupe"
                options={TEST_OPTIONS}
                id="groupe"
                label="Groupe :"
                required={true}
                disabled={loading}
                handleSelectChange={(value) => handleFormChange(value, "groupeValue")}
              />
            </li>
            <li>
              <Select
                className="role"
                options={userRole !== "super admin" ? ROLE : ROLE_COMPLETE}
                id="role"
                label="Role :"
                required={true}
                disabled={loading}
                handleSelectChange={(value) => handleFormChange(value, "role")}
              />
            </li>
          </ul>
          {!!error && <span className="error">{error.slice(12)}</span>}
          <Button
            type="submit"
            className="create-account__form--button button"
            content="Create"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
