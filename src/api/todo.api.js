import {
  resetNewTodo,
  setNewTodoError,
  startLoading,
  stopLoading,
} from "../redux/reducers/new-todo.reducer";
import { setMessage } from "../redux/reducers/popup.reducer";
import { setUser } from "../redux/reducers/user.reducer";
import { getFromStorage } from "../utils/global.util";
import { postRequest } from "./requests.api";

export const newTodoThunk = () => async (dispatch, getStates) => {
  const { loading, titleValue, assignedTo, categorie, dueOnValue, priority, detailsValue } =
    getStates().newTodoState;
  const { groupeMembers, categories } = getStates().userState;

  if (loading) return;
  dispatch(startLoading());

  const getAssignedId = () => {
    const assignedIds = [];
    for (let i = 0; i < groupeMembers.length; i++) {
      if (assignedTo.includes(groupeMembers[i].userName)) {
        assignedIds.push(groupeMembers[i].id);
      }
    }
    console.log(assignedIds);
    return assignedIds;
  };

  const getCategorieId = () => {
    let categorieId = null;
    for (let i = 0; i < categories.length; i++) {
      if (categorie === categories[i].name) {
        categorieId = categories[i]._id;
      }
    }
    return categorieId;
  };

  const response = await postRequest(
    "todos/create-todo",
    {
      title: titleValue,
      assignedTo: getAssignedId(),
      categorie: getCategorieId(),
      dueOn: dueOnValue,
      priority: priority,
      detail: detailsValue,
    },
    getFromStorage("token")
  );

  if (!!response.error) {
    dispatch(stopLoading());
    dispatch(setNewTodoError({ error: response.error }));
  }

  if (!!response.result && !!response.result.user) {
    dispatch(setUser({ user: response.result.user }));
    dispatch(setMessage({ message: response.result.message }));
    dispatch(resetNewTodo());
  }
};
