import React from 'react';
import Countries from './Countries.js';
import Cities from './Cities.js';

class InputAgencies extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            id: '',
            name: '',
            adress: '',
            city_id: '',
            phone: '',
            email: '',
            web: '',
            ccode: '',
			validate: true
        };
        
        this.handleAction = this.handleAction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCityId = this.getCityId.bind(this);
        this.getCountryCode = this.getCountryCode.bind(this);
        this.haveProps = this.haveProps.bind(this);
        this.updateAgency = this.updateAgency.bind(this);
    }
    
    handleAction(){
        this.props.newAction(0);
    }
    
    haveProps(){
        this.setState({
            id: this.props.oneAgency.map(agency=>agency.id),
            name: this.props.oneAgency.map(agency=>agency.name),
            adress: this.props.oneAgency.map(agency=>agency.adress),
            city_id: this.props.oneAgency.map(agency=>agency.city_id),
            phone: this.props.oneAgency.map(agency=>agency.phone),
            email: this.props.oneAgency.map(agency=>agency.email),
            web: this.props.oneAgency.map(agency=>agency.web),
            ccode: this.props.oneAgency.map(agency=>agency.country_code),
			validate: true
        });
    }
    
    handleChange(event) {
        if(event.target.id == 'name'){
			this.setState({name: event.target.value});
		} else if(event.target.id == 'adress') {
			this.setState({adress: event.target.value});
		} else if(event.target.id == 'phone') {
            this.setState({phone: event.target.value}); 
		} else if(event.target.id == 'email') {
			if(event.target.value != '' && event.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
          		this.setState({
					validate: true,
				  	email: event.target.value
		  		});
        	} else if(event.target.value == ''){
				this.setState({
					validate: true,
				  	email: event.target.value
		  		});
			} else {
        		this.setState({
					validate: false,
					email: event.target.value
				});
			}	
		} else if(event.target.id == 'web') {
            this.setState({web: event.target.value});
		}
    }
      
    handleSubmit(){

        if(typeof this.props.oneAgency !== 'undefined'  && this.props.oneAgency.length>0){
            this.updateAgency();
        } else {
            fetch('http://localhost:3001/Agencies', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: '',  
                name: this.state.name,
                adress: this.state.adress,
                city_id: this.state.city_id,
                phone: this.state.phone,
                email: this.state.email,
                web: this.state.web

              })
            });
        }
        
        this.handleAction();
        
//        alert('name: ' + this.state.name + '\n adress: ' + this.state.adress + '\n city_id: ' + this.state.city_id + '\n phone: ' + this.state.phone + '\n email: ' + this.state.email + '\n web: ' + this.state.web + '\n USPESNO UNESENI PODACI');
//        document.getElementById('agencies').reset();
    }
    
    updateAgency(){
        fetch('http://localhost:3001/Agencies/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                adress: this.state.adress,
                city_id: this.state.city_id,
                phone: this.state.phone,
                email: this.state.email,
                web: this.state.web
            })
        });
    }
    
    getCityId(cityId){
        this.setState({city_id: cityId});
    }
    
    getCountryCode(ccode){
        this.setState({ccode: ccode});
    }
    
    componentDidMount(){
        if(typeof this.props.oneAgency !== 'undefined'  && this.props.oneAgency.length>0){
            this.haveProps();
        }
    }
    
    render() {
        
        let sbmtBtn = '';
        let valid ='';
		valid = this.state.validate;

        if(this.state.city_id != '' && this.state.name != '' && this.state.adress != '' && this.state.phone != '') {
			if (valid === false){
				sbmtBtn = <div className="button mailError" id='updatefalse' >Invalid Email</div>;
			} else {
            	sbmtBtn = <div className="button" id='new' onClick={this.handleSubmit}>Submit</div>;
			}
        } else {
			sbmtBtn = <div className="button" id='updatefalse'>Submit</div>;
        }
        
        let countryCombo = '';
        if(typeof this.props.oneAgency !== 'undefined'  && this.props.oneAgency.length>0){
			countryCombo = <div className="row inputRow select">
					<div className="selectbox">
						<Countries ccode={this.getCountryCode} country={this.state.ccode} />
					</div>
					<div className="selectbox">
						<Cities cityId={this.getCityId} ccode={this.state.ccode} city={this.state.city_id} />
					</div>
                </div>;
        } else {
            countryCombo =<div className="row inputRow select">
					<div className="selectbox">
						<Countries ccode={this.getCountryCode} />
					</div>
					<div className="selectbox">
						<Cities cityId={this.getCityId} ccode={this.state.ccode}  />
					</div>
                </div>;
        }
		    
        return(
            <div>
            <div className="sectionTitle">Enter new agency</div>
            <form className="populateMe" id="agencyinput">
            <div className="innerform">
                {countryCombo}
            
            <div className="row inputRow"><span>
                    <input className="textinput" id='name' placeholder="Agency name" value={this.state.name} onChange={this.handleChange}/></span>
                    <span>
                        <input className="textinput" id='adress' placeholder="Adress" value={this.state.adress} onChange={this.handleChange}/>
                    </span>
                </div>
                <div className="row inputRow">
                    <span>
                        <input className="textinput" id='phone' placeholder="Phone no" value={this.state.phone} onChange={this.handleChange}/>
                    </span>
                    <span>
                        <input className="textinput" id='email' placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    </span>
                </div>
                <div className="row inputRow">
                    <input className="textinput" id='web' placeholder="Web adress" value={this.state.web} onChange={this.handleChange}/>
                </div>
            </div>    
            </form>
            <div className="buttonWrapper">
                {sbmtBtn}
                <div className="button" id='delete' onClick={this.handleAction}>Cancel</div>
            </div>
            </div>
        );
    }
}

export default InputAgencies;