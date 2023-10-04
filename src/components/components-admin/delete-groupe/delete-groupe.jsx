import { useDispatch, useSelector } from "react-redux";
import { handleFieldChange } from "../../../redux/reducers/groupe.reducer";
import GroupeNav from "../groupe-nav/groupe-nav";
import Select from "../../Select/select";
import Button from "../../Button/button";
import Popup from "../Popup/popup";
import { deleteGroupeThunk } from "../../../api/Groupe.api";
import { groupesOptions } from "../../../utils/groupe.utils";

const DeleteGroupe = () => {
  const { groupes, loading, error, activePopup } = useSelector((store) => ({
    groupes: store.groupeState.groupes,
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
    dispatch(deleteGroupeThunk());
  };

  return (
    <div className="admin__block">
      <GroupeNav />
      <div className="box">
        <h2 className="box__title">Delete groupe</h2>
        <form
          action=""
          onSubmit={handleSubmit}
        >
          <ul>
            <li>
              <Select
                className="delete-groupe__form--title"
                options={groupesOptions(groupes, "Select the groupe to delete :")}
                id="deleteTitle"
                label="Groupe to delete :"
                required={true}
                disabled={loading}
                handleSelectChange={(value) => handleFormChange(value, "titleValue")}
              />
            </li>
          </ul>
          {!!error && <span className="error">{error}</span>}
          <Button
            type="submit"
            className="delete-groupe__form--button"
            content="Delete"
            disabled={loading}
          />
        </form>
      </div>
      {!!activePopup && <Popup />}
    </div>
  );
};

export default DeleteGroupe;
