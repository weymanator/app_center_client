export default function usePostData(token) {
    function postData(body, date) {
        const { day, month, year } = date;
        var fecha_hoy = new Date();
        var fechaForm = new Date(year, month, day);
        fecha_hoy.setHours(0, 0, 0, 0);

        if (fechaForm >= fecha_hoy) {
            fetch(`http://localhost:7000/api/evento/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(body),
                }).then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                });
        } else {
            alert("Fecha incorrecta");
        }

    }

    return [postData];

}