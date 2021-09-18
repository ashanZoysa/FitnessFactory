import './App.css';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import Login from './components/Login';
import ManageUsers from './components/ManageUsers';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path='/createAccountPage' component={CreateAccount}/>
          <Route path='/homePage' component={Home}/>
          <Route path='/manageUsers' component={ManageUsers}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;



      