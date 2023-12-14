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
import GetUser from "../components-admin/get-user/get-user";
import UserDashboard from "../components-user/user-dashboard/user-dashboard";
import NewTodo from "../components-user/new-todo/new-todo";
import UserNav from "../components-user/user-nav/user-nav";
import NewCategorie from "../components-user/new-categorie/new-categorie";

const App = () => {
  const { currentRoute, role, theme } = useSelector((store) => ({
    currentRoute: store.routerState.currentRoute,
    role: store.userState.role,
    theme: store.userState.theme,
  }));
  const dispatch = useDispatch();
  const getCurrentRoute = () => {
    switch (currentRoute) {
      case ROUTES.login:
        return <Login />;
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
      case ROUTES.admin.getAllUsersRequest:
        return <GetUser />;
      case ROUTES.user.userDashboard:
        return <UserDashboard />;
      case ROUTES.user.newTodo:
        return <NewTodo />;
      case ROUTES.user.newCategorie:
        return <NewCategorie />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!getFromStorage("token")) return;
    dispatch(reconnectThunk());
  }, []);

  return (
    <div className={!theme ? "app light" : `app ${theme}`}>
      {/* // <div className="app dark"> */}
      {/* light class name depend on the user setting in their profile */}
      <Header />
      {/* the class "admin" must depend on the role of the user */}
      <main
        className={!role || role === "admin" || role === "super admin" ? "main admin" : "main user"}
      >
        {role === "supervisor" || role === "staff" ? (
          <>
            <UserNav />
            {getCurrentRoute()}
          </>
        ) : (
          getCurrentRoute()
        )}
      </main>
    </div>
  );
};

export default App;
