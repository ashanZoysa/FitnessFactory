import './App.css';
import CreateAccount from './components/CreateAccount';
import Header from './components/NavBar';
import Login from './components/Login';
//import Login from './components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import NavBar from './components/NavBar';
//import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path='/createAccountPage' component={CreateAccount}/>
          <Route path='/homePage' component={Header}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;



      