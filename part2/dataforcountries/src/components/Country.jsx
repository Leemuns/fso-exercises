const Country = ({country}) => {
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
    </>
  )
}

export default Country