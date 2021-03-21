import React, {useState, useCallback, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../state'
import { createBlog } from '../services/blogs'

const Create = ({setAlert}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const user = useContext(UserContext)
  const history = useHistory()

  const onTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, [setTitle])

  const onAuthorChange = useCallback((e) => {
    setAuthor(e.target.value);
  }, [setAuthor])

  const onUrlChange = useCallback((e) => {
    setUrl(e.target.value);
  }, [setUrl])

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      title,
      author,
      url
    }
    return createBlog(data, user.token).then(() => {
      // set message "blog created"
      setAlert(`A new blog ${title} by ${author} has been added!`)
      history.push('/')
    }).catch(e => {
      console.log(e)
    })
  }

  const onCancel = () => {
    history.push('/')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label for='title'>Title: </label>
          <input value={title} onChange={onTitleChange} name='title' />
        </div>
        <div>
          <label for='author'>Author: </label>
          <input value={author} onChange={onAuthorChange} name='author' />
        </div>
        <div>
          <label for='url'>URL: </label>
          <input value={url} onChange={onUrlChange} name='url' />
        </div>
        <button type='submit'>create</button>
        <button onClick={onCancel}>cancel</button>
      </form>
    </div>
  )
}

export default Create;