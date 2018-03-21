import React from 'react';
import ShowContacts from './ShowContacts.js'
import InputContacts from './InputContacts.js'

class Contacts extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            contacts: [],
            action: 0,
            id: '',
            oneContact: []
        }
        this.getAction = this.getAction.bind(this);
        this.getId = this.getId.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.getContacts = this.getContacts.bind(this);
    }
    
    getAction(newAction) {
        this.setState({action: newAction});
        setTimeout(() => this.getContacts(), 50);
    }
    
    deleteById(deleteContact){
        let index = this.state.contacts.findIndex(x => x.id == deleteContact);
        let newContacts = [...this.state.contacts];
        newContacts = newContacts.filter(contact => contact.id != deleteContact);
        this.setState({contacts: newContacts});
        console.log(newContacts);
    }
    
    getId(contactId) {
        this.setState({
            oneContact: this.state.contacts.filter(contacts => contacts.id == contactId).map(contacts => contacts)               
                      });
    }
	
    async getContacts(){  
        let response = await fetch('http://192.168.99.15:3001/Contacts')
        let contacts = await response.json();
        this.setState({contacts})
    }
	
    componentDidMount() {
        this.getContacts();
    }
    
    render() {
        
        let cntcts = '';
        if (this.state.action == 0) {
            // prikazi sve kontakte
            cntcts = <ShowContacts contacts={this.state.contacts} newAction={this.getAction} deleteContact={this.deleteById} contactId={this.getId} />;
        } else if (this.state.action == 1){
            // prikazi input formu praznu
            cntcts = <InputContacts newAction={this.getAction} /> ;
        } else if (this.state.action == 2){
            //prikazi inout formu popunjenu
            cntcts = <InputContacts oneContact={this.state.oneContact} newAction={this.getAction} /> ;
        }
        
        return (
            <div>    
                {cntcts}
            </div>    
        );
    }
}

export default Contacts;