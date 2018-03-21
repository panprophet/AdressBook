import React from 'react';

class ShowContacts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            phone: '',
            mail: '',
            sname: contact => contact.firstname.toLowerCase().includes(''),
            clickable: false,
            
        }
        this.handleAction =this.handleAction.bind(this);
        this.handleFilteredData = this.handleFilteredData.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleId = this.handleId.bind(this);
    }
    
    handleAction(event){
        if (event.target.id === 'new') {
            this.props.newAction(1);
        } else if(event.target.id === 'update') {
            this.props.newAction(2);
        }
    }
    
    handleFilteredData(event){ 
         if(event.target.id === 'searchfirst') {
                this.setState({firstname: event.target.value});
                this.setState({sname: contact => contact.firstname.toLowerCase().includes(this.state.firstname.toLowerCase())});
            } 
            else if(event.target.id === 'searchlast') {
                this.setState({lastname: event.target.value});
                this.setState({sname: contact => contact.lastname.toLowerCase().includes(this.state.lastname.toLowerCase())});
            }
            else if(event.target.id === 'searchphone') {
                this.setState({phone: event.target.value});
                this.setState({sname: contact => contact.phone1.includes(this.state.phone)});
            }
            else if(event.target.id === 'searchmail') {
                this.setState({mail: event.target.value});
                this.setState({sname: contact => contact.email.includes(this.state.mail)});
            }
    }
    
    deleteItem(){
        // Fali neki confirmation dialog

            fetch('http://localhost:3001/Contacts/' + this.state.id, {
                method: 'DELETE',
            })
            .then(response => response.json()
            )
            .then(json =>{return json})
            alert('You have deleted ' + this.props.contacts.filter(contact => contact.id == this.state.id).map(contact => contact.lastname));
//        } 
        
            this.props.deleteContact(this.state.id);
    }
    
    handleId(event){
        this.props.contactId(event.target.value);
        this.setState({id: event.target.value,
                      clickable: true
        });
    }
    
    render() {
        const contacts = this.props.contacts;
        let changebtn = '';
        let delbtn = '';
        if(this.state.clickable == false) {
            changebtn = <div className="button" id='updatefalse' >Change</div>;
            delbtn = <div className="button" id='updatefalse'>Delete</div>;
        } else {
            changebtn = <div className="button" id='update' onClick={this.handleAction}>Change</div>;
            delbtn = <div className="button" id='delete' onClick={this.deleteItem}>Delete</div>;
        }
            return (
                <div>
                <div className="sectionTitle">Contacts</div>
                <div className='searchBox'>
                    
                    <input className="textinput" type="text" id='searchfirst' onChange={this.handleFilteredData} value={this.state.firstname} placeholder='search by first name'/>
                    <input className="textinput" type="text" id='searchlast' onChange={this.handleFilteredData} value={this.state.lastname} placeholder='search by last name'/>
                    <input className="textinput" type="text" id='searchphone' onChange={this.handleFilteredData} value={this.state.phone} placeholder='search by phone'/>
                    <input className="textinput" type="text" id='searchmail' onChange={this.handleFilteredData} value={this.state.mail} placeholder='search by e-mail'/>
                </div>
                
                <div className="showMe">
                
                { 
                    contacts.filter(this.state.sname).map(contacts =>
                    <div class="row contact-row" >
                        <div className="sm-col-2 contactRadio">
                            <input type='radio' id='radiobutton' key={contacts.id} value={contacts.id} name='contactRadio'  onChange={this.handleId} />
                        </div>
                        <div class="sm-col-6 contactInfo">
                            <div class="sm-col-4"><span> Name: {contacts.firstname} </span><span>{contacts.lastname}</span></div> 
                            <div class="sm-col-4">Company: {contacts.agencyname}</div>
                            <div class="sm-col-4">Phone: {contacts.phone1}</div>
                            <div class="sm-col-4">Phone: {contacts.phone2}</div>
                            <div class="sm-col-4">E-mail: {contacts.email}</div>
                            <div class="sm-col-4">Web: {contacts.web}</div>
                        </div>
                        
                        <div class="sm-col-4 avatar">
                             <img src={contacts.avatar} alt='Avatar'/>
                        </div>
                        
                    </div>
                  ) 
                }
                </div>
                <div className="buttonWrapper">
                    <div className="button" id='new' onClick={this.handleAction}>Add new</div>
                    {changebtn}
                    {delbtn}
                </div>
                
                
            </div>
        );
     
    }
}

export default ShowContacts;