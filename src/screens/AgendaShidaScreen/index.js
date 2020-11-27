import './App.css';
import React from 'react';
import 'rmwc/dist/styles'
import '@fortawesome/fontawesome-free/js/all.js';
import Contact from './Contact';
import {MDCTextField} from '@material/textfield';
import {MDCDialog} from '@material/dialog';

import SessionContext from '../../globals/SessionContext';

export default class AgendaShida extends React.Component {
  static contextType = SessionContext;
  
  constructor(props){
      super(props);
      this.state = {
        contactslist: []
        // favcontacts: []
      }
      this.modal_new = undefined;
      this.txtName = undefined;
      this.txtTel = undefined;

      this.inputName = undefined;
      this.inputTel = undefined;

      this.user = JSON.parse(localStorage.getItem('user'));

      this.open_modal = this.open_modal.bind(this);
      this.clear_inputs = this.clear_inputs.bind(this);
      this.new_contact = this.new_contact.bind(this);
  }
  
  getAvailableID(data){
    /*if(data.length === 0) return 1;
    return Math.max(...data.map(item => item.ID)) +1;*/
  }

  open_modal(){
    this.modal_new.open();
  }

  clear_inputs(){
    this.txtName.value = "";
    this.txtTel.value = "";
  }

  new_contact(){
    const newcontact = {
      id: this.getAvailableID(this.state.contactslist),
      name: this.inputName,
      phonenumber: this.inputTel
    }
    this.setState({
      contactslist: [...this.state.contactslist, newcontact]
    })
    this.clear_inputs();

    // TODO hacer fetch al server
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
              this.state.contactslist.map(contact => ([
                <Contact key={contact.id} contactName={contact.name} phoneNumber={contact.phonenumber}></Contact>
              ]))
            }
          </ul>
          <button onClick={this.open_modal} className="mdc-fab btnplus" aria-label="plus">
            <div className="mdc-fab__ripple"></div>
            <span className="mdc-fab__icon material-icons">
              <i className="fas fa-plus"></i>
            </span>
          </button>
        </div>

        {/* modal xd */}
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
                  <span className="mdc-floating-label" id="inputName" ref={this.inputName}>Nombre</span>
                  <input onChange={event => this.inputName = event.target.value} className="mdc-text-field__input" type="text" aria-labelledby="my-label-id"/>
                  <span className="mdc-line-ripple"></span>
                </label><br></br><br></br>
                <label className="mdc-text-field mdc-text-field--filled input_tel">
                  <span className="mdc-text-field__ripple"></span>
                  <span className="mdc-floating-label" id="inputTel" ref={this.inputTel}>Telefono</span>
                  <input onChange={event => this.inputTel = event.target.value} className="mdc-text-field__input" type="number" aria-labelledby="my-label-id"/>
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
      </>
    )
  }

  componentDidMount(){
    this.modal_new = new MDCDialog(document.querySelector('.modal_new'));
    this.txtName = new MDCTextField(document.querySelector('.input_name'));
    this.txtTel = new MDCTextField(document.querySelector('.input_tel'));

    // TODO hacer fetch al server para traer los contactos
    
    fetch('http://localhost:7000/getcontactoshido', {
        method: 'GET',
        headers: { Authorization: this.user.id }
    })
    .then(data => data.json())
    .then(data => {
      if (data.errmsg != null) {
          alert(data.errmsg);
          return;
      }
      this.setState({ contactslist: data });
      console.log(this.contactslist);
    })
    .catch(err => {
        alert("Algo salio mal");
    })

  }

}

