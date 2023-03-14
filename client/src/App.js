import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';
import Header from './Header.js';
import Home from './pages/Home.js';
import Budget from './pages/Budget';
import ComingSoon from './pages/ComingSoon.js';

function App() {
  return(
    <Router>
      <Header />
      <Switch>
        <Route path="/budget">
          <Budget />
        </Route>
        <Route path="/plans">
          <ComingSoon />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
