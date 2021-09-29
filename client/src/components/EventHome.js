import React, { Component } from 'react';
import summary1 from '../summary1.jpg';
import summary2 from '../summary2.jpg';
import summary3 from '../summary3.jpg';
import summary4 from '../summary4.jpg';
import summary5 from '../summary5.jpg';

class EventHome extends Component {

    render() {
        <br/>
        return (
            
            <div className="card" style={{ height: '100px', width: '900px' }}><br/>
                <br/><img src={summary1} style={{ height: '300px', width: '900px' }} /><br/>
                <div className="card-body">
                    <h2 className="card-title">Yoga Event</h2><br />
                    <p className="card-text"><h6>Specially designed for senior citizens.</h6></p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h6>Event ID : 1</h6></li>
                    <li className="list-group-item"><h6>10 sessions of 30 minutes each</h6></li>
                    <li className="list-group-item"><h6>150 calories burnt per session</h6></li>
                </ul>
                <div className="card-body">
                    <a href="https://www.youtube.com/watch?v=vbgxIwQoyN4" className="card-link">Warm Up</a>
                    <a href="https://www.youtube.com/watch?v=GLy2rYHwUqY" className="card-link">Conditioning</a>
                    <a href="https://www.youtube.com/watch?v=CY6QP4ofwx4" className="card-link">Cool Down</a>
                </div>

                <br /><br />
                <img src={summary2} style={{ height: '300px', width: '900px' }} /><br />
                <div className="card-body">
                    <h2 className="card-title">Zumba Event</h2><br />
                    <p className="card-text"><h6>Specially designed for women.</h6></p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h6>Event ID : 2</h6></li>
                    <li className="list-group-item"><h6>15 sessions of 45 minutes each</h6></li>
                    <li className="list-group-item"><h6>300 calories burnt per session</h6></li>
                </ul>
                <div className="card-body">
                    <a href="https://www.youtube.com/watch?v=N1zTPfkM7f8" className="card-link">Warm Up</a>
                    <a href="https://www.youtube.com/watch?v=vG_Bs0QLc3I" className="card-link">Conditioning</a>
                    <a href="https://www.youtube.com/watch?v=QQVwuTQ8rwo" className="card-link">Cool Down</a>
                </div>

                <br /><br />
                <img src={summary3} style={{ height: '300px', width: '900px' }} /><br />
                <div className="card-body">
                    <h2 className="card-title">Aerobics</h2><br />
                    <p className="card-text"><h6>Specially designed for teens.</h6></p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h6>Event ID : 6</h6></li>
                    <li className="list-group-item"><h6>10 sessions of 45 minutes each</h6></li>
                    <li className="list-group-item"><h6>200 calories burnt per session</h6></li>
                </ul>
                <div className="card-body">
                    <a href="https://www.youtube.com/watch?v=a44ayeoSfKM" className="card-link">Warm Up</a>
                    <a href="https://www.youtube.com/watch?v=sSkJZNY1D3Q" className="card-link">Conditioning</a>
                    <a href="https://www.youtube.com/watch?v=W-sKDMG3hko" className="card-link">Cool Down</a>
                </div>

                <br /><br />
                <img src={summary4} style={{ height: '300px', width: '900px' }} /><br />
                <div className="card-body">
                    <h2 className="card-title">Cardio Event</h2><br />
                    <p className="card-text"><h6>Specially designed for beginners.</h6></p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h6>Event ID : 7</h6></li>
                    <li className="list-group-item"><h6>15 sessions of 30 minutes each</h6></li>
                    <li className="list-group-item"><h6>150 calories burnt per session</h6></li>
                </ul>
                <div className="card-body">
                    <a href="https://www.youtube.com/watch?v=7HuB5lHlhpA" className="card-link">Warm Up</a>
                    <a href="https://www.youtube.com/watch?v=141jmEQznK0" className="card-link">Conditioning</a>
                    <a href="https://www.youtube.com/watch?v=W5IiasNutB8" className="card-link">Cool Down</a>
                </div>

                <br /><br />
                <img src={summary5} style={{ height: '300px', width: '900px' }} /><br />
                <div className="card-body">
                    <h2 className="card-title">CrossFit Event</h2><br />
                    <p className="card-text"><h6>Specially designed for professionals.</h6></p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h6>Event ID : 8</h6></li>
                    <li className="list-group-item"><h6>20 sessions of 60 minutes each</h6></li>
                    <li className="list-group-item"><h6>400 calories burnt per session</h6></li>
                </ul>
                <div className="card-body">
                    <a href="https://www.youtube.com/watch?v=0t0EjTVQ-f4" className="card-link">Warm Up</a>
                    <a href="https://www.youtube.com/watch?v=IBuwNheltdI" className="card-link">Conditioning</a>
                    <a href="https://www.youtube.com/watch?v=DOtr16U8V2M" className="card-link">Cool Down</a>
                </div>

            </div>
        );

    }
}

export default EventHome;
