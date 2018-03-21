import React from 'react';

class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            ccode: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        document.getElementById('disabled').disabled = true;
        this.setState({ccode: event.target.value});
    }
    componentWillMount() {

        fetch('http://192.168.99.15:3001/Countries')

            .then(results => 
                 results.json()
            )
            .then(items => 
                  this.setState({items})
            )
    }
    render() {
        let formName = "Add city to country:"
        return (
            <div>
            <form className="showMe" id="insertcityform" onSubmit={this.handleSubmit}>    
                <div className="countryTitle">{formName}</div>
                <div className='row inputRow select'>
                    <div className="textselect">Select country:</div>
                    <div className="selectbox">
                        <select className="countryCombo" id='countrylist' onChange={this.handleChange}>
                            <option id='disabled'>Choose county</option>
                            {
                            this.state.items.map(item => <option key={item.id} value={item.country_code}>{item.country_name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <InputFields ccode = {this.state.ccode}/>
            </form>
            </div>
        );
    }
}

class InputFields extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        const ccode = this.props.ccode;
        fetch('/Cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: '',  
            country_code: ccode,
            city_name: this.state.value
              
          })
        });
        alert('ccode: ' + ccode + ' name:' + this.state.value);
        document.getElementById('insertcityform').reset();
        document.getElementById('cityname').value = "";
    }
    
    render() {
        
        let sbmtBtn = '';
        if (this.state.value != '' && this.props.ccode != '') {
            sbmtBtn = <div className="button" id='new' onClick={this.handleSubmit}>Submit</div>;
        } else {
            sbmtBtn = <div className="button" id='updatefalse' onClick={this.handleSubmit}>Submit</div>;
        }
        
        return(
            <div>
				<div className='row inputRow'>
					<input className="textinput" id="cityname" placeholder="Enter city name" value={this.state.value} onChange={this.handleChange}></input>
				</div>
            	{sbmtBtn}
            </div>
        );
    }
}
export default Countries;