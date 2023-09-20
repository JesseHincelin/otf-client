import { setMessage } from "../redux/reducers/popup.reducer";
import {
  resetTargetAccount,
  setTargetAccountError,
  startLoading,
} from "../redux/reducers/targetAccount.reducer";
import { resetTargetUser, setTargetUser } from "../redux/reducers/targetUser.reducer";
import { getFromStorage } from "../utils/global.util";
import { patchRequest } from "./requests.api";

export const editAccountThunk = () => async (dispatch, getStates) => {
  const { loading } = getStates().targetAccountState;
  const { userName, domain, groupe, role } = getStates().targetUserState;

  if (loading) return;
  dispatch(startLoading);

  const response = await patchRequest(
    "admin/edit-user",
    {
      userName: userName,
      domain: domain,
      groupe: groupe,
      role: role,
    },
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(setTargetAccountError({ error: response.error }));
  }

  if (!!response.result && !!response.result.user) {
    dispatch(resetTargetUser());
    dispatch(setTargetUser({ user: response.result.user }));
    dispatch(setMessage({ message: response.result.message }));
    dispatch(resetTargetAccount);
  }
};
