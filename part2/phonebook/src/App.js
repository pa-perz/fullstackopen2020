import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = props => {
    return (
        <>
            {props.persons.map((person, i) => <p key={i}>{person.name} {person.number}</p>)}
        </>
    )
}

const Filter = props => {
    return (
        <form>
            <div>
                filter shown with <input value={props.search} onChange={props.handleSearchChange} />
            </div>
        </form>
    )
}

const PersonForm = props => {
    return (
        <form>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button onClick={props.addPerson} type="submit">add</button>
            </div>
        </form>
    )
}

const App = (props) => {
    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    let [showAll, setShowAll] = useState(true)

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons').then(response => {
                setPersons(response.data)
            })
    }, [])


    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber
        }

        let aux = personObject.name.trim()
        if (persons.filter(person => person.name === aux).length !== 0) {
            window.alert(`${aux} is already added to phonebook`)
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {

        setSearch(event.target.value)

        if (event.target.value !== '') {
            showAll = false
        }
        else {
            showAll = true
        }
        setShowAll(showAll)
    }


    const personsToShow = showAll ? persons : persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} handleSearchChange={handleSearchChange} />
            <h3>add a new</h3>
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
            <h3>Numbers</h3>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App