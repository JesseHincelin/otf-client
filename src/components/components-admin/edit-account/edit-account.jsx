import { useDispatch, useSelector } from "react-redux";
import AccountNav from "../account-nav/account-nav";
import Input from "../../Input/input";
import Button from "../../Button/button";
import { searchUserThunk } from "../../../api/searchUser.api";
import { handleFieldChange } from "../../../redux/reducers/targetAccount.reducer";
import { handleTargetFieldChange } from "../../../redux/reducers/targetUser.reducer";
import { ROLE, ROLE_COMPLETE, TEST_OPTIONS } from "../../../utils/selectOptions.util";
import Select from "../../Select/select";
import { editAccountThunk } from "../../../api/editAccount.api";
import Popup from "../Popup/popup";

const EditAccount = () => {
  const {
    error,
    loading,
    userNameValue,
    domainValue,
    id,
    userName,
    domain,
    groupe,
    role,
    userDomain,
    userRole,
    activePopup,
  } = useSelector((store) => ({
    error: store.targetAccountState.error,
    loading: store.targetAccountState.loading,
    userNameValue: store.targetAccountState.userNameValue,
    domainValue: store.targetAccountState.domainValue,
    id: store.targetUserState.id,
    userName: store.targetUserState.userName,
    domain: store.targetUserState.domain,
    groupe: store.targetUserState.groupe,
    role: store.targetUserState.role,
    userDomain: store.userState.domain,
    userRole: store.userState.role,
    activePopup: store.popupState.activePopup,
  }));

  const domainOption = ["Select the domain :", userDomain];

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };
  const handleEditFormChange = (value, props) => {
    dispatch(handleTargetFieldChange({ value, props }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(searchUserThunk());
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    dispatch(editAccountThunk());
  };

  return (
    <div className="admin__block">
      <AccountNav />
      <div className="box">
        <h2 className="box__title">Edit account</h2>
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
          onSubmit={handleEditSubmit}
        >
          <ul>
            <li>
              <Input
                className="search__form--domain"
                id="userName--target"
                label="UserName :"
                value={!!id ? userName : ""}
                required={true}
                disabled={!id ? true : loading ? true : false}
                handleInputChange={(value) => handleEditFormChange(value, "userName")}
              />
            </li>
            <li>
              <Select
                className="domain"
                options={domainOption}
                id="domain--target"
                label="Domain :"
                required={true}
                disabled={!id ? true : loading ? true : false}
                handleSelectChange={(value) => handleEditFormChange(value, "domain")}
              />
            </li>
            <li>
              <Select
                className="groupe"
                options={TEST_OPTIONS}
                id="groupe"
                label="Groupe :"
                required={true}
                disabled={!id ? true : loading ? true : false}
                handleSelectChange={(value) => handleEditFormChange(value, "groupe")}
              />
            </li>
            <li>
              <Select
                className="role"
                options={userRole !== "super admin" ? ROLE : ROLE_COMPLETE}
                id="role"
                label="Role :"
                required={true}
                disabled={!id ? true : loading ? true : false}
                handleSelectChange={(value) => handleEditFormChange(value, "role")}
              />
            </li>
          </ul>
          {!!error && <span className="error">{error}</span>}
          <Button
            type="submit"
            className="edit__form--button button"
            content="Edit"
            disabled={loading}
          />
        </form>
      </div>
      {!!activePopup && <Popup />}
    </div>
  );
};

export default EditAccount;
