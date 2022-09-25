import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Students</Link>
        </li>
        <li>
          <Link to="/">Schedule</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
