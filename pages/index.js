import { CountriesTable } from '../assets/Components/CountriesTable'

import styles from '../styles/Home.module.scss'

export default function Home() {

  return (
    <>
      <div className={styles.main}>
        <CountriesTable/>
      </div>
    </>
  )
}
