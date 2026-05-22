import Country from './Country.jsx'

const CountryDisplay = ({countries}) => {
  if (!countries) {
    return (
      <div>
        Enter something for results
      </div>
    )
  } else if (countries.length === 0) {
    return (
      <div>
        No results
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]}/>
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => <div key={country.cca2}>{country.name.common}</div>)}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

export default CountryDisplay