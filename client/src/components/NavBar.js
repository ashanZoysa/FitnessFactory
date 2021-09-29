import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#e3f2fd'}}>
            <div className="container-fluid">
                {/* <a class="navbar-brand">CRUD App using MERN stack
                </a> */}

            <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse-navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/"><h5>Gym Events</h5></a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/trackerHome"><h5>&nbsp;&nbsp;&nbsp;Tracker</h5></a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/eventHome"><h5>&nbsp;&nbsp;&nbsp;Summary</h5></a>
                    </li>

                </ul>
            </div>
        </div>
        </nav>
        )   
    }
}
