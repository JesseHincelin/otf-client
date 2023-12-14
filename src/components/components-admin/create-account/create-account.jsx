import { useDispatch, useSelector } from "react-redux";
import Input from "../../Input/input";
import {
  handleFieldChange,
  setCreateAccountError,
} from "../../../redux/reducers/createAccount.reducer";
import Select from "../../Select/select";
import { ROLE, ROLE_COMPLETE } from "../../../utils/selectOptions.util";
import Button from "../../Button/button";
import "./create-account.scss";
import AccountNav from "../account-nav/account-nav";
import { createAccountThunk } from "../../../api/createAccount.api";
import { useEffect } from "react";
import Popup from "../Popup/popup";
import { groupesOptions } from "../../../utils/groupe.utils";
import { USER_ROLE, generateRandPass } from "../../../utils/global.util";
import { contentCopyIcon, generatePassIcon } from "../../../utils/export-icons.utils";

const CreateAccount = (props) => {
  const {
    error,
    loading,
    userNameValue,
    passwordValue,
    domainValue,
    groupeValue,
    groupes,
    role,
    userRole,
    userDomain,
    activePopup,
  } = useSelector((store) => ({
    error: store.createAccountState.error,
    loading: store.createAccountState.loading,
    userNameValue: store.createAccountState.userNameValue,
    passwordValue: store.createAccountState.passwordValue,
    domainValue: store.createAccountState.domainValue,
    groupeValue: store.createAccountState.groupeValue,
    groupes: store.groupeState.groupes,
    role: store.createAccountState.role,
    userRole: store.userState.role,
    userDomain: store.userState.domain,
    activePopup: store.popupState.activePopup,
  }));

  const dispatch = useDispatch();

  const domainOption = [userDomain];

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleCopyClick = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(passwordValue);
  };

  const handleGenerateClick = (event) => {
    event.preventDefault();
    const password = generateRandPass(20);
    dispatch(handleFieldChange({ value: password, props: "passwordValue" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userDomain);

    if (userDomain.role !== USER_ROLE.SUPER_ADMIN) {
      dispatch(handleFieldChange({ value: userDomain, props: "domainValue" }));
    }
    if (userDomain.role === USER_ROLE.SUPER_ADMIN) {
      if (domainValue === "Select the domain :") {
        dispatch(setCreateAccountError({ error: "Please, select a domain." }));
        return;
      } else {
        dispatch(setCreateAccountError({ error: "" }));
      }
    } else if (groupeValue === "Select a groupe :") {
      dispatch(setCreateAccountError({ error: "Please, select a groupe" }));
      return;
    } else if (role === "Select a role :") {
      dispatch(setCreateAccountError({ error: "Please, select a role" }));
      return;
    }
    dispatch(setCreateAccountError({ error: "" }));
    dispatch(createAccountThunk());
  };

  // useEffect(() => {
  // }, []);

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
              <button
                className="material-symbols-outlined"
                onClick={handleGenerateClick}
                title="Generate Password"
              >
                {generatePassIcon()}
              </button>
              <button
                className="material-symbols-outlined"
                onClick={handleCopyClick}
                title="Copy password on clipboard"
              >
                {contentCopyIcon()}
              </button>
            </li>
            {userDomain.role === USER_ROLE.SUPER_ADMIN && (
              <li>
                <Select
                  className="domain"
                  options={domainOption}
                  id="domain"
                  label="Domain :"
                  value={domainValue}
                  required={true}
                  disabled={loading}
                  handleSelectChange={(value) => handleFormChange(value, "domainValue")}
                />
              </li>
            )}
            <li>
              <Select
                className="groupe"
                options={groupesOptions(groupes, "Select a groupe :")}
                id="groupe"
                label="Groupe :"
                value={groupeValue}
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
                value={role}
                required={true}
                disabled={loading}
                handleSelectChange={(value) => handleFormChange(value, "role")}
              />
            </li>
          </ul>
          {!!error && <span className="error">{error}</span>}
          <Button
            type="submit"
            className="create-account__form--button button"
            content="Create"
            disabled={loading}
          />
        </form>
      </div>
      {!!activePopup && <Popup />}
    </div>
  );
};

export default CreateAccount;
