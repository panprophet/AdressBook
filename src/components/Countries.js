import React from 'react';

class Countries extends React.Component {
    
    constructor(){
        super();
        
        this.state = {
            countries: [],
            ccode: ''
        }
        this.getCountryCode = this.getCountryCode.bind(this);
    }
    
    getCountryCode(event) {
//        this.setState({ccode: event.target.value});
        this.props.ccode(event.target.value);
    }  
    
    componentDidMount() {        
        fetch('http://localhost:3001/Countries')
            .then(results => results.json())
            .then(countries => this.setState({countries}))
    }
    
    render() {
        
        return(
            <div>
                <select className="countryCombo" id="countrylist" onChange={this.getCountryCode}>
                <option id='disabled'>Choose country</option>
                    { 
                        this.state.countries.map(country =>
                            <option key={country.id} value={country.country_code} selected={this.props.country == country.country_code}>{country.country_name}</option>
                        )
                    }
                </select>
               
            </div>
        );
    }
    
}

export default Countries;