import React, { useState, useEffect, useCallback } from 'react'
import PeopleForm from './components/PeopleForm'
import Filter from './components/Filter'
import People from './components/People'
import Alert from './components/Alert'
import API from './Api'

const App = () => {
  const [ people, setPeople ] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')
  const [ alertMsg, setAlertMsg ] = useState(null)
  useEffect(() => {
    API.GetPhonebook().then(data => {
      setPeople(data)
    })
  }, [])
  
  const onChangeFilter = useCallback((val) => setNameFilter(val), [setNameFilter])

  const onAdd = useCallback((name, number) => {
    setPeople(prev => [...prev, {name, number}])
  }, [setPeople])

  const onUpdate = useCallback((id, item) => {
    const idx = people.findIndex(itm => itm.id === id)
    if (idx !== -1) {
      setPeople(prev => {
        const nxt = [...prev]
        nxt[idx] = item
        return nxt
      })
    }
  }, [people])

  const onDelete = useCallback(id => {
    const idx = people.findIndex(itm => itm.id === id)
    if (idx !== -1) {
      setPeople(prev => {
        const nxt = [...prev]
        nxt.splice(idx, 1)
        return nxt
      })
    }
  }, [people])

  const onAlert = useCallback((msg) => {
    setAlertMsg(msg)
    setTimeout(() => setAlertMsg(null), 5000)
  }, [setAlertMsg])

  return (
    <div>
      <h2>Phonebook</h2>
      {!!alertMsg && <Alert message={alertMsg.message} status={alertMsg.status} />}
      <PeopleForm onAdd={onAdd} onUpdate={onUpdate} people={people} onAlert={onAlert} />
      <h3>Numbers</h3>
      <Filter value={nameFilter} onChange={onChangeFilter} />
      <People onDelete={onDelete} onAlert={onAlert} people={nameFilter === '' ? people : people.filter(itm => itm.name.toLowerCase().includes(nameFilter.toLowerCase()))} />
    </div>
  )
}

export default App;
