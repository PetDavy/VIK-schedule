import { Link } from "react-router-dom";

import { useStore } from "../../state/storeHooks";
import { getImgTextFromName } from "../../utils/user";
import { logout, openMenu, closeMenu } from "../App/App.slice";
import { setStudents } from "../StudentsList/StudentsList.slice";
import classNames from "classnames";

import "../../assets/styles/components/profile-button.scss";

function ProfileButton() {
  const [{ user, isMenuOpen }, dispatch] = useStore(({ app }) => app);
  const [{ students }] = useStore(({ studentsList }) => studentsList);

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(setStudents([]));
  }

  function handleToggleMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    
    if (isMenuOpen) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  }

  function getAvatar(): JSX.Element | undefined {
    if (user && user.picture) {
      return <img
        src={user.picture}
        alt={user.username}
        width="36"
        height="36"
        className="profile-button__avatar"
      />;
    }

    if (user && !user.picture) {
      return (
        <span className="profile-button__avatar">
          {getImgTextFromName(user.username)}
        </span>
      );
    }
  }

  return (
    <div className="profile-button" onClick={handleToggleMenu}>
      {getAvatar()}
      <div className={classNames('profile-button__menu', {
        'profile-button__menu--open': isMenuOpen
      })}>
        <div className="profile-button__menu-title">
          <div className="profile-button__menu-title-name">{user?.username}</div>
          <div className="profile-button__menu-title-email">{user?.email}</div>
        </div>
        <Link to="/profile" className="profile-button__menu-item">
          Profile
        </Link>
        <div onClick={handleLogout} className="profile-button__menu-item">
          Log out
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
