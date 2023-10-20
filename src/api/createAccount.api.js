import {
  resetCreateAccount,
  setCreateAccountError,
  startLoading,
} from "../redux/reducers/createAccount.reducer";
import { setMessage } from "../redux/reducers/popup.reducer";
import { resetTargetUser, setTargetUser } from "../redux/reducers/targetUser.reducer";
import { getFromStorage } from "../utils/global.util";
import { getGroupeId } from "../utils/groupe.utils";
import { postRequest } from "./requests.api";

export const createAccountThunk = () => async (dispatch, getStates) => {
  const { loading, userNameValue, passwordValue, domainValue, groupeValue, role } =
    getStates().createAccountState;

  const { groupes } = getStates().groupeState;

  if (loading) return;
  dispatch(startLoading());
  dispatch(resetTargetUser());

  const response = await postRequest(
    "admin/create-account",
    {
      userName: userNameValue,
      password: passwordValue,
      domain: domainValue,
      groupe: getGroupeId(groupes, groupeValue),
      role: role,
    },
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(setCreateAccountError({ error: response.error }));
  }
  if (!!response.result && !!response.result.user) {
    dispatch(setTargetUser({ user: response.result.user }));
    dispatch(setMessage({ message: response.result.message }));
    dispatch(resetCreateAccount());
  }
};
