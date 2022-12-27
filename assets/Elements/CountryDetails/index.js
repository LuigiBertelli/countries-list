import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default ({country, removeCountry, ...props}) => {
    return(
        <div className={props.styles["country-container"]}>
            <div className={props.styles["country-face"]}>
                <FontAwesomeIcon className={props.styles["country-close"]} icon={faXmark}  onClick={removeCountry}/>
                <div className={props.styles["country-content"]}>
                    <h2>{country.name.common}</h2>
                    <img className={props.styles.flag} src={country.flags.png}  alt={country.flag}></img>
                    <ul>
                        <li>{country.area}</li>
                    </ul>
                </div>
            </div>

            <div className={props.styles["country-overflow"]} onClick={removeCountry}></div>
        </div>
        
    );
}