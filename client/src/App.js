import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PostDetails from './components/PostDetails';
import TrackerHome from './components/TrackerHome';
import CreateTracker from './components/CreateTracker';
import EditTracker from './components/EditTracker';
import ProgressDetails from './components/ProgressDetails';
import EventHome from './components/EventHome';


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <NavBar/>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/add" component={CreatePost}></Route>
                    <Route path="/edit/:id" component={EditPost}></Route>
                    <Route path="/post/:id" component={PostDetails}></Route>
                    <Route path="/trackerHome" exact component={TrackerHome}></Route>
                    <Route path="/addTracker" component={CreateTracker}></Route>
                    <Route path="/editTracker/:id" component={EditTracker}></Route>
                    <Route path="/tracker/:id" component={ProgressDetails}></Route>
                    <Route path="/eventHome" exact component={EventHome}></Route>
                    

                </div>
            </BrowserRouter>
            
        )
    }
}
