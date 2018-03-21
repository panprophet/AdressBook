import React from 'react';

class Cities extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            cities: [],
//            city_id: ''
        };
        this.getCityId = this.getCityId.bind(this);
    }
    
    getCityId(event) {
//        this.setState({ccode: ccode});
        this.props.cityId(event.target.value);
    }
    
    componentDidMount() {
        fetch('http://localhost:3001/Cities')
            .then(results => results.json())
            .then(cities => this.setState({cities}))
    }
    
    render() {
        let ccode = this.props.ccode;
        return (
            <select onChange={this.getCityId}>
            <option id='disabled'>Choose city</option>
            {
                this.state.cities.filter(city => city.country_code == ccode).map(city =>
                    <option key={city.id} value={city.id} selected={this.props.city == city.id}>{city.city_name}</option>
                )
            }
            </select>
        );
    }
}

export default Cities;