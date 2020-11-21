import React, { useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useTask from "./hooks/useTask";
import "bootstrap/dist/css/bootstrap.css";
import useDate from "./hooks/useDate";
import {SessionContext} from "../navigation/index";
import useFetch from "./hooks/useFetch";

export default function SchedulePage() {
    const sessionContext = useContext(SessionContext);

    const [task, handleChangeTask] = useTask();
    const [date, handleChangeDate] = useDate();
    const [eventos, getData] = useFetch(sessionContext.userId, date);

    const handleSubmit = (e) => {
        e.preventDefault();



    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <Calendar onClickDay={(e) => {
                        handleChangeDate(e);
                        getData()
                    }} 
                    />
                </div>
                <div className="col-sm-8">
                    <h2>Agregar nuevo evento: {date}</h2>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="task">Descripcion</label>
                            <textarea
                                className="form-control"
                                id="task"
                                rows="10"
                                onChange={handleChangeTask}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
            <h2>Eventos agendados</h2>
            <hr />
        </div>
    );
}
