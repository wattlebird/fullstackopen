import React, {useCallback} from 'react'
import API from '../Api'

const PeopleContainer = ({onDelete, onAlert, people}) => {
  const onDeletePerson = useCallback(id => {
    return API.DeletePhonebookItem(id).then(() => {
      onDelete(id)
    }).catch(() => {
      onAlert({
        message: "Delete user failed. The user may not exist.",
        status: "error"
      })
    })
  }, [onDelete, onAlert])

  return <PeopleRenderer onDelete={onDeletePerson} people={people} />
}

const PeopleRenderer = ({onDelete, people}) => {
  return (
    <div>
      <h3>Numbers</h3>
      {people.map(p => <div key={p.name}>{p.name} {p.number} <button onClick={onDelete.bind(this, p.id)}>Delete</button></div>)}
    </div>
  )
}

export default PeopleContainer