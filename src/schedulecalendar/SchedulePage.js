import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import useDetalles from './hooks/useDetalles';
import useDate from './hooks/useDate';
import SessionContext from '../globals/SessionContext';
import useFetch from './hooks/useFetch';
import useEvento from './hooks/useEvento';
import usePostData from './hooks/usePostData';

import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function SchedulePage() {
    // context
    const sessionContext = useContext(SessionContext);
    const { id } = sessionContext.user;

    // hooks
    const [refresch, setRefresch] = useState(false);

    // custom hooks
    const [evento, handleChangeEvento] = useEvento();
    const [detalles, handleChangeDetalles] = useDetalles();
    const [date, handleChangeDate] = useDate();
    const [eventos, setDateToFetch] = useFetch(id, date, refresch, setRefresch);
    const [postData] = usePostData();

    // object destructuring
    const { day, month, year } = date;
    const { loading: isLoading, data } = eventos;

    // effects
    useEffect(() => {
        setDateToFetch(date);
    }, [date, setDateToFetch]);

    // handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            evento,
            detalles,
            date,
            userId: id,
        };

        postData(body, date);
        setRefresch(true);
    };

    return ( <
        div className = "container" > { /* una barra de navegacion que permita volver */ } <
        div className = "row" >
        <
        div className = "col-sm-4" >
        <
        Calendar onClickDay = {
            (e) => {
                handleChangeDate(e);
            }
        }
        /> <
        /div> <
        div className = "col-sm-8" >
        <
        h2 > Agregar nuevo evento: { `${day}-${month + 1}-${year}` } < /h2> <
        hr / >

        <
        form onSubmit = { handleSubmit } >
        <
        div className = "form-group" >
        <
        label htmlFor = "evento" > Evento < /label> <
        input type = "text"
        className = "form-control"
        id = "evento"
        onChange = { handleChangeEvento }
        /> <
        /div>

        <
        div className = "form-group" >
        <
        label htmlFor = "task" > Detalles < /label> <
        textarea className = "form-control"
        id = "task"
        rows = "10"
        onChange = { handleChangeDetalles } >
        < /textarea> <
        /div> <
        button type = "submit"
        className = "btn btn-primary" >
        Guardar <
        /button> <
        /form> <
        /div> <
        /div> <
        div className = "container-sm" >
        <
        h2 > Eventos agendados < /h2> <
        hr / > {
            isLoading && < p > cargando... < /p>} { /* aqui van los eventos creen un componente */ } <
            /div> <
            /div>
        );
    }