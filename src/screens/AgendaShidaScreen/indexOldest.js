import './App.css';
import React, { useState } from 'react';
import 'rmwc/dist/styles'
import '@fortawesome/fontawesome-free/js/all.js';
import Contact from './Contact';
//import {MDCTextField} from '@material/textfield';
//import {MDCDialog} from '@material/dialog';
import { SessionContext } from '../../navigation';


export default function AgendaShidaScreen() {
  const context = React.useContext(SessionContext);

  const [contacts, getCntcts] = hookContacts();

  return (
      <>
        <header className="mdc-top-app-bar">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">
              <i className="fas fa-bars"></i>
            </button>
              <span className="mdc-top-app-bar__title">Agenda shida</span>
            </section>
          </div>
        </header>
        <div className="appbody">
          <ul className="mdc-list mdc-list--two-line">
            
            {/*

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

            */}
            <li className="mdc-list-item mdc-list-item--disabled">
                  <span className="mdc-list-item__ripple"></span>
                  <span className="mdc-list-item__text">No hay contactos.</span>
              </li>
          </ul>

          {/* <button onClick={this.open_modal} className="mdc-fab btnplus" aria-label="plus"> */}
          <button className="mdc-fab btnplus" aria-label="plus">
            <div className="mdc-fab__ripple"></div>
            <span className="mdc-fab__icon material-icons">
              <i className="fas fa-plus"></i>
            </span>
          </button>
        </div>

        {/* modal xd 
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
        </div>*/}
      </>
    )

}