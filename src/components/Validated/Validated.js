import React, {useEffect, useState} from 'react';
import styles from "./Validated.module.css";
import axios from 'axios';

const Validated = (props) => {
    
    const [airport, setAirport] = useState('');
    const [city, setCity] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
            
        const URL = `https://cors.bridged.cc/https://api.aviationapi.com/v1/airports?apt=${props.value};`

        axios.get(URL)  
        //SERVER ONLY RETURNS response: ok and status: 200
        .then(data => {
            setAirport(data.data[props.value][0].facility_name);
            setCity(data.data[props.value][0].city);
            setIsFetching(true);
        })
        .catch(err => {
            setError(err.toString());
            setIsFetching(true);
        })
    }, [props.value]);

    if (!isFetching) {
        return <span className={styles.formTyping}>✏️ {props.value} - Checking...</span>
    } else if (error.includes('TypeError')) {
        return <span className={styles.formInvalid}>❌ {props.value.toUpperCase()} does not match any US ICAO airport code.</span>
    } else if (error.includes('Network Error')) {
        return <span className={styles.formInvalid}>❌ Unable to validate - {error}</span>
    } else {
        return (
            <span className={styles.formValid}>✔️ {airport} - {city}</span>
        );
    }

}

export default Validated;