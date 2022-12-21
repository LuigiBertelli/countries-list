import { useRouter } from 'next/router'

import { CountryCard } from '../../Elements/CountryCard'

import { CountrySearch } from '../../Elements/CountrySearch'

import { CountrySort } from '../../Elements/CountrySort'

import styles from './CountriesTable.module.scss'

import lang from './Lang.json'

export const CountriesTable = (props) => {
    
    const router = useRouter();

    const viewMoreCountries = () => {
        props.setDisplayedCountries(props.countDisplayedCountries + props.viewMore);
    }

    return (

        <div className={styles.container}>
            <div className={styles.filter}>
                <CountrySort 
                    sortedCountries={props.sortedCountries}
                    setSortedCountries={props.setSortedCountries}
                    setDisplayedCountries={props.setDisplayedCountries}
                    viewMore={props.viewMore}/>
                    
                <CountrySearch 
                    allCountries={props.allCountries}
                    setSortedCountries={props.setSortedCountries}
                    setDisplayedCountries={props.setDisplayedCountries}
                    viewMore={props.viewMore}/>
            </div>
            <div className={styles.grid}>
            {
                props.sortedCountries.map((country, index) => {
                    return index <= props.countDisplayedCountries - 1 &&
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
                (props.countDisplayedCountries > 0 && props.countDisplayedCountries < props.sortedCountries.length) && 
               <button className={styles.more} onClick={viewMoreCountries} type="button" >{lang.en.buttonText}</button>
            }
        </div>
    )
}