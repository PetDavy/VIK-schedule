import { useStore } from "../../state/storeHooks";
import { logout } from "../App/App.slice";

function ProfileButton() {
  const [{ user }, dispatch] = useStore(({ app }) => app);
  console.log("user", user);

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
  }

  function getAvatar(): JSX.Element | undefined {
    if (user && user.picture) {
      return <img src={user.picture} alt={user.username} />;
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
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

function getImgTextFromName(name: string) {
  const [firstName, lastName] = name.split(" ");
  const firstLetter = firstName[0];
  const secondLetter = lastName ? lastName[0] : "";

  return `${firstLetter}${secondLetter}`.toUpperCase();
}

export default ProfileButton;
