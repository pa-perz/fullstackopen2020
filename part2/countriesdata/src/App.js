import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Display = props => {
    var toReturn

    if (props.flag === 0)
        toReturn = <DisplayError />
    else if (props.flag === 1)
        toReturn = <DisplayOne country={props.countries} api={props.api} />
    else
        toReturn = <DisplaySeveral countries={props.countries} />

    return toReturn
}

const DisplayError = () => {
    return (<p>Too many matches, specify another filter</p>)
}

const DisplayOne = (props) => {
    const [weather, setWeather] = useState('')

    const param = {
        access_key: props.api,
        query: props.country[0].capital
    }

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {param}).then(response => {
                setWeather(response.data.current)
            })
    }, [])

    return (
        <div>
            <h1>{props.country[0].name}</h1>
            <p>capital {props.country[0].capital}</p>
            <p>population {props.country[0].population}</p>
            <h3>languages</h3>
            <ul>
                {props.country[0].languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
            </ul>
            <img src={props.country[0].flag} alt="flag" width="100" />
            <h3>languages</h3>
            <p>temperature: {weather.temperature} Celsius</p>
            <p>wind: {weather.wind_speed} kmh direction {weather.wind_dir}</p>
        </div>
    )
}

const DisplaySeveral = (props) => {
    return (
        <div>
            {props.countries.map((country, i) => <p key={i}>{country.name}</p>)}
        </div>
    )
}

const App = (props) => {
    const [countries, setCountries] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all').then(response => {
                setCountries(response.data)
            })
    }, [])

    const api_key = process.env.REACT_APP_API_KEY

    const countriesToShow = countries.filter(country => country.name.toUpperCase().includes(query.toUpperCase()));
    let flag = countriesToShow.length > 10 ? 0 : countriesToShow.length === 1 ? 1 : 2


    const handleQuery = (event) => {
        setQuery(event.target.value)
    }

    return (
        <div>
            <div>
                find countries <input value={query} onChange={handleQuery} />
            </div>
            <div>
                <Display api={api_key} flag={flag} countries={countriesToShow} />
            </div>
        </div>
    )
}

export default App