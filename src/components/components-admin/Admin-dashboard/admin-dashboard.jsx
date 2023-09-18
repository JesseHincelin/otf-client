import { useDispatch, useSelector } from "react-redux";
import "./admin-dashboard.scss";
import Tile from "../Tile/tile";
import { redirect } from "../../../redux/reducers/router.reducer";
import { ROUTES } from "../../../utils/routes.util";

const AdminDashboard = (props) => {
  // const { userName, role, firstConection, domain, groupe, theme, todosAssigned } = useSelector(
  //   (store) => store.userState
  // );

  const dispatch = useDispatch();

  const handleFieldClick = (props) => {
    dispatch(redirect({ route: ROUTES.admin[props] }));
  };

  return (
    <div className="admin-dashboard">
      <ul>
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
