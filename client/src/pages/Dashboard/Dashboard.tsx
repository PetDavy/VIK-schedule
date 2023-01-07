import Navigation from '../../components/Navigation/Navigation';
import StudentsList from '../../components/StudentsList/StudentsList';

import "../../assets/styles/dashboard.scss";

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard__content">
        <Navigation />
        <div className="chart"></div>
        <StudentsList />
        <div className="lessons"></div>
      </div>
    </main>
  )
};

export default Dashboard;