import React, {useState, useCallback} from 'react'
import { useHistory } from "react-router-dom";
import Alert from './Alert';
import { userLogin } from '../services/login'

const Login = ({saveUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const onUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, [setUsername])

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, [setPassword])

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please provide both username and password.")
      return
    }
    userLogin(username, password).then((credential) => {
      setError("")
      //save the credential
      //onLoggedin(credential)
      saveUser(credential)
      //jump to homepage
      history.push('/')
    }).catch(err => {
      setError(err.response.data.error)
    })
  }

  return (
    <div>
      <h2>Login to application</h2>
      {error && <Alert status="error" message={error} />}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input value={username} onChange={onUsernameChange} name='username' />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input value={password} onChange={onPasswordChange} name='password' type='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login;