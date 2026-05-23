import { useEffect, useState } from 'react'

import weatherServices from "../services/weatherServices";

const Country = ({country}) => {
  const [capitalWeather, setCapitalWeather] = useState(null)

  useEffect(() => {
    weatherServices.getWeather(country.capital[0]).then( responseWeather => {
      setCapitalWeather(responseWeather)
    })
  }, [country])

  if (!capitalWeather) return <></>
    
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        Capital {country.capital[0]}<br />
        Area {country.area}
      </p>

      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([lg, language]) => <li key={lg}>{language}</li>)}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />

      <h3>Weather in {country.capital[0]}</h3>
      <p>Temperature {capitalWeather.main.temp} Celsius</p>
      <img 
        src={`https://openweathermap.org/payload/api/media/file/${capitalWeather.weather[0].icon}.png`} 
        alt={capitalWeather.weather[0].description}
      />
      <p>Wind {capitalWeather.wind.speed} m/s</p>
    </>
  )
}

export default Country