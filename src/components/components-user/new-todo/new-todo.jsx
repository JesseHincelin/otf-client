import { useDispatch, useSelector } from "react-redux";
import { USER_ROLE, currentDate, generateId } from "../../../utils/global.util";
import Button from "../../Button/button";
import Input from "../../Input/input";
import Select from "../../Select/select";
import { PRIORITY, YES_NO } from "../../../utils/selectOptions.util";
import { redirect } from "../../../redux/reducers/router.reducer";
import { ROUTES } from "../../../utils/routes.util";
import newTodoReducer, {
  handleFieldChange,
  setAssignedTo,
} from "../../../redux/reducers/new-todo.reducer";
import "./new-todo.scss";
import { useState } from "react";
import { newTodoThunk } from "../../../api/todo.api";
import Popup from "../../components-admin/Popup/popup";

const NewTodo = () => {
  const {
    userName,
    loading,
    error,
    titleValue,
    dueOnValue,
    categories,
    groupe,
    role,
    detailsValue,
    assignedTo,
    activePopup,
  } = useSelector((store) => ({
    userName: store.userState.userName,
    categories: store.userState.categories,
    groupe: store.userState.groupe,
    role: store.userState.role,
    loading: store.newTodoState.loading,
    error: store.newTodoState.error,
    titleValue: store.newTodoState.titleValue,
    dueOnValue: store.newTodoState.dueOnValue,
    detailsValue: store.newTodoState.detailsValue,
    assignedTo: store.newTodoState.assignedTo,
    activePopup: store.popupState.activePopup,
  }));

  const [categorie, setCategorie] = useState("");

  const dispatch = useDispatch();

  const handleExitClick = () => {
    dispatch(redirect({ route: ROUTES.user.userDashboard }));
  };

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleCategorieChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
    setCategorie(value);
  };

  const handleAssignementChange = (value) => {
    const newAssignement = [...assignedTo];
    if (!newAssignement.includes(value)) {
      newAssignement.push(value);
      dispatch(setAssignedTo({ assignedTo: newAssignement }));
    }
  };

  const removeSelected = (value) => {
    const newAssignement = [...assignedTo];
    if (newAssignement.includes(value)) {
      newAssignement.splice(newAssignement.indexOf(value), 1);
      dispatch(setAssignedTo({ assignedTo: newAssignement }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(newTodoThunk());
  };

  const getCategories = () => {
    if (categories?.length < 1) return;
    const categoriesTitles = ["Select a categorie :"];
    for (let i = 0; i < categories.length; i++) {
      categoriesTitles.push(categories[i].name);
    }
    return categoriesTitles;
  };

  const getGroup = () => {
    if (groupe?.length < 1) return;
    const groupeMembers = ["Assigne to a group member :"];
    for (let i = 0; i < groupe.length; i++) {
      groupeMembers.push(groupe[i].userName);
    }
    return groupeMembers;
  };

  const checkCategorie = () => {
    let color = "";
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name === categorie) {
        color = categories[i].color;
      }
    }
    return color;
  };

  return (
    <section className="section section__new-todo">
      <div
        className="new-todo"
        style={
          !categorie ? { background: "var(--default-color)" } : { background: checkCategorie() }
        }
      >
        <div className="section__header">
          <h2 className="new-todo__title">New To-do</h2>
          <Button
            handleButtonClick={handleExitClick}
            className="new-todo__exit-button"
            content="X"
            type="button"
          />
        </div>
        <form
          action=""
          className="new-todo__form"
          onSubmit={handleSubmit}
        >
          <Input
            className="new-todo__form--title"
            id="title"
            label="Title :"
            value={titleValue}
            disabled={loading}
            required={true}
            placeholder="Ex : Prepare contract for Mr X"
            handleInputChange={(value) => handleFormChange(value, "titleValue")}
          />
          <Input
            className="new-todo__form--created-on"
            id="created-on"
            label="Created on :"
            value={currentDate()}
            type="date"
            disabled={loading}
            readOnly={true}
          />
          <Input
            className="new-todo__form--created-by"
            id="created-by"
            label="By :"
            value={userName}
            disabled={loading}
            readOnly={true}
          />

          <Input
            className="new-todo__form--due-on"
            id="due-on"
            label="Due on :"
            type="date"
            required={true}
            value={dueOnValue}
            disabled={loading}
            handleInputChange={(value) => handleFormChange(value, "dueOnValue")}
          />
          <Select
            className="new-todo__form--priority"
            options={PRIORITY}
            id="priority"
            label="Priority :"
            required={true}
            disabled={loading}
            handleSelectChange={(value) => handleFormChange(value, "priority")}
          />
          <Select
            className="new-todo__form--group"
            options={YES_NO}
            id="group"
            label="Group task :"
            required={true}
            disabled={loading}
            handleSelectChange={(value) => handleFormChange(value, "groupeTask")}
          />
          <Select
            className="new-todo__form--categorie"
            options={getCategories()}
            id="categorie"
            label="Categorie :"
            required={true}
            disabled={loading}
            handleSelectChange={(value) => handleCategorieChange(value, "categorie")}
          />
          <Input
            className="new-todo__form--details"
            id="details"
            label="Details :"
            required={true}
            value={detailsValue}
            disabled={loading}
            handleInputChange={(value) => handleFormChange(value, "detailsValue")}
          />
          {role === USER_ROLE.SUPERVISOR ? (
            <>
              <Select
                className="new-todo__form--assigned-to"
                options={getGroup()}
                id="assigned-to"
                label="Assigned to :"
                required={true}
                disabled={loading}
                handleSelectChange={(value) => handleAssignementChange(value)}
              />
              <div className="selected-box">
                <h5 className="selected-box__title">Group member(s) selected :</h5>
                <ul className="selected-box__list">
                  {!assignedTo?.length < 1
                    ? assignedTo.map((obj) => (
                        <li
                          key={generateId()}
                          className="selected-box__element"
                        >
                          <span className="selected-box__element--user">{obj}</span>
                          <button
                            className="selected-box__element--button"
                            onClick={() => removeSelected(obj)}
                          >
                            remove
                          </button>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </>
          ) : null}
          <Button
            type="submit"
            className="new-todo__form--button"
            disabled={loading}
            content="Create new to-do"
          />
        </form>
      </div>
      {!!activePopup && <Popup />}
    </section>
  );
};

export default NewTodo;
