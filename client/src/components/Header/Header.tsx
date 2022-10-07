import { Link } from "react-router-dom"

import ProfileButton from "../ProfileButton/ProfileButton"

function Header() {
  return (
    <header className="Header" style={{display: 'flex', justifyContent: 'space-between'}}>
      <Link to="/">
        <h2>VIK Schedule</h2>
      </Link>
      <ProfileButton />
    </header>
  )
}

export default Header