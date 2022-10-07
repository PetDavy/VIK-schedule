import Navigation from '../../components/Navigation/Navigation';
import StudentsList from '../../components/StudentsList/StudentsList';

function Dashboard() {
  return (
    <div className="Dashboard">
      <Navigation />
      <StudentsList />
    </div>
  )
};

export default Dashboard;