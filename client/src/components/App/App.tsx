import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";

import { loadUser, endLoad } from "./App.slice";
import { getUser } from "../../api/api";
import { useStore } from "../../state/storeHooks";


function App() {
  const [{loading, user}, dispatch] = useStore(({ app }) => app, loadData);

  async function loadData() {
    const accessToken = localStorage.getItem('token');
  
    if (!accessToken) {
      dispatch(endLoad());
      return;
    }
  
    try {
      dispatch(loadUser(await getUser(accessToken)));
    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(endLoad());
    }
  }

  return (
    <div className="App">
      <Router>
        {!loading && (
          <Routes>
            user ? (
              <Route path="/" element={<Home />} />
            ) : (
              <Route path="/" element={<Login />} />
            )
          </Routes>   
        ) }
      </Router>
    </div>
  )
};

export default App
