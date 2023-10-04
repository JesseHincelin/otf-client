import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/button";
import Input from "../../Input/input";
import Select from "../../Select/select";
import Popup from "../Popup/popup";
import GroupeNav from "../groupe-nav/groupe-nav";
import { handleFieldChange, setGroupeError } from "../../../redux/reducers/groupe.reducer";
import { editGroupeThunk } from "../../../api/Groupe.api";
import { groupesOptions } from "../../../utils/groupe.utils";

const EditGroupe = () => {
  const { groupes, newTitleValue, loading, error, activePopup } = useSelector((store) => ({
    groupes: store.groupeState.groupes,
    newTitleValue: store.groupeState.newTitleValue,
    loading: store.groupeState.loading,
    error: store.groupeState.error,
    activePopup: store.popupState.activePopup,
  }));

  const dispatch = useDispatch();

  const handleFormChange = (value, props) => {
    dispatch(handleFieldChange({ value, props }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < groupes.length; i++) {
      if (groupes[i].title === newTitleValue) {
        dispatch(setGroupeError({ error: "This groupe already exist. Chose a different title." }));
        return;
      }
    }
    dispatch(editGroupeThunk());
  };

  return (
    <div className="admin__block">
      <GroupeNav />
      <div className="box">
        <h2 className="box__title">Edit groupe</h2>
        <form
          action=""
          onSubmit={handleSubmit}
        >
          <ul>
            <li>
              <Select
                className="edit-groupe__form--title"
                options={groupesOptions(groupes, "Select the groupe to edit :")}
                id="editTitle"
                label="Groupe to edit :"
                required={true}
                disabled={loading}
                handleSelectChange={(value) => handleFormChange(value, "titleValue")}
              />
            </li>
            <li>
              <Input
                className="edit-groupe__form--new--title"
                id="title"
                label="New title :"
                value={newTitleValue}
                disabled={loading}
                required={true}
                handleInputChange={(value) => handleFormChange(value, "newTitleValue")}
              />
            </li>
          </ul>
          {!!error && <span className="error">{error}</span>}
          <Button
            type="submit"
            className="edit-groupe__form--button"
            content="Edit"
            disabled={loading}
          />
        </form>
      </div>
      {!!activePopup && <Popup />}
    </div>
  );
};

export default EditGroupe;
