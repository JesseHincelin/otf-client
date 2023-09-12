import { useSelector } from "react-redux";
import "./admin-dashboard.scss";
import Tile from "../Tile/tile";

const AdminDashboard = (props) => {
  const { userName, role, firstConection, domain, groupe, theme, todosAssigned } = useSelector(
    (store) => store.userState
  );

  return (
    <div className="admin-dashboard">
      <ul>
        <li>
          <ul>
            <li>
              <Tile content="Create account" />
            </li>
            <li>
              <Tile content="Delete account" />
            </li>
            <li>
              <Tile content="Edit account" />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <Tile content="Create groupe" />
            </li>
            <li>
              <Tile content="Delete groupe" />
            </li>
            <li>
              <Tile content="Edit groupe" />
            </li>
          </ul>
        </li>
        <li>
          <Tile content="Reset password" />
        </li>
        <li>
          <Tile content="Get users" />
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
