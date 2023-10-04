import { setMessage } from "../redux/reducers/popup.reducer";
import {
  resetTargetAccount,
  setTargetAccountError,
  startLoading,
} from "../redux/reducers/targetAccount.reducer";
import { resetTargetUser } from "../redux/reducers/targetUser.reducer";
import { setUser } from "../redux/reducers/user.reducer";
import { getFromStorage } from "../utils/global.util";
import { patchRequest } from "./requests.api";

export const resetPasswordThunk = () => async (dispatch, getStates) => {
  const { loading } = getStates().targetAccountState;
  const { userName, password } = getStates().targetUserState;

  if (loading) return;
  dispatch(startLoading());

  const response = await patchRequest(
    "admin/reset-password",
    {
      userName: userName,
      newPassword: password,
    },
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(setTargetAccountError({ error: response.error }));
  }

  if (!!response.result && !!response.result.user) {
    dispatch(setUser({ user: response.result.user }));
    dispatch(setMessage({ message: response.result.message }));
    dispatch(resetTargetAccount());
    dispatch(resetTargetUser());
  }
};
