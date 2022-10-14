import { Link } from "react-router-dom";

import { useStore } from "../../state/storeHooks";
import { getImgTextFromName } from "../../utils/user";
import { logout } from "../App/App.slice";
import { setStudents } from "../StudentsList/StudentsList.slice";

function ProfileButton() {
  const [{ user }, dispatch] = useStore(({ app }) => app);
  const [{ students }] = useStore(({ studentsList }) => studentsList);

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(setStudents([]));
  }

  function getAvatar(): JSX.Element | undefined {
    if (user && user.picture) {
      return <img src={user.picture} alt={user.username} width="100" height="125" />;
    }

    if (user && !user.picture) {
      return (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            background: "purple",
            color: "#fff",
            width: "30px",
            height: "30px",
          }}
        >
          {getImgTextFromName(user.username)}
        </span>
      );
    }
  }

  return (
    <div className="ProfileButton">
      {getAvatar()}
      <h2>{user?.username}</h2>
      <Link to="/profile">Edit</Link>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default ProfileButton;
