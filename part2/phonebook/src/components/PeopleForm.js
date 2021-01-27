import React, {useCallback, useState} from 'react'

const PeopleFormContainer = ({onAdd, nameList}) => {
  const [name, setName] = useState("")
  const [num, setNum] = useState("")
  const isDuplicate = useCallback((name) => nameList.includes(name), [nameList])
  const onChangeName = useCallback((e) => {
    setName(e.target.value)
  }, [setName])
  const onChangeNum = useCallback((e) => {
    setNum(e.target.value)
  }, [setNum])
  const onAddHandler = useCallback((e) => {
    e.preventDefault()
    if (isDuplicate(name)) {
      alert(`${name} is already added to phonebook.`)
      return
    }
    onAdd(name, num)
    setName("")
    setNum("")
  }, [name, num, setName, setNum, onAdd])
  return <PeopleFormRenderer name={name} number={num} onChangeName={onChangeName} onChangeNumber={onChangeNum} onAdd={onAddHandler} />
}

const PeopleFormRenderer = ({name, number, onChangeName, onChangeNumber, onAdd}) => (
  <form onSubmit={onAdd}>
    <h3>Add a new</h3>
    <div>
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" value={name} onChange={onChangeName} />
    </div>
    <div>
      <label for="number">Number:</label>
      <input type="text" name="number" id="number" value={number} onChange={onChangeNumber} />
    </div>
    <button type="submit">Add</button>
  </form>
)

export default PeopleFormContainer