import React from 'react';

class ShowAgencies extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            id: '',
            clickable: false,
        };
        
        this.handleAction = this.handleAction.bind(this);
        this.handleId = this.handleId.bind(this);
//        this.handleChange = this.handleChange.bind(this);
        this.deleteAgency = this.deleteAgency.bind(this);
    }
    
    handleAction(event){
        if(event.target.id == 'new') {
            this.props.newAction(1);
        } else if(event.target.id == 'update') {
            this.props.newAction(2);
        }
    }
    
    handleId(event){
        this.props.agencyId(event.target.value);
        this.setState({id: event.target.value,
                      clickable: true
                      });
    }
    
    deleteAgency() {
    // Fali neki confirmation dialog
        fetch('http://localhost:3001/Agencies/' + this.state.id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json =>{return json})
        
        this.props.deleteAgency(this.state.id);
    }
    
    render() {
        
        const agencies = this.props.agencies;
        let changebtn = '';
        let delbtn = '';
        if (this.state.clickable == false) {
            changebtn = <div className="button" id='updatefalse'>Change</div>;
            delbtn = <div className="button" id='updatefalse'>Delete</div>;
        } else {
            changebtn = <div className="button" id='update' onClick={this.handleAction}>Change</div>;
            delbtn = <div className="button" id='delete' onClick={this.deleteAgency}>Delete</div>;
        }
        
        return(
            <div>
            <div className="sectionTitle">Agencies:</div>
            <div className="showMe" id="agencies">
            
            {
                agencies.map(agency =>
                <div className="row contact-row" key={agency.id}>
                        <div className="sm-col-2 contactRadio">
                            <input type="radio" id={agency.id} value={agency.id} name='agencyradio' onChange={this.handleId}/>
                        </div>
                        <div className="contactInfo">
                            <div>
                                <div>Agency name: {agency.name}</div>
                                <div>Adress: {agency.adress}</div>
                                <div>City, Country: {agency.cityname}, {agency.countryname}</div>
                            </div>

                            <div>
                                <div>Contact phone: {agency.phone}</div>
                                <div>E-mail: <a href={"mailto:" + agency.email}>{agency.email}</a></div>
                                <div>Web: <a href={agency.web}>{agency.web}</a></div>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
                <div className='buttonWrapper'>
                    <div className="button" id='new' onClick={this.handleAction}>Add new</div>
                    {changebtn}
                    {delbtn}
                </div>
        </div>    
        );
    }
    
}

export default ShowAgencies;