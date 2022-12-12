import Navigation from '../../components/Navigation/Navigation';
import StudentsList from '../../components/StudentsList/StudentsList';

import "../../assets/styles/dashboard.scss";

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard__content">
        <Navigation />
        <div className="chart"></div>
        <div className="lessons"></div>
        <StudentsList />
      </div>
    </main>
  )
};

export default Dashboard;