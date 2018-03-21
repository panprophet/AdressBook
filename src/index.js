import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Link
} from 'react-router-dom';

import Contacts from './components/Contacts.js';
import Agencies from './components/Agencies.js';
import CitiesInput from './components/CitiesInput.js';

import './css/index.css';

class App extends React.Component {

    render() {
        return (
            <Router>
            <div>
                <div className='menu'>
					<div className='inner'>
						<div><Link to='/'>Contacts</Link></div>
						<div><Link to='/Agencies'>Agenices</Link></div>
						<div><Link to='/CitiesInput'>Add city</Link></div>
					</div>
                </div>
            
                <div className="page">
                    <Route exact path='/' component={Contacts}/>
                    <Route path='/Agencies' component={Agencies}/>
                    <Route path='/CitiesInput' component={CitiesInput}/>
                </div>
            </div>
            </Router>
        );
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);