import React, {Component} from 'react';

export default class NavBar extends Component{

    render(){

        return(
          
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="/" style={{color:"#00ffff"}}>Gym Management</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="/">Payments</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/expenses">Expenses</a>
                  </li>
                 
                </ul>
              </div>
            </div>
          </nav>
          
    

        )
    }
}