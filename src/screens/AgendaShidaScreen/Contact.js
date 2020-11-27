function Contact(props) {
    return (
        <li className="mdc-list-item">
            <span className="mdc-list-item__ripple"></span>
            <span className="mdc-list-item__text">
                <span className="mdc-list-item__primary-text">{props.contactName}</span>
                <span className="mdc-list-item__secondary-text">Telefono: {props.phoneNumber}</span>
            </span>
        </li>
    );
}

export default Contact;