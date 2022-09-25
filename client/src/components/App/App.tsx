import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

import { loadUser, endLoad } from "./App.slice";
import { getUser } from "../../api/api.user";
import { useStoreWithInit } from "../../state/storeHooks";
import Header from "../Header/Header";

function App() {
  const [{ loading, user }, dispatch] = useStoreWithInit(({ app }) => app, loadData);

  async function loadData() {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      dispatch(endLoad());
      return;
    }

    try {
      dispatch(loadUser(await getUser(accessToken)));
    } catch (error) {
      localStorage.removeItem("token");
      console.error(error);
    } finally {
      dispatch(endLoad());
    }
  }

  return (
    <div className="App">
      <Router>
        {user && <Header />}
        {!loading && (
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
