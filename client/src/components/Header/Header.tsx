import Navigation from "../Navigation/Navigation"
import ProfileButton from "../ProfileButton/ProfileButton"

function Header() {
  return (
    <header className="Header" style={{display: 'flex', justifyContent: 'space-between'}}>
      <Navigation />
      <ProfileButton />
    </header>
  )
}

export default Header