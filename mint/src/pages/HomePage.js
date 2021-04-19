import { useSelector } from 'react-redux';

import Controls from '../components/Controls';

function HomePage() {

  const profile = useSelector(state => state.firebase.profile);
  const defaultProfile = useSelector(state => state.firebase.auth);
  const controls = useSelector((state) => state.firestore.data.controls);

  const user = {
    name: ""
  };

  const appliances = {
    heading: 'Appliances',
    cards: controls,
    docName: 'controls'
  }

  if (!profile.displayName) {
    user.name = defaultProfile.displayName;
  } else {
    user.name = profile.displayName;
  }

  return (
    <section className="spad-2">
      <div className="container">
        <div className="row">
          <div className="col-12">
          <div className="section-title">
            <h3>Dashboard</h3>
            <p>Welcome, {user.name}</p>
          </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="row">
            <div className="col-12">
              <Controls info={ appliances }/>
            </div>
          </div>
        </div>
      </div>
      </section>
  );
}

export default HomePage;