import { useState, useEffect, useRef, use } from 'react'

import { useRouter } from 'next/router'

import { CountryCard } from '../../Elements/CountryCard'

import constants from './Constants.json'

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
    const [selectedContinents, setSelectedContinents] = useState([]);
    const [detailedCountry, setDetailedCountry] = useState();
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


    const viewMoreCountries = () => {
        setCountDisplayedCountries(countDisplayedCountries + viewMore);
    }

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

        <div className={props.styles.container}>
            <div className={props.styles.search}>
                <input 
                    className={props.styles['search-input']} 
                    onChange={handleFilter} 
                    ref={searchRef} 
                    type="text"
                    placeholder={lang.en.searchPlaceHolder}>

                    </input>
            </div>
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
                {
                    constants.continents.map((continent, index) => (
                        <button 
                            type="button"
                            key={index}
                            className={`${props.styles["continent-filter"]} ${selectedContinents.find(cont => cont === continent) ? props.styles.active: ''}`}
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
            <div className={props.styles.grid}>
            {
                sortedCountries.map((country, index) => {
                    if (detailedCountry === country) 
                        return null;
                    else if (index <= countDisplayedCountries - 1)
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
                (countDisplayedCountries > 0 && countDisplayedCountries < sortedCountries.length) && 
               <button className={props.styles.more} onClick={viewMoreCountries} type="button" >{lang.en.buttonText}</button>
            }
        </div>
    )
}