import {
  resetNewCategorie,
  setNewCategorieError,
  startLoading,
  stopLoading,
} from "../redux/reducers/new-categorie.reducer";
import { setMessage } from "../redux/reducers/popup.reducer";
import { setCategories } from "../redux/reducers/user.reducer";
import { getFromStorage } from "../utils/global.util";
import { postRequest } from "./requests.api";

export const newCategorieThunk = () => async (dispatch, getStates) => {
  const { loading, titleValue, color } = getStates().newCategorieState;

  if (loading) return;
  dispatch(startLoading());

  const response = await postRequest(
    "user/create-categorie",
    {
      name: titleValue,
      color: color,
    },
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(stopLoading());
    dispatch(setNewCategorieError({ error: response.error }));
  }

  if (!!response.result && !!response.result.categories) {
    dispatch(setCategories({ categories: response.result.categories }));
    dispatch(setMessage({ message: response.result.message }));
    dispatch(resetNewCategorie());
  }
};
