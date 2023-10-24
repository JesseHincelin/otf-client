import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/button";
import Input from "../../Input/input";
import {
  handleFieldChange,
  resetNewCategorie,
  setNewCategorieError,
} from "../../../redux/reducers/new-categorie.reducer";
import { redirect } from "../../../redux/reducers/router.reducer";
import { ROUTES } from "../../../utils/routes.util";
import { newCategorieThunk } from "../../../api/categorie.api";
import Popup from "../../components-admin/Popup/popup";

const NewCategorie = () => {
  const { loading, error, titleValue, color, categories, activePopup } = useSelector((store) => ({
    loading: store.newCategorieState.loading,
    error: store.newCategorieState.error,
    titleValue: store.newCategorieState.titleValue,
    color: store.newCategorieState.color,
    categories: store.userState.categories,
    activePopup: store.popupState.activePopup,
  }));

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    if (props === "titleValue") {
      for (let i = 0; i < categories.length; i++) {
        if (value === categories[i].name) {
          dispatch(setNewCategorieError({ error: "This categorie title already exist." }));
        } else {
          dispatch(setNewCategorieError({ error: "" }));
        }
      }
    }
    dispatch(handleFieldChange({ value, props }));
  };

  const handleExitClick = () => {
    dispatch(resetNewCategorie());
    dispatch(redirect({ route: ROUTES.user.userDashboard }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!!error) return;
    dispatch(newCategorieThunk());
  };

  return (
    <section className="section section__new-categorie">
      <div
        className="new-categorie block"
        style={!color ? { background: "var(--default-color)" } : { background: `${color}` }}
      >
        <div className="section__header">
          <h2 className="new-categorie__title block__title">New Categorie</h2>
          <Button
            handleButtonClick={handleExitClick}
            className="new-categorie__exit-button block__exit-button"
            content="X"
            type="button"
          />
        </div>
        <form
          action=""
          className="new-categorie__form block__form"
          onSubmit={handleSubmit}
        >
          <Input
            className="new-categorie__form--title"
            id="title"
            label="Title :"
            value={titleValue}
            disabled={loading}
            required={true}
            placeholder="Ex : Contracts"
            handleInputChange={(value) => handleFormChange(value, "titleValue")}
          />
          <Input
            className="new-categorie__form--color color"
            id="color"
            label="Color :"
            type="color"
            value={!color ? "#f8f9a4" : color}
            disabled={loading}
            required={true}
            handleInputChange={(value) => handleFormChange(value, "color")}
          />
          {!!error && <span className="error">{error}</span>}
          <Button
            type="submit"
            className="new-categorie__form--button block__form--button"
            disabled={loading}
            content="Create new categorie"
          />
        </form>
      </div>
      {!!activePopup && <Popup />}
    </section>
  );
};

export default NewCategorie;
