import { useDispatch, useSelector } from "react-redux";
import Input from "../Input/input";
import { handleFieldChange } from "../../redux/reducers/login.reducer";
import Button from "../Button/button";
import "./login.scss";
import { loginThunk } from "../../api/login.api";

const Login = (props) => {
  const { error, loading, domainValue, userNameValue, passwordValue } = useSelector(
    (store) => store.loginState
  );

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginThunk());
  };

  return (
    <div className="login box">
      <h2 className="login__title box__title">Login</h2>
      <form
        action="login__form box__form"
        onSubmit={handleSubmit}
      >
        <ul>
          <li>
            <Input
              className="login__form--domain"
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
              className="login__form--userName"
              id="userName"
              label="User-Name :"
              value={userNameValue.trim()}
              disabled={loading}
              required={true}
              handleInputChange={(value) => handleFormChange(value, "userNameValue")}
            />
          </li>
          <li>
            <Input
              className="login__form--password"
              id="password"
              label="Password :"
              type="password"
              value={passwordValue}
              disabled={loading}
              required={true}
              handleInputChange={(value) => handleFormChange(value, "passwordValue")}
            />
          </li>
        </ul>
        {/* .slice(12) */}
        {!!error && <span className="error">{error}</span>}
        <Button
          type="submit"
          className="login__form--button button"
          content="Log-In"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Login;
