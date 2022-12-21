import { useState, useEffect } from 'react'
import { CountriesTable } from '../assets/Components/CountriesTable'

import config from '../assets/Configs/config.json'

import styles from '../styles/Home.module.scss'

export default function Home() {
  const viewMore = 6;
  const [allCountries, setAllCountries] = useState([]);
  const [sortedCountries, setSortedCountries] = useState([]);
  const [countDisplayedCountries, setDisplayedCountries] = useState(viewMore);

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
        <CountriesTable {...{
          allCountries,
          sortedCountries,
          setSortedCountries,
          countDisplayedCountries,
          setDisplayedCountries,
          viewMore}}/>
      </div>
    </>
  )
}
