import { useDispatch, useSelector } from "react-redux";
import "./admin-dashboard.scss";
import Tile from "../Tile/tile";
import { redirect } from "../../../redux/reducers/router.reducer";
import { ROUTES } from "../../../utils/routes.util";
import { useEffect, useState } from "react";
import { screen } from "@testing-library/react";

const AdminDashboard = (props) => {
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  const dispatch = useDispatch();

  const handleFieldClick = (props) => {
    dispatch(redirect({ route: ROUTES.admin[props] }));
  };

  function getScreenWidth() {
    return window.innerWidth;
  }
  // si j'écrit la fonction précedente sous la forme "const get.. = () => {}",
  // elle n'est pas accessible au chargement de la page dans le useEffect et
  // en valeur par defaut pour le useState alors que sous la form
  // "function get.. (){ }", aucun problème. Garder ça en mémoire !

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(getScreenWidth());
    };
    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [screenWidth]);

  return (
    <div className="admin-dashboard">
      <ul className="tile-list">
        {screenWidth <= 1045 ? (
          <>
            <li>
              <Tile
                content="Account"
                handleTileClick={() => handleFieldClick("createAccount")}
              />
            </li>
            <li>
              <Tile
                content="Groupe"
                handleTileClick={() => handleFieldClick("createGroupe")}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <ul>
                <li>
                  <Tile
                    content="Delete account"
                    handleTileClick={() => handleFieldClick("deleteAccount")}
                  />
                </li>
                <li>
                  <Tile
                    content="Create account"
                    handleTileClick={() => handleFieldClick("createAccount")}
                  />
                </li>
                <li>
                  <Tile
                    content="Edit account"
                    handleTileClick={() => handleFieldClick("editAccount")}
                  />
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li>
                  <Tile
                    content="Delete groupe"
                    handleTileClick={() => handleFieldClick("deleteGroupe")}
                  />
                </li>
                <li>
                  <Tile
                    content="Create groupe"
                    handleTileClick={() => handleFieldClick("createGroupe")}
                  />
                </li>
                <li>
                  <Tile
                    content="Edit groupe"
                    handleTileClick={() => handleFieldClick("editGroupe")}
                  />
                </li>
              </ul>
            </li>
          </>
        )}
        <li>
          <Tile
            content="Reset password"
            handleTileClick={() => handleFieldClick("resetPassword")}
          />
        </li>
        <li>
          <Tile
            content="Get users"
            handleTileClick={() => handleFieldClick("getAllUsersRequest")}
          />
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
