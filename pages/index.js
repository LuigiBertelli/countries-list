import { useState, useEffect } from 'react'
import { CountriesTable } from '../assets/Components/CountriesTable'
import { CountrySearch } from '../assets/Components/CountrySearch'

import config from '../assets/Configs/config.json'

import styles from '../styles/Home.module.scss'

export default function Home() {
  const viewMore = 6;
  const [allCountries, setAllCountries] = useState([]);
  const [sortedCountries, setSortedCountries] = useState([]);
  const [countDisplayedCountries, setDisplayedCountries] = useState(viewMore - 1);

  useEffect(() => {
    fetch(config.COUNTRIES_GET_ALL_URL)
        .then((res) => res.json())
        .then((data) => {
            setAllCountries(data);
            setSortedCountries(data);
        })
        .catch((err) => console.log('Error getting Countries', err.message));
    }, [])


  return (
    <>
      <div className={styles.main}>
        <div>
          <CountrySearch {...{allCountries, setSortedCountries, setDisplayedCountries, viewMore}}/>
        </div>
        <CountriesTable {...{sortedCountries, setSortedCountries, countDisplayedCountries, setDisplayedCountries, viewMore}}/>
      </div>
    </>
  )
}
