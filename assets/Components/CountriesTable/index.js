import { useRouter } from 'next/router'

import { CountryCard } from '../../Elements/CountryCard'

import styles from './CountriesTable.module.scss'

import lang from './Lang.json'

export const CountriesTable = (props) => {
    
    const router = useRouter();

    const viewMoreCountries = () => {
        props.setDisplayedCountries(props.countDisplayedCountries + props.viewMore);
    }

    return (

        <div className={styles.container}>
            <div className={styles.grid}>
            {
                props.sortedCountries.map((country, index) => {
                    return index <= props.countDisplayedCountries &&
                        <CountryCard
                            key={index}
                            countryName={country.name.common}
                            flag={country.flag}
                            imgSrc={country.flags.png}
                            callback={() => router.push(
                                '/country/[countryName]',
                                 `/country/${country.name.common}`
                            )} />
                    
                })
            }
            </div>
            {
                props.countDisplayedCountries <= props.sortedCountries.length && 
               <button className={styles.more} onClick={viewMoreCountries} type="button" >{lang.en.buttonText}</button>
            }
        </div>
    )
}