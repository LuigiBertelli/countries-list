import { useState, useEffect, useRef } from 'react'


import optionsObj from './options.json'

import lang from './Lang.json'

import styles from './CountrySort.module.scss'

export const CountrySort = (props) => {
    const [sortOrder, setSortOrder] = useState(1);
    const selectRef = useRef();

    useEffect(() => {
        props.setSortedCountries(
            props.sortedCountries.sort(sortFunc)
        )
    }, [sortOrder])

    const sortFunc = (a, b) => {
        return a[sortOrder] > b[sortOrder] ? 1 : (
            a[sortOrder] < b[sortOrder] ? -1 : 0
        );
    }

    const handleSortChange = (event) => {
        event.preventDefault();
        setSortOrder(selectRef.current.value);
    }

    return (
        <select
            className={styles.sort}
            onChange={handleSortChange}
            ref={selectRef}
        >
            {
                optionsObj.options.map((option, index) => (
                    <option 
                        key={index}
                        value={option.value}>
                            {option.title}
                        </option>
                ))
            }
        </select>
    )
}