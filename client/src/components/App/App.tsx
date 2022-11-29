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
import Student from "../../pages/Student/Student";

import { loadUser, endLoad as endUserLoad, closeMenu } from "./App.slice";
import {
  setStudents,
  startLoad as startStudentLoad,
  endLoad as endStudentsLoad,
} from "../StudentsList/StudentsList.slice";
import { getUser } from "../../api/api.user";
import { loadStudents } from "../../api/api.student";
import { useStoreWithInit } from "../../state/storeHooks";
import React from "react";

function App() {
  const [{ loading, user }, dispatch] = useStoreWithInit(
    ({ app }) => app,
    loadData
  );

  async function loadData() {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      dispatch(endUserLoad());
      return;
    }

    try {
      dispatch(loadUser(await getUser(accessToken)));
      loadUserStudents(accessToken);
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(endStudentsLoad());
      dispatch(endUserLoad());
      console.error(error);
    }
  }

  async function loadUserStudents(token: string) {
    dispatch(startStudentLoad());
    dispatch(setStudents(await loadStudents(token)));
  }

  function handleGlobalClick(event: React.MouseEvent<HTMLDivElement>) {
    dispatch(closeMenu());
  }

  return (
    <div className="App" onClick={handleGlobalClick}>
      <Router>
        {user && <Header />}
        {!loading && (
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/:id" element={<Student />} />
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
