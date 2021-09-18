//Create home component
import React from "react";

//import components
import NavBar from './NavBar';
import Footer from './Footer';

const Home = () => {
    return(
        <div>
            <NavBar/>
            <h1>Heyyy</h1>
            <Footer/>
        </div>
    );
}

export default Home;