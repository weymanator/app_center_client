import { useState, useEffect } from 'react';

export default function useFetch(userId, initdate, refresh, setRefresh) {
  const [eventos, setEventos] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const [dateToFetch, setDateToFetch] = useState(initdate);

  useEffect(() => {
    function getData(date) {
      setEventos({
        loading: true,
        data: null,
        error: null,
      });
      const { day, month, year } = date;
      const fecha = `${year}-${month}-${day}`;

      fetch(`http://localhost:7000/api/eventos/?date=${fecha}`, {
        headers: { Authorization: userId },
      })
        .then((res) => res.json())
        .then((datares) => {
          console.log(datares)
          if (datares.err) {
            setEventos({
              loading: false,
              data: null,
              error: [datares],
            });
          }
          setEventos({
            loading: false,
            data: datares,
            error: null,
          });
        });
    }
    console.log('fetch data');
    getData(dateToFetch);
    setRefresh(false);
  }, [dateToFetch, userId, refresh, setRefresh]);

  return [eventos, setDateToFetch];
}
