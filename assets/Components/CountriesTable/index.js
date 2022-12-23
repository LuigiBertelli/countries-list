import { useState, useEffect, useRef, use } from 'react'

import { useRouter } from 'next/router'

import { CountryCard } from '../../Elements/CountryCard'

import lang from './Lang.json'

import config from '../../Configs/config.json'

const options =  [
    {
        value: 1, 
        title: "Alphabetical Order (a-z)",
        sortFunc: function (a, b) {
            return a.name.common > b.name.common ? 1 : (
                a.name.common < b.name.common ? -1 : 0);
        },
    },
    {
        value: 2, 
        title: "Alphabetical Order (z-a)",
        sortFunc: function(a, b) {
            return a.name.common > b.name.common ? -1 : (
                a.name.common < b.name.common ? 1 : 0);
        },
    },
    { 
        value: 3,
        title: "Populational Order (Higher - Lower)",
        sortFunc: function(a, b) {
                return b.population - a.population;
            },
    },
    { 
        value: 4,
        title: "Populational Order (Lower - Higher)",
        sortFunc: function(a, b) {
                return a.population - b.population;
            },
    }
];

export const CountriesTable = (props) => {
    
    const router = useRouter();
    const viewMore = 6;
    const [allCountries, setAllCountries] = useState([]);
    const [sortedCountries, setSortedCountries] = useState([]);
    const [countDisplayedCountries, setCountDisplayedCountries] = useState(viewMore);
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


    const viewMoreCountries = () => {
        setCountDisplayedCountries(countDisplayedCountries + viewMore);
    }

    const handleSearch = () => {

        const searchCountry = allCountries.filter(country => country.name.common.toUpperCase().includes(searchRef.current.value.trim().toUpperCase()));
        const numberDisplayCountries = !searchCountry || searchCountry.length === -1 ? 0 :
            ( searchCountry && searchCountry.length < viewMore ? searchCountry.length : viewMore);
        
        setCountDisplayedCountries(numberDisplayCountries);
        setSortedCountries(searchCountry);
    }

    
    const handleSort = () => {
        const sortSlected = sortRef.current.value;
        const sortOrder = options.find(el => el.value == sortSlected);
        setAllCountries(allCountries.sort(sortOrder.sortFunc));
        handleSearch();
    } 

    return (

        <div className={props.styles.container}>
            <div className={props.styles.filter}>
                    <select
                        className={props.styles.sort}
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
                    
                    <input 
                        className={props.styles['search-input']} 
                        onChange={handleSearch} 
                        ref={searchRef} 
                        type="text"
                        placeholder={lang.en.searchPlaceHolder}>

                        </input>
            </div>
            <div className={props.styles.grid}>
            {
                sortedCountries.map((country, index) => {
                    return index <= countDisplayedCountries - 1 &&
                        <CountryCard
                            key={index}
                            countryName={country.name.common}
                            flag={country.flag}
                            imgSrc={country.flags.png}
                            callback={() => router.push(
                                '/country/[countryName]',
                                 `/country/${country.name.common}`
                            )} 
                            styles={props.styles}/>
                    
                })
            }
            </div>
            {
                (countDisplayedCountries > 0 && countDisplayedCountries < sortedCountries.length) && 
               <button className={props.styles.more} onClick={viewMoreCountries} type="button" >{lang.en.buttonText}</button>
            }
        </div>
    )
}