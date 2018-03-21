import React from 'react';
const fs = require('fs');

class InputContacts extends React.Component {

    constructor(props) {
        super(props);
        
//         else {
            this.state = {
                id: '',
                first_name: '',
                last_name: '',
                agency_id: '',
                phone1: '',
                phone2: '',
                email: '',
                web: '',
                avatar: '',
                file: '',
                agencies: [],
                imgPreviewUrl: '',
				validate: true
            }    
//        }
        
        this.handleAction = this.handleAction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.haveProps = this.haveProps.bind(this);
    }
    
    haveProps() {
            this.setState ({
                id: this.props.oneContact.map(contact => contact.id),
                first_name: this.props.oneContact.map(contact => contact.firstname),
                last_name: this.props.oneContact.map(contact => contact.lastname),
                agency_id: this.props.oneContact.map(contact => contact.agencyid),
                phone1: this.props.oneContact.map(contact => contact.phone1),
                phone2: this.props.oneContact.map(contact => contact.phone2),
                email: this.props.oneContact.map(contact => contact.email),
                web: this.props.oneContact.map(contact => contact.web),
//                avatar: "require(" + this.props.oneContact.map(contact => contact.avatar) + ")",
                avatar: this.props.oneContact.map(contact => contact.avatar),
//                agencies: [],
            });
        
    }
    
    handleAction(){
        this.props.newAction(0);
    }
    
    handleChange(event) {
        
        if(event.target.id === 'agencyselect') {
            document.getElementById('disabled').disabled = true;
            this.setState({agency_id: event.target.value});
        } else if(event.target.id === 'firstname') {
            this.setState({first_name: event.target.value});      
        } else if(event.target.id === 'lastname') {
            this.setState({last_name: event.target.value});  
        } else if(event.target.id === 'phone1') {
            this.setState({phone1: event.target.value});       
        }  else if(event.target.id === 'phone2') {
            this.setState({phone2: event.target.value});
        } else if(event.target.id === 'email') {
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
        }  else if(event.target.id === 'web') {
            this.setState({web: event.target.value});
        } else if(event.target.id === 'filebrowse'){
            event.preventDefault();
            let reader = new FileReader();
            let fileL = event.target.files[0];
            
            var fullPath = event.target.value;

            if(fullPath) {
                var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                var filename = fullPath.substring(startIndex);
                 
                if(filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                    filename = filename.substring(1);
                }

            }
            
            reader.onloadend = () => {
                this.setState({
                    file: fileL,
                    imgPreviewUrl: reader.result,
                    avatar: "/images/" + filename + ""
                });
            }
            reader.readAsDataURL(fileL);
    
        }
        
    }    
    
    handleSubmit(event) {
        
        if (typeof this.props.oneContact !== 'undefined' && this.props.oneContact.length>0){
           fetch('http://localhost:3001/Contacts/' + this.state.id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: '',
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                agency_id: this.state.agency_id,
                phone1: this.state.phone1,
                phone2: this.state.phone2,
                email: this.state.email,
                web: this.state.web,
                avatar: this.state.avatar
              })

            }); 
            
        } else {
        
            fetch('http://localhost:3001/Contacts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: '',
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                agency_id: this.state.agency_id,
                phone1: this.state.phone1,
                phone2: this.state.phone2,
                email: this.state.email,
                web: this.state.web,
                avatar: this.state.avatar
              })

            });
            
            alert('firstname:' + this.state.first_name + '\nlastname:' + this.state.last_name+ '\n agency: ' + this.state.agency_id + '\n phone1: ' + this.state.phone1 + '\n phone2: ' + this.state.phone2 + '\n email:' + this.state.email + '\n web:' + this.state.web + '\n pic directory: ' + this.state.avatar);
        }
        //ukoliko je avatar promenjen

        if(this.state.file !== '') {

            var data = new FormData();
            var imgdata = this.state.file;
            data.append('avatar', imgdata);
//express deprecated res.sendfile: Use res.sendFile instead routes\Upload.js:21:9
//sto ce ga reci, ovde a upisi u react app public/images
            fetch('http://localhost:3001/Upload', {
                method: 'POST',
                body: data
            });
        }

        this.handleAction();    
    }
    
    componentDidMount() {
        
        if (typeof this.props.oneContact !== 'undefined' && this.props.oneContact.length>0){
            this.haveProps();
        }
        
        fetch("http://localhost:3001/Agencies")
            .then(results => results.json())
            .then(agencies => this.setState({agencies}))
    }
    
    render() {
		let imgPrevUrl = this.state;
        let imgPrev = '';  
        
		if (typeof this.props.oneContact !== 'undefined' && this.props.oneContact.length>0){
            imgPrev = (<img src={this.state.avatar}/>);
        } else if(imgPrevUrl !== ''){   
            imgPrev = (<img src={this.state.imgPreviewUrl}/>);
        } else {
            imgPrev = <div onClick={this.handleClick}>Click browse to upload image</div>       
        }
        
        let sbmtBtn = '';
       	let valid ='';
		valid = this.state.validate;
		 
	   	if(this.state.first_name != '' && this.state.last_name != '' && this.state.agency_id != ''){
			if (valid === false){
				sbmtBtn = <div className="button mailError" id='updatefalse' >Invalid Email</div>;
			} else {
            	sbmtBtn = <div className="button" id='new' onClick={this.handleSubmit}>Submit</div>;
			}
        } else {
            sbmtBtn = <div className="button" id='updatefalse'>Submit</div>;
        }              
        
        let mailError = '';
                
        return(

                <div>
                <div className="sectionTitle">Enter new contact</div>
                <form className="populateMe" id="agencyinput" enctype="multipart/form-data">
                <div className="innerform">   
                        <div className='row inputRow'>
                            <span><input className='textinput' id='firstname' value={this.state.first_name} placeholder='first name (required)' onChange={this.handleChange}/>
                            </span><span><input className='textinput' id='lastname' value={this.state.last_name} placeholder='last name (required)' onChange={this.handleChange}/></span>
                        </div>
                        <div className="row inputRow select">
                            <div className="textselect">From agency: </div> 
                            <div className="agencyselect"><select id='agencyselect' onChange={this.handleChange}>
                                <option id='disabled'>Choose agency</option>
                                {
                                    this.state.agencies.map(agency => <option key={agency.id} value={agency.id} selected={this.state.agency_id == agency.id} >{agency.name}</option>)
                                }
                            </select> (required)
                            </div>
                        </div>

                        <div className="row inputRow">
                            <span><input className='textinput' id='phone1' value={this.state.phone1} placeholder='phone no' onChange={this.handleChange}/></span>
                            <span><input className='textinput' id='phone2' value={this.state.phone2} placeholder='phone no' onChange={this.handleChange}/></span>
                        </div>

                        <div className='row inputRow'>
                            <span><input className='textinput' id='email' value={this.state.email} placeholder='email' onChange={this.handleChange} /></span>
                            <span><input className='textinput' id='web' value={this.state.web} placeholder='web adress' onChange={this.handleChange}/></span>
                        </div>
                        <div className='row inputRow'>
                            <div className='picinput' >
                                {imgPrev}
                            </div>

                           <div className='picbutton'>
                                <input type="file" id="filebrowse" name="avatar" onChange={this.handleChange}/>
                           </div>
                        </div>
                </div>
                </form>
            
                <div className="buttonWrapper">
                    {sbmtBtn}
                    <div className="button" id='delete' onClick={this.handleAction}>Cancel</div>
                    <div>{mailError}</div>
                </div>
                </div>

            );
    }
}

export default InputContacts;