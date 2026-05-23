import { useEffect, useState } from 'react'

import countriesServices from './services/countriesServices.jsx' 
import Filter from './components/Filter.jsx'
import CountryDisplay from './components/CountryDisplay.jsx'

function App() {
  const [countries, setCountries] = useState(null)
  const [value, setValue] = useState('')
  const [countryFilter, setCountryFilter] = useState('')

  const onShow = (countryName) => {
    countriesServices.getOne(countryName)
      .then(response => setCountries([response]))
  }

  const onFind = (event) => {
    event.preventDefault()
    setCountryFilter(value)
  }

  useEffect(() => {
    if (countryFilter) {
      countriesServices
        .getFiltered(countryFilter)
        .then(initialCountries => {
          setCountries(initialCountries)
        })
    }
  }, [countryFilter])

  return (
    <div>
      <Filter text="find countries " value={value} onChange={setValue} onFind={onFind}/>
      <CountryDisplay countries={countries} onShow={onShow}/>
    </div>
  )
}

export default App
