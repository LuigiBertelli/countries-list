import lang from './Lang.json'

import styles from './CountryCard.module.scss'

export const CountryCard = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.face}>
                <div className={styles.content}>
                    <h2>{props.countryName}</h2>
                    <img className={styles.flag} src={props.imgSrc}  alt={props.flag | lang.en.imgFlag}></img>
                    <button className={styles.details} type="button" onClick={props.callback}>{lang.en.buttonText}</button>
                </div>
            </div>
        </div>
    )
}