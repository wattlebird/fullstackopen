import React, { useState, useCallback, useMemo } from 'react'
import PeopleForm from './components/PeopleForm'
import Filter from './components/Filter'
import People from './components/People'

const App = () => {
  const [ people, setPeople ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ nameFilter, setNameFilter ] = useState('')
  
  const onChangeFilter = useCallback((val) => setNameFilter(val), [setNameFilter])
  const onAdd = useCallback((name, number) => {
    setPeople(prev => [...prev, {name, number}])
  }, [setPeople])
  const nameList = useMemo(() => people.map(itm => itm.name), [people])

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new...</h3>
      <PeopleForm onAdd={onAdd} nameList={nameList} />
      <h3>Numbers</h3>
      <Filter value={nameFilter} onChange={onChangeFilter} />
      <People people={nameFilter === '' ? people : people.filter(itm => itm.name.toLowerCase().includes(nameFilter.toLowerCase()))} />
    </div>
  )
}

export default App;
