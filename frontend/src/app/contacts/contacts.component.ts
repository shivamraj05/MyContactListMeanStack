import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service'
import {Contact} from '../contact';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  firstName:string;
  lastName:string;
  phone:string;

  constructor(private contactService: ContactService) { }

  addContact(){
    let newContact = {
      firstName : this.firstName,
      lastName : this.lastName,
      phone : this.phone
    }
    
    this.firstName = '';
    this.lastName = '';
    this.phone = '';

    this.contactService.addContact(newContact)
      .subscribe( contact => { //add the contact if successfully added into DB
          this.contacts.push(contact);
          this.contactService.getContacts()
            .subscribe(contacts=>
                this.contacts=contacts);  
      });
  }


  deleteContact(id){
    this.contactService.deleteContact(id)
      .subscribe( data => { //deleting the contact from local variable, so update would be instant
        if(data.n==1){
          for(let i=0; i<this.contacts.length;i++){
            if(this.contacts[i]._id == id){
              this.contacts.splice(i, 1);
              break;
            }
          }
        }
      });
  }
  ngOnInit() {

    this.contactService.getContacts()
      .subscribe(contacts=>
        this.contacts=contacts);
  }

}
