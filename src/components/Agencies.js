import React from 'react';

import ShowAgencies from './ShowAgencies';
import InputAgencies from './InputAgencies';

class Agencies extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            agencies: [],
            action: 0,
            oneAgency: [],
            agecnyId: ''
        }
        
        this.getAction = this.getAction.bind(this);
        this.getId = this.getId.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.getAgencies = this.getAgencies.bind(this);
    }
    
    getAction(newAction) {
        this.setState({action: newAction});
        setTimeout(() =>this.getAgencies(), 10);     
	}
    
    getId(agencyId) {
        this.setState({
            oneAgency: this.state.agencies.filter(agencies => agencies.id == agencyId).map(agencies => agencies)               
        });
    }
    
    deleteById(deleteAgency){
        let newAgencies = [...this.state.agencies];
        newAgencies = newAgencies.filter(agency => agency.id != deleteAgency);
        this.setState({agencies: newAgencies});
    }
    
    getAgencies() {
        fetch('http://192.168.99.15:3001/Agencies')
            .then(results => results.json())
            .then(agencies => this.setState({agencies}))    
    }
    
    componentDidMount() {
        this.getAgencies();
    }

    render() {
        let showA = '';
        if(this.state.action == 0) {
            showA = <ShowAgencies agencies={this.state.agencies} deleteAgency={this.deleteById} newAction={this.getAction} agencyId={this.getId} />;
        } else if(this.state.action == 1) {
            showA = <InputAgencies newAction={this.getAction} /> 
        } else if(this.state.action == 2) {
            showA = <InputAgencies oneAgency={this.state.oneAgency} newAction={this.getAction} /> 
        }
        
        return (
            <div>
                {showA}
            </div>
        );
    }
}

export default Agencies;