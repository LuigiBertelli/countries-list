import { useState, useRef, useEffect } from 'react'

import { CountriesTable } from '../assets/Components/CountriesTable'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'

import constants from '../assets/Constants/Constants.json'

import config from '../assets/Configs/config.json'

import {options} from '../assets/Constants/Sort'

import styles from '../styles/Home.module.scss'

import lang from '../languages'

export default function Home() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = (event) => {
    event.preventDefault();
    const actualTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(actualTheme);
  }

  const viewMore = 6;
    const [allCountries, setAllCountries] = useState([]);
    const [sortedCountries, setSortedCountries] = useState([]);
    const [countDisplayedCountries, setCountDisplayedCountries] = useState(viewMore);
    const [selectedContinents, setSelectedContinents] = useState([]);
    const searchRef = useRef();
    const sortRef = useRef();

    useEffect(() => {
        fetch(config.COUNTRIES_GET_ALL_URL)
            .then((res) => res.json())
            .then((data) => {
                setAllCountries(data);
            })
            .catch((err) => console.log('Error getting Countries', err.message));
        }, [])

    useEffect(() => handleSort(), [allCountries])

    useEffect(() => handleFilter(), [selectedContinents]);

    const handleFilter = () => {

        let searchCountry = allCountries.filter(country => country.name.common.toUpperCase().includes(searchRef.current.value.trim().toUpperCase()));
        if(searchCountry && selectedContinents.length > 0) {
            searchCountry =  searchCountry.filter(country => selectedContinents.find(continent => country.continents.find(el => el === continent)));
        }

        const numberDisplayCountries = !searchCountry || searchCountry.length === -1 ? 0 :
                ( searchCountry && searchCountry.length < viewMore ? searchCountry.length : viewMore);

        setCountDisplayedCountries(numberDisplayCountries);
        setSortedCountries(searchCountry);
        
        
    }

    
    const handleSort = () => {
        const sortSelected = sortRef.current.value;
        const sortOrder = options.find(el => el.value == sortSelected);
        setAllCountries(allCountries.sort(sortOrder.sortFunc));
        handleFilter();
    } 

  return (
    <>
      <div className={ `${styles.main} ${styles[`${theme}`]}`}>
        
      
        <div className={styles.search}>
            <input 
                className={styles['search-input']} 
                onChange={handleFilter} 
                ref={searchRef} 
                type="text"
                placeholder={lang.en.searchPlaceHolder}>

              </input>
              <buttton type="button" onClick={toggleTheme}>
                <FontAwesomeIcon icon={faCircleHalfStroke}/>
              </buttton>
        </div>
        <div className={styles.filter}>
            <select
                        className={styles.sort}
                        onChange={handleSort}
                        ref={sortRef}
                    >
                        {
                            options.map((option, index) => (
                                <option 
                                    key={index}
                                    value={option.value}>
                                        {option.title}
                                    </option>
                            ))
                        }
            </select>
            {
                constants.continents.map((continent, index) => (
                    <button 
                        type="button"
                        key={index}
                        className={`${styles["continent-filter"]} ${selectedContinents.find(cont => cont === continent) ? styles.active: ''}`}
                        onClick={() => {
                            if(selectedContinents.find(el => el === continent)){
                                const auxContinents = selectedContinents.filter(cont => cont !== continent);
                                setSelectedContinents(auxContinents)
                            } else {
                                setSelectedContinents([...selectedContinents, continent]);
                            }
                        }} >{continent}</button>))
            }
        </div>
        <CountriesTable
         styles={styles}
         
         countries={sortedCountries}
         countDisplayedCountries={countDisplayedCountries}
         viewMore={viewMore}
         setCountDisplayedCountries={setCountDisplayedCountries}/>
      </div>
    </>
  )
}
