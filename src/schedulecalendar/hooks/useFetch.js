
import React, {useState} from 'react'

export default function useFetch(userId, date) {
    const [eventos, setEventos] = useState({loading: true, data: null})

    function getData() {
        console.log('se lanzo un fetch')
    }

    return [eventos, getData];
}
