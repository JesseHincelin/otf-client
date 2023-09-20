import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/button";
import { resetPopup } from "../../../redux/reducers/popup.reducer";
import "./popup.scss";
import { useEffect } from "react";

const Popup = () => {
  const { message } = useSelector((store) => store.popupState);
  const dispatch = useDispatch();

  const handlePopupClick = () => {
    dispatch(resetPopup());
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetPopup());
    }, 6000);
  }, []);

  return (
    <>
      <div className="popup">
        <p className="popup__message">{message}</p>
        <Button
          handleButtonClick={handlePopupClick}
          content="Ok"
          className="popup__button"
          autofocus={true}
        />
      </div>
      <div
        className="overlay"
        onClick={handlePopupClick}
      ></div>
    </>
  );
};

export default Popup;
