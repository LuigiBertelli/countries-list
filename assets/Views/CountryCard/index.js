import lang from './Lang.json'

import styles from './CountryCard.module.scss'

export const CountryCard = (props) => {
    return (
        <div>
            <div className={styles.card}>
                <h4 className='card-item'>{props.countryName}</h4>
                <img className={styles.flag} src={props.imgSrc}  alt={props.flag | lang.en.imgFlag}></img>
                <button className="button" type="button" onClick={props.callback}>{lang.en.buttonText}</button>
            </div>
        </div>
    )
}