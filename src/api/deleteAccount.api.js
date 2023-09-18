import {
  resetTargetAccount,
  setTargetAccountError,
  startLoading,
} from "../redux/reducers/targetAccount.reducer";
import { resetTargetUser } from "../redux/reducers/targetUser.reducer";
import { getFromStorage } from "../utils/global.util";
import { deleteRequest } from "./requests.api";

export const deleteAccountThunk = () => async (dispatch, getStates) => {
  const { loading } = getStates().targetAccountState;
  const { id } = getStates().targetUserState;

  console.log("id to delete in front reducer :", id);

  if (loading) return;
  dispatch(startLoading());

  const response = await deleteRequest(`admin/delete-account/${id}`, getFromStorage("token"));

  if (!!response.error) {
    console.log(response.error);
    dispatch(setTargetAccountError({ error: response.error }));
  }

  if (!!response.result && !!response.result.delete) {
    console.log(response.result);
    dispatch(resetTargetAccount());
    dispatch(resetTargetUser());
  }
};
