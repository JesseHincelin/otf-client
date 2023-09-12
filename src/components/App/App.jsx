import { useSelector } from "react-redux";
import Header from "../Header/header";
import "./App.scss";
import Login from "../Login/login";
import { ROUTES } from "../../utils/routes.util";
import AdminDashboard from "../components-admin/Admin-dashboard/admin-dashboard";
import ChangePassword from "../Change-password/change-password";

const App = () => {
  const { currentRoute } = useSelector((store) => store.routerState);

  const getCurrentRoute = () => {
    switch (currentRoute) {
      case ROUTES.login:
        return <Login />;
      case ROUTES.dashboard:
        return; //indicate the component dashboard
      case ROUTES.adminDashboard:
        return <AdminDashboard />;
      case ROUTES.changePassword:
        console.log("route change password");
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <div className="App light">
      <Header />
      {/* the class "admin" must depend on the role of the user */}
      <main className="main admin">{getCurrentRoute()}</main>
    </div>
  );
};

export default App;
