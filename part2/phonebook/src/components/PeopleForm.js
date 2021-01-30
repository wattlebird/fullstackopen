import React, {useCallback, useState} from 'react'
import API from '../Api'

const PeopleFormContainer = ({onAdd, onUpdate, people, onAlert}) => {
  const [name, setName] = useState("")
  const [num, setNum] = useState("")
  const isDuplicate = useCallback((name) => people.filter(itm => itm.name === name).length > 0, [people])
  const onChangeName = useCallback((e) => {
    setName(e.target.value)
  }, [setName])
  const onChangeNum = useCallback((e) => {
    setNum(e.target.value)
  }, [setNum])
  const onAddHandler = useCallback((e) => {
    e.preventDefault()
    if (isDuplicate(name)) {
      if (window.confirm(`${name} is already on the phonebook. Replace the old number with a new one?`)) {
        const item = people.find(itm => itm.name === name)
        API.UpdatePhonebookItem(item.id, {...item, number: num}).then((data) => {
          onUpdate(item.id, data)
          setName("")
          setNum("")
        })
      }
      return
    }
    API.CreatePhonebookItem({name, number: num}).then(() => {
      onAdd(name, num)
      setName("")
      setNum("")
      onAlert({
        message: `${name} is added.`,
        status: 'success'
      })
    })
  }, [name, num, people, setName, setNum, onAdd, onUpdate, onAlert, isDuplicate])
  return <PeopleFormRenderer name={name} number={num} onChangeName={onChangeName} onChangeNumber={onChangeNum} onAdd={onAddHandler} />
}

const PeopleFormRenderer = ({name, number, onChangeName, onChangeNumber, onAdd}) => (
  <form onSubmit={onAdd}>
    <h3>Add a new</h3>
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" value={name} onChange={onChangeName} />
    </div>
    <div>
      <label htmlFor="number">Number:</label>
      <input type="text" name="number" id="number" value={number} onChange={onChangeNumber} />
    </div>
    <button type="submit">Add</button>
  </form>
)

export default PeopleFormContainer