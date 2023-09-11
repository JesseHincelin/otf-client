import { useDispatch, useSelector } from "react-redux";
import Input from "../Input/input";
import { handleFieldChange } from "../../redux/reducers/login.reducer";
import Button from "../Button/button";
import "./login.scss";

const Login = (props) => {
  const { loading, domainValue, userNameValue, passwordValue } = useSelector(
    (store) => store.loginState
  );

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //fonction thunk vers le server ici
  };

  return (
    <div className="login box">
      <h1 className="login__title box__title">Login</h1>
      <form
        action="login__form box__form"
        onSubmit={handleSubmit}
      >
        <Input
          className="login__form--domain"
          id="domain"
          label="Domain :"
          value={domainValue}
          disabled={loading}
          required={true}
          handleInputChange={(value) => handleFormChange(value, "domainValue")}
        />
        <Input
          className="login__form--userName"
          id="userName"
          label="User-Name :"
          value={userNameValue}
          disabled={loading}
          required={true}
          handleInputChange={(value) => handleFormChange(value, "userNameValue")}
        />
        <Input
          className="login__form--password"
          id="password"
          label="Password :"
          value={passwordValue}
          disabled={loading}
          required={true}
          handleInputChange={(value) => handleFormChange(value, "passwordValue")}
        />
        <Button
          type="submit"
          className="login__form--button button"
          content="Log-In"
        />
      </form>
    </div>
  );
};

export default Login;
