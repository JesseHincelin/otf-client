import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/header";
import "./App.scss";
import Login from "../Login/login";
import { ROUTES } from "../../utils/routes.util";
import AdminDashboard from "../components-admin/Admin-dashboard/admin-dashboard";
import ChangePassword from "../Change-password/change-password";
import CreateAccount from "../components-admin/create-account/create-account";
import { useEffect } from "react";
import { reconnectThunk } from "../../api/login.api";
import DeleteAccount from "../components-admin/delete-account/delete-acount";
import { getFromStorage } from "../../utils/global.util";

const App = () => {
  const { currentRoute } = useSelector((store) => store.routerState);
  const dispatch = useDispatch();
  const getCurrentRoute = () => {
    switch (currentRoute) {
      case ROUTES.login:
        return <Login />;
      case ROUTES.dashboard:
        return; //indicate the component dashboard
      case ROUTES.adminDashboard:
        return <AdminDashboard />;
      case ROUTES.changePassword:
        return <ChangePassword />;
      case ROUTES.admin.createAccount:
        return <CreateAccount />;
      case ROUTES.admin.deleteAccount:
        return <DeleteAccount />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!getFromStorage("token")) return;
    dispatch(reconnectThunk());
  }, []);

  return (
    <div className="App light">
      <Header />
      {/* the class "admin" must depend on the role of the user */}
      <main className="main admin">{getCurrentRoute()}</main>
    </div>
  );
};

export default App;
