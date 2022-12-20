import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {CountryDetails} from '../../assets/Components/CountryDetails'

import styles from '../../styles/CountryPage.module.scss'

import config from '../../assets/Configs/config.json'

export default function CountryPage(props) {
  const [country, setCountry] = useState(null);
  const [invalidCountry, setInvalidCountry] = useState(null);
  const router = useRouter();
  const countryName = router.query.countryName;

  useEffect(() => {
    if(countryName !== undefined) {
      fetch(config.COUNTRIES_GET_BY_NAME_URL + countryName)
        .then((res) => res.json())
        .then((data) => {
          if(data.status && data.status !== 200)
            setInvalidCountry(data)
          else
            setCountry(data[0]);
        })
        .catch((err) => setInvalidCountry(err));
    }
  }, [countryName]);

  return (
    <div>
      <h2>{countryName}</h2>
      {
        invalidCountry === null && country === null ? 
          <>
          </>
        :
          (
            invalidCountry ?
              <>
                <strong>{invalidCountry.message}</strong>
              </>
            :
              <CountryDetails {...country}/>
              )
      }
    </div>
  )
}
