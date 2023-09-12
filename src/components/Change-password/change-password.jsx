import { useDispatch, useSelector } from "react-redux";
import Input from "../Input/input";
import "./change-password.scss";
import Button from "../Button/button";
import { handleFieldChange } from "../../redux/reducers/new-password.reducer";
import "./change-password.scss";

const ChangePassword = (props) => {
  const { loading, oldPassValue, newPassValue, confPassValue } = useSelector(
    (store) => store.newPasswordState
  );

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // function thunk to change password
  };

  return (
    <div className="changePassword box">
      <h2 className="changePassword__title box__title">Change your password</h2>
      <form
        action="changePassword__form"
        onSubmit={handleSubmit}
      >
        <ul>
          <li>
            <Input
              className="changePassword__form--newPass-1"
              id="oldPass"
              label="Old password :"
              type="password"
              value={oldPassValue}
              disabled={loading}
              required={true}
              handleInputChange={(value) => handleFormChange(value, "oldPassValue")}
            />
          </li>
          <li>
            <Input
              className="changePassword__form--newPass-2"
              id="newPass"
              label="New password :"
              type="password"
              value={newPassValue}
              disabled={loading}
              required={true}
              handleInputChange={(value) => handleFormChange(value, "newPassValue")}
            />
          </li>
          <li>
            <Input
              className="changePassword__form--newPass-3"
              id="confPass"
              label="Confirmed new password :"
              type="password"
              value={confPassValue}
              disabled={loading}
              required={true}
              handleInputChange={(value) => handleFormChange(value, "confPassValue")}
            />
          </li>
        </ul>
        <Button
          type="submit"
          className="changePassword__form--button"
          content="Confirm"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
