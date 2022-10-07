import { Link } from "react-router-dom";

import "./Navigation.scss";

function Navigation() {
  return (
    <nav className="Navigation">
      <ul className="Navigation__list">
        <li className="Navigation__item-container">
          <Link to="/students" className="Navigation__item">
           + Student 
          </Link>
        </li>
        <li className="Navigation__item-container">
          <Link to="/" className="Navigation__item">
            Schedule
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
