import { useStore } from '../../state/storeHooks';

function Home() {
  const [{user}] = useStore(({ app }) => app);

  return (
    <div>
      <h1>User: {user && user.username}</h1>
    </div>
  )
};

export default Home;