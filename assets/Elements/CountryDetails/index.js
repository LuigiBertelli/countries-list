import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import lang from './lang.json'

export default ({country, removeCountry, ...props}) => {
    return(
        <div className={props.styles["country-container"]}>
            <div className={props.styles["country-face"]}>
                <FontAwesomeIcon className={props.styles["country-close"]} icon={faXmark}  onClick={removeCountry}/>
                <div className={props.styles["country-content"]}>
                    <h2 className={props.styles.name}>{country.name.common}</h2>
                    <img className={props.styles.flag} src={country.flags.png}  alt={country.flag}></img>
                    
                    <span>{lang.en.continents}: {country.continents.join(', ')}</span>
                    <span>{lang.en.lang}: {Object.values(country.languages).join(', ')}</span>
                    <span>{lang.en.capital}: {country.capital.join(', ')}</span>
                    <span>{lang.en.area}: {country.area}km²</span>
                    <span>{lang.en.population}: {country.population}</span>
                </div>
            </div>

            <div className={props.styles["country-overflow"]} onClick={removeCountry}></div>
        </div>
        
    );
}