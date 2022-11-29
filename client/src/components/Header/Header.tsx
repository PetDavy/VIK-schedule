import { Link } from "react-router-dom";

import LogoIcon from "../../assets/icons/logo.svg";
import ProfileButton from "../ProfileButton/ProfileButton"

import '../../assets/styles/components/header.scss';

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img
          src={LogoIcon}
          alt="VIK Schedule"
          className="header__logo"
          width="180"
        />
      </Link>
      <ProfileButton />
    </header>
  )
}

export default Header