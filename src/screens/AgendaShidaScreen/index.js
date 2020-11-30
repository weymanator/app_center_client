import './App.css';
import React from 'react';
import 'rmwc/dist/styles'
import '@fortawesome/fontawesome-free/js/all.js';
import Contact from './Contact';
import {MDCDialog} from '@material/dialog';
import {MDCTextField} from '@material/textfield';

import SessionContext from '../../globals/SessionContext';

export default class AgendaShida extends React.Component {
  static contextType = SessionContext;
  
  constructor(props){
      super(props);
      this.state = {
        contactslist: []
      }
      // modales
      this.modal_new = undefined;
      this.modal_two = undefined;

      // valores de texto
      this.txtName = undefined;
      this.txtTel = undefined;
      this.txtEmail = undefined;
      this.txtName2 = undefined;
      this.txtTel2 = undefined;
      this.txtEmail2 = undefined;

      // componentes de Material (revisar componentDidMount)
      this.inputName = undefined;
      this.inputTel = undefined;
      this.inputEmail = undefined;
      this.inputName2 = undefined;
      this.inputTel2 = undefined;
      this.inputEmail2 = undefined;

      this.token = localStorage.getItem('token');

      // funciones
      this.open_modal = this.open_modal.bind(this);
      this.clear_inputs = this.clear_inputs.bind(this);
      this.new_contact = this.new_contact.bind(this);
      this.display_contact = this.display_contact.bind(this);
      this.delete_contact = this.delete_contact.bind(this);
      this.retrieve_contacts = this.retrieve_contacts.bind(this);
      this.update_contact = this.update_contact.bind(this);
  }
  
  getAvailableID(data){
    if(data.length === 0) return 1;
    return Math.max(...data.map(item => item.id)) +1;
  }

  open_modal(){
    this.modal_new.open();
  }

  clear_inputs(){
    this.txtName.value = "";
    this.txtTel.value = "";
    this.txtEmail.value = "";
    this.txtName2.value = "";
    this.txtTel2.value = "";
    this.txtEmail2.value = "";
    this.setState({current_id: -1});
  }

  new_contact(){
    const newcontact = {
      id: this.getAvailableID(this.state.contactslist),
      nombre: this.txtName.value,
      telefono: this.txtTel.value,
      email: this.txtEmail.value
    }
    fetch('http://localhost:7000/newcontactoshido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify(newcontact),
    })

    this.setState({
      contactslist: [...this.state.contactslist, newcontact]
    })
    this.clear_inputs();
  }

  display_contact(contact){
    const that = this;
    //console.log(contact);
    return function(){
      let index = that.state.contactslist.findIndex(item => item.id === contact.id);
      that.txtName2.value = that.state.contactslist[index].nombre;
      that.txtTel2.value = that.state.contactslist[index].telefono;
      that.txtEmail2.value = that.state.contactslist[index].email;
      that.setState({current_id: contact.id});
      that.modal_two.open();
    }
  }

  retrieve_contacts(){
    fetch('http://localhost:7000/getcontactoshido', {
        method: 'GET',
        //headers: { Authorization: this.user.id }
        headers: { Authorization: `Bearer ${this.token}` }
    })
    .then(data => data.json())
    .then(data => {
      if (data.errmsg != null) {
        if (data.code === 0) {
            this.context.signout();
            return;
        }
        throw Error(data.errmsg);
      }
      this.setState({ contactslist: data });
    })
    .catch(err => {
        alert("Algo salio mal");
    })
  }

  delete_contact(){
    const current = {
      id: this.state.current_id
    }
    fetch('http://localhost:7000/delcontactoshido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify(current),
    })
    //this.setState({contactslist: []});
    //this.retrieve_contacts();
    const index = this.state.contactslist.findIndex(item => item.id === current.id);
    const clone = this.state.contactslist;
    clone.splice(index,1);
    this.setState({contactslist: clone});
  }

  update_contact(){
    //console.log(this.state.current_id);
    let contact = {
      id: this.state.current_id,
      nombre: this.txtName2.value,
      telefono: this.txtTel2.value,
      email: this.txtEmail2.value
    }
    fetch('http://localhost:7000/updcontactoshido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify(contact),
    })
    let contacts = this.state.contactslist;
    const index = contacts.findIndex(item => item.id === contact.id);
    contacts[index].nombre = contact.nombre;
    contacts[index].telefono = contact.telefono;
    contacts[index].email = contact.email;
    this.clear_inputs();
  }

  render(){
    return (
      <>
        {/*<header className="mdc-top-app-bar">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">
              <i className="fas fa-bars"></i>
            </button>
              <span className="mdc-top-app-bar__title">Agenda shida</span>
            </section>
          </div>
        </header>*/}
        <div className="appbody">
          <ul className="mdc-list mdc-list--two-line">
            {
              this.state.contactslist.length === 0 && (
                <li className="mdc-list-item mdc-list-item--disabled">
                  <span className="mdc-list-item__ripple"></span>
                  <span className="mdc-list-item__text">No hay contactos.</span>
              </li>
              )
            }
            {
              this.state.contactslist.map(contact => (
                <Contact onClick={this.display_contact(contact)} key={contact.id} contactName={contact.nombre} phoneNumber={contact.telefono} email={contact.email}></Contact>
              ))
              
            }
          </ul>
          <button onClick={this.open_modal} className="mdc-fab btnplus" aria-label="plus">
            <div className="mdc-fab__ripple"></div>
            <span className="mdc-fab__icon material-icons">
              <i className="fas fa-plus"></i>
            </span>
          </button>
        </div>

        {/* ---------------- modal new ---------------- */}
        <div className="mdc-dialog modal_new">
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="my-dialog-title"
              aria-describedby="my-dialog-content">
              <h2 className="mdc-dialog__title" id="my-dialog-title">
              Nuevo contacto
              </h2>
              <div className="mdc-dialog__content" id="my-dialog-content">
                <label className="mdc-text-field mdc-text-field--filled input_name">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputName">Nombre</span>
                  <input onChange={event => this.inputName = event.target.value} className="mdc-text-field__input" type="text" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label><br></br><br></br>
                <label className="mdc-text-field mdc-text-field--filled input_tel">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputTel">Telefono</span>
                  <input onChange={event => this.inputTel = event.target.value} className="mdc-text-field__input" type="number" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label><br></br><br></br>
                <label className="mdc-text-field mdc-text-field--filled input_email">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputEmail">Email</span>
                  <input onChange={event => this.inputEmail = event.target.value} className="mdc-text-field__input" type="email" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label>
              </div>
              <div className="mdc-dialog__actions">
                <button onClick={this.clear_inputs} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">Cancel</span>
                </button>
                <button onClick={this.new_contact} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">OK</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mdc-dialog__scrim"></div>
        </div>
      {/* ---------------- modal edit ------------------- */}
        <div className="mdc-dialog modal_two">
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="my-dialog-title"
              aria-describedby="my-dialog-content">
              <h2 className="mdc-dialog__title" id="my-dialog-title">
              Contacto
              </h2>
              <div className="mdc-dialog__content" id="my-dialog-content">
                <label className="mdc-text-field mdc-text-field--filled input_name2">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputName">Nombre</span>
                  <input onChange={event => this.inputName2 = event.target.value} className="mdc-text-field__input" type="text" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label><br></br><br></br>
                <label className="mdc-text-field mdc-text-field--filled input_tel2">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputTel">Telefono</span>
                  <input onChange={event => this.inputTel2 = event.target.value} className="mdc-text-field__input" type="number" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label><br></br><br></br>
                <label className="mdc-text-field mdc-text-field--filled input_email2">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputEmail2">Email</span>
                  <input onChange={event => this.inputEmail2 = event.target.value} className="mdc-text-field__input" type="email" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label>
              </div>
              <div className="mdc-dialog__actions">
                <button onClick={this.update_contact} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">Save</span>
                </button>

                <button onClick={this.delete_contact} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">Delete</span>
                </button>

                <button onClick={this.clear_inputs} type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">
                  <div className="mdc-button__ripple"></div>
                  <span className="mdc-button__label">Cancel</span>
                </button>
      
              </div>
            </div>
          </div>
          <div className="mdc-dialog__scrim"></div>
        </div>
      </>
    )
  }

  componentDidMount(){
    this.modal_new = new MDCDialog(document.querySelector('.modal_new'));
    this.modal_two = new MDCDialog(document.querySelector('.modal_two'));

    this.txtName = new MDCTextField(document.querySelector('.input_name'));
    this.txtTel = new MDCTextField(document.querySelector('.input_tel'));
    this.txtEmail = new MDCTextField(document.querySelector('.input_email'));
    this.txtName2 = new MDCTextField(document.querySelector('.input_name2'));
    this.txtTel2 = new MDCTextField(document.querySelector('.input_tel2'));
    this.txtEmail2 = new MDCTextField(document.querySelector('.input_email2'));

    this.retrieve_contacts();

  }

}

