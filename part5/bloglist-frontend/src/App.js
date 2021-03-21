import React, { useState, useEffect, useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import Blog from './components/Blog'
import Create from './components/Create'
import Login from './components/Login'
import UserContext from './state'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])
  const saveUser = useCallback((u) => {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
    console.log("user saved.")
  }, [setUser])
  const clearUser = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
  }, [setUser])

  const setAlert = (msg) => {
    setMessage(msg)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  return (
    <UserContext.Provider value={user}>
      <div>
        <Switch>
          <Route path='/login'><Login saveUser={saveUser} /></Route>
          <Route path='/newblog'><Create setAlert={setAlert} /></Route>
          <Route path='/'><Blog clearUser={clearUser} message={message} /></Route>
        </Switch>
      </div>
    </UserContext.Provider>
  )
}

export default App