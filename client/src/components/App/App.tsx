import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Profile from "../../pages/Profile/Profile";
import Students from "../../pages/Students/Students";

import { loadUser, endLoad } from "./App.slice";
import { getUser } from "../../api/api.user";
import { useStoreWithInit } from "../../state/storeHooks";

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
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/students" element={<Students />} />
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
