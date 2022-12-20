import { userState, useRef } from 'react'

import lang from './Lang.json'
import Image from 'next/image'
import styles from './CountrySearch.module.scss'

import searchLogo from '../../../public/searchLogo.svg'

export const CountrySearch = (props) => {
    const inputRef = useRef()
    const handleSearch = (event) => {
        event.preventDefault();
        const searchCountry = props.allCountries.filter(country => country.name.common.toUpperCase().includes(inputRef.current.value.trim().toUpperCase()));
        const numberDisplayCountries = !searchCountry || searchCountry.length === -1 ? 0 :
            ( searchCountry && searchCountry.length < props.viewMore ? searchCountry.length : props.viewMore - 1);
        
        props.setDisplayedCountries(numberDisplayCountries);
        props.setSortedCountries(searchCountry);
        
    }
    return (
        <div className={styles.search}>
            <input className={styles.input} ref={inputRef} type="text" ></input>
            <button className={styles.button} type="button" onClick={handleSearch}>
                <Image src={searchLogo} alt={lang.en.searchLogo}/>
            </button>
        </div>
    )
}