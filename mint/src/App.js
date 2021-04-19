import './assets/style/style.scss';

import { useFirestoreConnect } from 'react-redux-firebase';

import { Switch, Route } from "react-router-dom";

import NavbarPage from './components/NavbarPage';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import SigninPage from './pages/SignIn';
import SignupPage from './pages/SignUp';
import ModesPage from './pages/ModesPage';


function App() {
  useFirestoreConnect(['modes', 'controls']);

  return (
    <>
    <header>
      <NavbarPage/>
    </header>
    <main>
      <Switch>
        <Route exact path="/" component={SigninPage} />
        <ProtectedRoute
          path="/home"
        >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/modes"
        >
          <ModesPage />
        </ProtectedRoute>
        <Route path="/sign-in" component={SigninPage} />
        <Route path="/sign-up" component={SignupPage} /> 
      </Switch>
    </main>
    </>
  );
}

export default App;