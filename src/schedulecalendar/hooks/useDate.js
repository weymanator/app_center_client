import React, { useState } from "react";

function getActual() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${year}-${month}-${day}` 
}

export default function useDate() {
    const [date, setDate] = useState(getActual());

    function handleChangeDate(e) {
        let day = e.getDate();
        let month = e.getMonth();
        let year = e.getFullYear();

        setDate(`${year}-${month}-${day}`);
    }

    getActual()

    return [date, handleChangeDate];
}
