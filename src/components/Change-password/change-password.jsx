import { useDispatch, useSelector } from "react-redux";
import Input from "../Input/input";
import "./change-password.scss";
import Button from "../Button/button";
import { handleFieldChange, setNewPasswordError } from "../../redux/reducers/new-password.reducer";
import { changePasswordThunk } from "../../api/changePassword.api";
import { REGEX, passwordIsValid, regexIsOk } from "../../utils/regex.utils";
import { boxChecked, boxEmpty, circleCheck } from "../../utils/export-icons.utils";

const ChangePassword = () => {
  const { error, loading, oldPassValue, newPassValue, confPassValue } = useSelector(
    (store) => store.newPasswordState
  );

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassValue !== confPassValue) {
      dispatch(setNewPasswordError({ error: "Confirmation does not match password" }));
      return;
    } else if (!passwordIsValid(newPassValue)) {
      return;
    } else if (newPassValue === confPassValue) {
      dispatch(setNewPasswordError({ error: "" }));
      dispatch(changePasswordThunk());
    }
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
          <li className="new-password">
            <Input
              className="changePassword__form--newPass-2"
              id="newPass"
              label="New password :"
              type="password"
              value={newPassValue}
              disabled={loading}
              required={true}
              handleInputChange={(value) => handleFormChange(value, "newPassValue")}
            >
              {passwordIsValid(newPassValue) ? (
                <span className="valide">{circleCheck()}</span>
              ) : null}
            </Input>
            {passwordIsValid(newPassValue) ? null : (
              <div className="new-password__block">
                <p className="new-password__block--title">
                  The new password must contain at least :
                </p>
                <ul className="list__conditions">
                  <li className="list__conditions--uppercase">
                    <p
                      className={
                        regexIsOk(REGEX.PASS_CONTROL.uppercase, newPassValue) ? "green" : "red"
                      }
                    >
                      One uppercase character
                    </p>
                    {regexIsOk(REGEX.PASS_CONTROL.uppercase, newPassValue)
                      ? boxChecked()
                      : boxEmpty()}
                  </li>
                  <li className="list__conditions--lowercase">
                    <p
                      className={
                        regexIsOk(REGEX.PASS_CONTROL.lowercase, newPassValue) ? "green" : "red"
                      }
                    >
                      One lowercase character
                    </p>
                    {regexIsOk(REGEX.PASS_CONTROL.lowercase, newPassValue)
                      ? boxChecked()
                      : boxEmpty()}
                  </li>
                  <li className="list__conditions--number">
                    <p
                      className={
                        regexIsOk(REGEX.PASS_CONTROL.number, newPassValue) ? "green" : "red"
                      }
                    >
                      One number
                    </p>
                    {regexIsOk(REGEX.PASS_CONTROL.number, newPassValue) ? boxChecked() : boxEmpty()}
                  </li>
                  <li className="list__conditions--character">
                    <p
                      className={
                        regexIsOk(REGEX.PASS_CONTROL.special, newPassValue) ? "green" : "red"
                      }
                    >
                      One special character
                    </p>
                    {regexIsOk(REGEX.PASS_CONTROL.special, newPassValue)
                      ? boxChecked()
                      : boxEmpty()}
                  </li>
                  <li className="list__conditions--length">
                    <p
                      className={
                        regexIsOk(REGEX.PASS_CONTROL.length, newPassValue) ? "green" : "red"
                      }
                    >
                      Eight characters
                    </p>
                    {regexIsOk(REGEX.PASS_CONTROL.length, newPassValue) ? boxChecked() : boxEmpty()}
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="new-password">
            <Input
              className="changePassword__form--newPass-3"
              id="confPass"
              label="Confirmed new password :"
              type="password"
              value={confPassValue}
              disabled={loading}
              required={true}
              handleInputChange={(value) => handleFormChange(value, "confPassValue")}
            >
              {confPassValue === newPassValue && confPassValue.length > 0 ? (
                <span className="valide">{circleCheck()}</span>
              ) : null}
            </Input>
          </li>
        </ul>
        {!!error && <span className="error">{error}</span>}
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
