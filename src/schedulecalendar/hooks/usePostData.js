export default function usePostData() {
    function postData(body, date) {
        const { day, month, year } = date;
        const fecha = `${year}-${month}-${day}`;
        var fecha_hoy = new Date();
        var fechaForm = new Date(year, month, day);
        fecha_hoy.setHours(0, 0, 0, 0);
        console.log(date);

        alert(fecha);

        if (fechaForm >= fecha_hoy) {
            console.log("Fecha correcta");
            alert("Fecha correcta");
            fetch(`http://localhost:7000/api/evento/`, {
                    method: 'POST',
                    headers: {
                        Authorization: body.userId,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }).then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                });
        } else {
            console.log(fechaForm);
            console.log(" es una fecha incorrecta");
            alert("Fecha incorrecta");
        }

    }

    return [postData];

}