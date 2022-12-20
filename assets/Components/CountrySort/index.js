import lang from './Lang.json'

import styles from './CountrySort.module.scss'

export const CountrySort = (props) => {
    console.log(props);
    return (
        <div style={styles}>
            <div>
                <img className={styles.flag} src={props.flags.png}  alt={props.flag | lang.en.imgFlag}></img>

                <ol>
                    <li>Area: {props.area}</li>
                    <li>Capital: {props.capital}</li>
                    <li>languages: {props.languages.current}</li>
                    <li>Region: {props.region}</li>
                </ol>

            </div>
        </div>
    )
}