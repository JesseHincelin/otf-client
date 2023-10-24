import { startLoading } from "../redux/reducers/login.reducer";
import { resetNewPassword, setNewPasswordError } from "../redux/reducers/new-password.reducer";
import { redirect } from "../redux/reducers/router.reducer";
import { setUser } from "../redux/reducers/user.reducer";
import { getFromStorage } from "../utils/global.util";
import { ROUTES } from "../utils/routes.util";
import { patchRequest } from "./requests.api";

export const changePasswordThunk = () => async (dispatch, getStates) => {
  const { loading, oldPassValue, newPassValue, confPassValue } = getStates().newPasswordState;

  if (loading) return;

  if (newPassValue !== confPassValue) {
    dispatch(setNewPasswordError({ error: "The confirmation must match the new password" }));
    return;
  }

  dispatch(startLoading());

  const response = await patchRequest(
    "user/change-password",
    {
      password: oldPassValue,
      newPassword: newPassValue,
    },
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(setNewPasswordError({ error: response.error }));
  }

  if (!!response.result && !!response.result.user) {
    const { user } = response.result;
    dispatch(setUser({ user: user }));

    if (user.role !== "admin" && user.role !== "super admin") {
      dispatch(redirect({ route: ROUTES.user.userDashboard }));
    } else {
      dispatch(redirect({ route: ROUTES.adminDashboard }));
    }
    dispatch(resetNewPassword());
  }
};
