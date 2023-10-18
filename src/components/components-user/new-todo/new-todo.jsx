import { useDispatch, useSelector } from "react-redux";
import { currentDate } from "../../../utils/global.util";
import Button from "../../Button/button";
import Input from "../../Input/input";
import Select from "../../Select/select";
import { PRIORITY, YES_NO } from "../../../utils/selectOptions.util";
import { redirect } from "../../../redux/reducers/router.reducer";
import { ROUTES } from "../../../utils/routes.util";
import { handleFieldChange } from "../../../redux/reducers/new-todo.reducer";
import "./new-todo.scss";

const NewTodo = () => {
  const { userName, loading, error, titleValue, dueOnValue, categories, detailsValue } =
    useSelector((store) => ({
      userName: store.userState.userName,
      categories: store.userState.categories,
      loading: store.newTodoState.loading,
      error: store.newTodoState.error,
      titleValue: store.newTodoState.titleValue,
      dueOnValue: store.newTodoState.dueOnValue,
      detailsValue: store.newTodoState.detailsValue,
    }));

  const dispatch = useDispatch();

  const handleExitClick = () => {
    dispatch(redirect({ route: ROUTES.user.userDashboard }));
  };

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //dispatch new todo thunk
  };

  const getCategories = () => {
    if (categories.length < 1) return;
    const categoriesTitles = ["Select a categorie :"];
    for (let i = 0; i < categories.length; i++) {
      const categorie = categories[i];
      categoriesTitles.push(categorie.name);
    }
    return categoriesTitles;
  };

  return (
    <section className="section section__new-todo">
      <div className="new-todo">
        <h2 className="new-todo__title">New To-do</h2>
        <Button
          handleButtonClick={handleExitClick}
          className="new-todo__exit-button"
          content="X"
          type="button"
        />
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
          <div>
            <Input
              className="new-todo__form--created-on"
              id="created-on"
              label="Created on :"
              value={currentDate()}
              type="text"
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
          </div>
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
          <div>
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
          </div>
          <Select
            className="new-todo__form--categorie"
            options={getCategories()}
            id="categorie"
            label="Categorie :"
            required={true}
            disabled={loading}
            handleSelectChange={(value) => handleFormChange(value, "categorie")}
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
          <Button
            type="submit"
            className="new-todo__form--button"
            disabled={loading}
            content="Create new to-do"
          />
        </form>
      </div>
    </section>
  );
};

export default NewTodo;
