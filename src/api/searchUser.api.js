import {
  resetTargetAccount,
  setTargetAccountError,
  startLoading,
} from "../redux/reducers/targetAccount.reducer";
import { resetTargetUser, setTargetUser } from "../redux/reducers/targetUser.reducer";
import { getFromStorage } from "../utils/global.util";
import { getRequest } from "./requests.api";

export const searchUserThunk = () => async (dispatch, getStates) => {
  const { loading, userNameValue } = getStates().targetAccountState;

  if (loading) return;
  dispatch(startLoading());
  dispatch(resetTargetUser());

  const response = await getRequest(`admin/get-one-user/${userNameValue}`, getFromStorage("token"));

  if (!!response.error) {
    dispatch(setTargetAccountError({ error: response.error }));
  }

  if (!!response.result && !!response.result.user) {
    dispatch(setTargetUser({ user: response.result.user }));
    dispatch(resetTargetAccount());
  }
};
