import { useSelector } from 'react-redux'

function HomePage() {
  const profile = useSelector(state => state.firebase.profile);
  return (
    <>
    <div className="container">
      <h1>{profile.displayName}</h1>
    </div>
    </>
  );
}

export default HomePage;