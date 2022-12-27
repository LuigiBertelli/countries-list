import { useState} from 'react'

import { CountryCard } from '../../Elements/CountryCard'

import lang from './Lang.json'

import CountryDetails from '../../Elements/CountryDetails'

export const CountriesTable = (props) => {
    
    
    const [detailedCountry, setDetailedCountry] = useState();

    const viewMoreCountries = () => {
        props.setCountDisplayedCountries(props.countDisplayedCountries + props.viewMore);
    }

    return (

        <div className={props.styles.container}>
            <div className={props.styles.grid}>
            {
                props.countries &&
                props.countries.map((country, index) => {
                    if (detailedCountry === country) 
                        return (
                            <CountryDetails
                                key="country-details"
                                country={country}
                                removeCountry={() => setDetailedCountry()}
                                styles={props.styles}/>
                        );
                    else if (index <= props.countDisplayedCountries - 1)
                        return (
                            <CountryCard
                                key={index}
                                countryName={country.name.common}
                                flag={country.flag}
                                imgSrc={country.flags.png}
                                callback={() => setDetailedCountry(country)} 
                                styles={props.styles}/>);
                            
                    
                })
            }
            </div>
            {
                (props.countDisplayedCountries > 0 && props.countDisplayedCountries < props.countries.length) && 
               <button className={props.styles.more} onClick={viewMoreCountries} type="button" >{lang.en.buttonText}</button>
            }
        </div>
    )
}