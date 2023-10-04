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
import EditAccount from "../components-admin/edit-account/edit-account";
import ResetPassword from "../components-admin/reset-password/reset-password";
import CreateGroupe from "../components-admin/create-groupe/create-groupe";
import EditGroupe from "../components-admin/edit-groupe/edit-groupe";
import DeleteGroupe from "../components-admin/delete-groupe/delete-groupe";

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
      case ROUTES.admin.editAccount:
        return <EditAccount />;
      case ROUTES.admin.deleteAccount:
        return <DeleteAccount />;
      case ROUTES.admin.resetPassword:
        return <ResetPassword />;
      case ROUTES.admin.createGroupe:
        return <CreateGroupe />;
      case ROUTES.admin.editGroupe:
        return <EditGroupe />;
      case ROUTES.admin.deleteGroupe:
        return <DeleteGroupe />;
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
      {/* light class name depend on the user setting in their profile */}
      <Header />
      {/* the class "admin" must depend on the role of the user */}
      <main className="main admin">{getCurrentRoute()}</main>
    </div>
  );
};

export default App;
