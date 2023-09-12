import { resetLogin, setLoginError, startLoading } from "../redux/reducers/login.reducer";
import { redirect } from "../redux/reducers/router.reducer";
import { setUser } from "../redux/reducers/user.reducer";
import { saveLocalStorage } from "../utils/global.util";
import { ROUTES } from "../utils/routes.util";
import { postRequest } from "./requests.api";

export const loginThunk = () => async (dispatch, getStates) => {
  const { loading, userNameValue, domainValue, passwordValue } = getStates().loginState;

  console.log("loading :", loading);
  console.log("user name :", userNameValue);
  console.log("password :", passwordValue);

  if (loading) return;
  dispatch(startLoading());

  const response = await postRequest("user/login", {
    password: passwordValue,
    userName: userNameValue,
    domain: domainValue,
  });

  if (!!response.error) {
    console.log("error :", response.error);
    dispatch(setLoginError({ error: response.error }));
  }

  if (!!response.result && !!response.result.user && !!response.result.token) {
    const { user, token } = response.result;
    saveLocalStorage("token", token);

    dispatch(setUser({ user: user }));

    console.log("user :", user);

    if (user.firstConnection) {
      dispatch(redirect({ route: ROUTES.changePassword }));
    } else if (user.role !== "admin" && user.role !== "super admin") {
      dispatch(redirect({ route: ROUTES.dashboard }));
    } else {
      dispatch(redirect({ route: ROUTES.adminDashboard }));
    }
    dispatch(resetLogin());
  }
};
