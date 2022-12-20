import {useState, useEffect} from "react";

import { CountryCard } from '../../Views/CountryCard'

import config from '../../Configs/config.json'

import styles from './CountriesPage.module.scss'

import lang from './Lang.json'

export const CountriesPage = () => {
    const viewMore = 5;
    const [countries, setCountries] = useState([]);
    const [countDisplayedCountries, setDisplayedCountries] = useState(viewMore);

    useEffect(() => {
        fetch(config.COUNTRIES_GET_ALL_URL)
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
            })
            .catch((err) => console.log('Error getting Countries', err.message));
    }, [])

    const viewMoreCountries = () => {
        setDisplayedCountries(countDisplayedCountries + viewMore);
    }

    return (

        <div className={styles.container}>
            <div className={styles.grid}>
            {
                countries.map((country, index) => {
                    return index <= countDisplayedCountries &&
                        <CountryCard
                            key={index}
                            countryName={country.name.common}
                            flag={country.flag}
                            imgSrc={country.flags.png}
                            callback={() => {location.href = '/teste'}} />
                    
                })
            }
            </div>
            {
                countDisplayedCountries <= countries.length && 
               <button onClick={viewMoreCountries}>{lang.en.buttonText}</button>
            }
        </div>
    )
}