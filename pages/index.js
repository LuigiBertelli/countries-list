import { useState } from 'react'

import { CountriesTable } from '../assets/Components/CountriesTable'

import styles from '../styles/Home.module.scss'

export default function Home() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = (event) => {
    event.preventDefault();
    const actualTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(actualTheme);
  }

  return (
    <>
      <div className={ `${styles.main} ${styles[`${theme}`]}`}>
        <buttton type="button" onClick={toggleTheme}>adasd</buttton>
        <CountriesTable styles={styles}/>
      </div>
    </>
  )
}
