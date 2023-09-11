import { useSelector } from "react-redux";
import Header from "../Header/header";
import "./App.scss";
import Login from "../Login/login";
import { ROUTES } from "../../utils/routes.util";

const App = () => {
  const { currentRoute } = useSelector((store) => store.routerState);

  const getCurrentRoute = () => {
    switch (currentRoute) {
      case ROUTES.login:
        return <Login />;
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
