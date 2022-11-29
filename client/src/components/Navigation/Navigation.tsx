import { Link } from "react-router-dom";
import { useStore } from "../../state/storeHooks";

import StudentsIcon from '../../assets/icons/students.svg';
import ScheduleIcon from '../../assets/icons/schedule.svg';

import "../../assets/styles/components/navigation.scss";

function Navigation() {
  const [{ students }] = useStore(({ studentsList }) => studentsList);

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item-container">
          <Link to="/students" className="navigation__item">
            <img src={StudentsIcon} alt="students" className="navigation__item-icon"  height="35" />
            <span className="navigation__item-name">
              + Student 
            </span>
            <span className="navigation__item-count">
              {students.length} 
            </span>
          </Link>
        </li>
        <li className="navigation__item-container">
          <Link to="/" className="navigation__item">
            <img src={ScheduleIcon} alt="schedule" className="navigation__item-icon"  height="35" />
            <span className="navigation__item-name">
              Schedule
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
