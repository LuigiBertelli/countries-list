import lang from './Lang.json'

export const CountryCard = (props) => {
    return (
        <div className={props.styles.card}>
            <div className={props.styles.face}>
                <div className={props.styles.content}>
                    <h2>{props.countryName}</h2>
                    <img className={props.styles.flag} src={props.imgSrc}  alt={props.flag | lang.en.imgFlag}></img>
                    <button className={props.styles.details} type="button" onClick={props.callback}>{lang.en.buttonText}</button>
                </div>
            </div>
        </div>
    )
}