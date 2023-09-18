import {
  resetDeleteAccount,
  setDeleteAccountError,
  startLoading,
} from "../redux/reducers/deleteAccount.reducer";
import { resetTargetUser } from "../redux/reducers/targetUser.reducer";
import { getFromStorage } from "../utils/global.util";
import { deleteRequest } from "./requests.api";

export const deleteAccountThunk = () => async (dispatch, getStates) => {
  const { loading } = getStates().deleteAccountState;
  const { id } = getStates().targetUserState;

  console.log("id to delete in front reducer :", id);

  if (loading) return;
  dispatch(startLoading());

  const response = await deleteRequest(`admin/delete-account/${id}`, getFromStorage("token"));

  if (!!response.error) {
    dispatch(setDeleteAccountError({ error: response.error }));
  }

  if (!!response.result) {
    dispatch(resetDeleteAccount());
    dispatch(resetTargetUser());
  }
};
