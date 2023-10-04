import { useDispatch, useSelector } from "react-redux";
import GroupeNav from "../groupe-nav/groupe-nav";
import { handleFieldChange, setGroupeError } from "../../../redux/reducers/groupe.reducer";
import Input from "../../Input/input";
import Button from "../../Button/button";
import Popup from "../Popup/popup";
import { createGroupeThunk } from "../../../api/Groupe.api";

const CreateGroupe = () => {
  const { loading, error, titleValue, activePopup, groupes } = useSelector((store) => ({
    loading: store.groupeState.loading,
    error: store.groupeState.error,
    titleValue: store.groupeState.titleValue,
    activePopup: store.popupState.activePopup,
    groupes: store.groupeState.groupes,
  }));

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < groupes.length; i++) {
      if (groupes[i].title === titleValue) {
        dispatch(setGroupeError({ error: "This groupe already exist. Chose a different title." }));
        return;
      }
    }
    dispatch(setGroupeError({ error: "" }));
    dispatch(createGroupeThunk());
  };

  return (
    <div className="admin__block">
      <GroupeNav />
      <div className="box">
        <h2 className="box__title">Create groupe</h2>
        <form
          action=""
          onSubmit={handleSubmit}
        >
          <ul>
            <li>
              <Input
                className="create-groupe__form--title"
                id="title"
                label="Groupe title :"
                value={titleValue}
                disabled={loading}
                required={true}
                handleInputChange={(value) => handleFormChange(value, "titleValue")}
              />
            </li>
          </ul>
          {!!error && <span className="error">{error}</span>}
          <Button
            type="submit"
            className="create-groupe__form--button"
            content="Create"
            disabled={loading}
          />
        </form>
      </div>
      {!!activePopup && <Popup />}
    </div>
  );
};

export default CreateGroupe;
