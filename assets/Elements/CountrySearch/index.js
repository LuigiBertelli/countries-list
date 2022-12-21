import { userState, useRef } from 'react'

import lang from './Lang.json'

import styles from './CountrySearch.module.scss'

// import {faMagnifyingGlassLocation} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faMagnifyingGlass } from '@fortawesome/fontawesome-free-solid'


import '@fortawesome/fontawesome-free/css/all.min.css';

export const CountrySearch = (props) => {
    const inputRef = useRef()

    const handleSearch = (event) => {
        event.preventDefault();
        const searchCountry = props.allCountries.filter(country => country.name.common.toUpperCase().includes(inputRef.current.value.trim().toUpperCase()));
        const numberDisplayCountries = !searchCountry || searchCountry.length === -1 ? 0 :
            ( searchCountry && searchCountry.length < props.viewMore ? searchCountry.length : props.viewMore);
        
        props.setDisplayedCountries(numberDisplayCountries);
        props.setSortedCountries(searchCountry);
        
    }
    return (
        <input 
            className={styles['search-input']} 
            onChange={handleSearch} 
            ref={inputRef} 
            type="text"
            placeholder={lang.en.searchPlaceHolder}></input>
    )
}