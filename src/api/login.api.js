import { setGroupes } from "../redux/reducers/groupe.reducer";
import { resetLogin, setLoginError, startLoading } from "../redux/reducers/login.reducer";
import { redirect } from "../redux/reducers/router.reducer";
import { setCategories, setGroup, setUser } from "../redux/reducers/user.reducer";
import { getFromStorage, saveLocalStorage } from "../utils/global.util";
import { ROUTES } from "../utils/routes.util";
import { getRequest, postRequest } from "./requests.api";

export const loginThunk = () => async (dispatch, getStates) => {
  const { loading, userNameValue, domainValue, passwordValue } = getStates().loginState;

  if (loading) return;
  dispatch(startLoading());

  const response = await postRequest("user/login", {
    password: passwordValue,
    userName: userNameValue.trim(),
    domain: domainValue.trim(),
  });

  if (!!response.error) {
    dispatch(setLoginError({ error: response.error }));
  }

  if (!!response.result && !!response.result.user && !!response.result.token) {
    const { user, token } = response.result;
    saveLocalStorage("token", token);

    dispatch(setUser({ user: user }));

    if (!!response.result.groupes) {
      dispatch(setGroupes({ groupes: response.result.groupes }));
    }

    if (!!response.result.categories) {
      dispatch(setCategories({ categories: response.result.categories }));
    }

    if (!!response.result.groupe) {
      dispatch(setGroup({ groupe: response.result.groupe }));
    }

    if (user.firstConnection) {
      dispatch(redirect({ route: ROUTES.changePassword }));
    } else if (user.role !== "admin" && user.role !== "super admin") {
      dispatch(redirect({ route: ROUTES.user.userDashboard }));
    } else {
      dispatch(redirect({ route: ROUTES.adminDashboard }));
    }
    dispatch(resetLogin());
  }
};

export const reconnectThunk = () => async (dispatch, getStates) => {
  const { currentRoute } = getStates().routerState;
  const { loading } = getStates().loginState;

  if (loading) return;
  dispatch(startLoading());

  const response = await getRequest("user/auto-connect", getFromStorage("token"));

  if (!!response.error) {
    dispatch(redirect({ route: ROUTES.login }));
  }

  if (!!response.result && !!response.result.user) {
    const { user } = response.result;

    dispatch(setUser({ user: user }));
    if (!!response.result.groupes) {
      dispatch(setGroupes({ groupes: response.result.groupes }));
    }

    if (currentRoute === ROUTES.login) {
      if (user.role === "admin" || user.role === "super admin") {
        dispatch(redirect({ route: ROUTES.adminDashboard }));
      } else {
        dispatch(redirect({ route: ROUTES.user.userDashboard }));
      }
    }
    if (!!response.result.categories) {
      dispatch(setCategories({ categories: response.result.categories }));
    }
    if (!!response.result.groupe) {
      dispatch(setGroup({ groupe: response.result.groupe }));
    }
  }

  dispatch(resetLogin());
};
