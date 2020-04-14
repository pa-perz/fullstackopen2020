import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Persons = ({persons, delet }) => {
    return (
        <>
            {persons.map((person, i) => <p key={i}>{person.name} {person.number} <button onClick={() => delet(person.id, person.name)} type="submit">delete</button></p>)}
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

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="added">
        {message}
      </div>
    )
  }

const App = () => {
    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    let [showAll, setShowAll] = useState(true)
    const [addedMessage, setAddedMessage] = useState(null)

    useEffect(() => {
        personsService
            .getAll()
            .then(response => {
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
            personsService
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
                setAddedMessage('Added ' + personObject.name)
                setTimeout(() => {
                    setAddedMessage(null)
                }, 3000);
            })
        }
    }

    const handleDelete = (id, name) => {
        if (window.confirm("Delete " + name + " ?"))
        personsService
        .delete(id)
        .then(() =>  {
            setPersons(persons.filter(p => p.id !== id))
        })
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
            <Notification message={addedMessage} />
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
            <h3>Numbers</h3>
            <Persons persons={personsToShow} delet={handleDelete} />
        </div>
    )
}

export default App
