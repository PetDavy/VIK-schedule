import Navigation from '../../components/Navigation/Navigation';
import StudentsList from '../../components/StudentsList/StudentsList';

import "../../assets/styles/dashboard.scss";

function Dashboard() {
  return (
    <main className="dashboard">
      <Navigation />
      <div className="chart"></div>
      <div className="lessons"></div>
      <StudentsList />
    </main>
  )
};

export default Dashboard;