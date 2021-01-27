import React from 'react'

const People = React.memo(({people}) => {
  return (
    <div>
      <h3>Numbers</h3>
      {people.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )
})

export default People