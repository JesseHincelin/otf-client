import {
  resetGroupeValue,
  setGroupeError,
  setGroupes,
  startLoading,
} from "../redux/reducers/groupe.reducer";
import { setMessage } from "../redux/reducers/popup.reducer";
import { getGroupeId } from "../utils/groupe.utils";
import { getFromStorage } from "../utils/global.util";
import { deleteRequest, patchRequest, postRequest } from "./requests.api";

export const createGroupeThunk = () => async (dispatch, getStates) => {
  const { loading, titleValue } = getStates().groupeState;

  if (loading) return;
  dispatch(startLoading());

  const response = await postRequest(
    "admin/create-groupe",
    {
      title: titleValue,
    },
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(setGroupeError({ error: response.error }));
  }

  if (!!response.result && !!response.result.groupes) {
    dispatch(setGroupes({ groupes: response.result.groupes }));
    dispatch(setMessage({ message: response.result.message }));
    dispatch(resetGroupeValue());
  }
};

export const editGroupeThunk = () => async (dispatch, getStates) => {
  const { loading, titleValue, groupes, newTitleValue } = getStates().groupeState;

  if (loading) return;
  dispatch(startLoading());

  const response = await patchRequest(
    "admin/edit-groupe",
    {
      newTitle: newTitleValue,
      groupeId: getGroupeId(groupes, titleValue),
    },
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(setGroupeError({ error: response.error }));
  }

  if (!!response.result && !!response.result.groupes) {
    dispatch(setGroupes({ groupes: response.result.groupes }));
    dispatch(setMessage({ message: response.result.message }));
    dispatch(resetGroupeValue());
  }
};

export const deleteGroupeThunk = () => async (dispatch, getStates) => {
  const { loading, titleValue, groupes } = getStates().groupeState;

  if (loading) return;
  dispatch(startLoading());

  const response = await deleteRequest(
    `admin/delete-groupe/${getGroupeId(groupes, titleValue)}`,
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(setGroupeError({ error: response.error }));
  }

  if (!!response.result && !!response.result.groupes) {
    dispatch(setGroupes({ groupes: response.result.groupes }));
    dispatch(setMessage({ message: response.result.message }));
    dispatch(resetGroupeValue());
  }
};
