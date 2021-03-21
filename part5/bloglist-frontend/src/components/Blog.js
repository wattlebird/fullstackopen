import React, {useState, useEffect, useContext, useCallback} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {getAll, updateBlog, deleteBlog} from '../services/blogs'
import UserContext from '../state'
import Alert from './Alert';

const BlogItemWrapper = styled.div`
  padding-top: 10px;
  padding-left: 2px;
  border: solid;
  border-width: 1px;
  margin-bottom: 5px;
`

const BlogItem = ({blog, update, remove}) => {
  const user = useContext(UserContext)
  const [expanded, setExpanded] = useState(false)
  const onExpand = useCallback(() => setExpanded(true), [setExpanded])
  const onHide = useCallback(() => setExpanded(false), [setExpanded])
  const onLike = useCallback(() => {
    updateBlog(blog.id, {likes: blog.likes + 1}, user.token).then((res) => {
      update(blog.id, res)
    }).catch(err => console.log("Cannot like", err))
  }, [user, blog])
  const onDelete = useCallback(() => {
    if (window.confirm("Remove the blog if you don't need it!")) {
      deleteBlog(blog.id, user.token).then(() => {
        remove(blog.id)
      }).catch(err => console.log("cannot delete", err))
    }
  }, [user, blog])
  if (expanded) {
    return <BlogItemWrapper>
      <div>{blog.title} <button onClick={onHide}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes: {blog.likes} {user && <button onClick={onLike}>like</button>}</div>
      <div>{blog.author}</div>
      {user && <button onClick={onDelete}>delete</button>}
    </BlogItemWrapper>
  } else {
    return <BlogItemWrapper>{blog.title} {blog.author} <button onClick={onExpand}>view</button></BlogItemWrapper>
  }
}

const Blog = ({clearUser, message}) => {
  const user = useContext(UserContext)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })  
  }, [])

  const updateBlogs = (id, blog) => {
    const idx = blogs.findIndex(itm => itm.id === id)
    if (idx !== -1) {
      const nxtBlogs = [...blogs]
      nxtBlogs[idx] = blog
      nxtBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(nxtBlogs)
    }
  }

  const deleteBlog = (id) => {
    const idx = blogs.findIndex(itm => itm.id === id)
    if (idx !== -1) {
      const nxtBlogs = [...blogs]
      nxtBlogs.splice(idx, 1)
      setBlogs(nxtBlogs)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      {message && <Alert message={message} status="success" />}
      {user && <div><i>{user.nickname}</i> logged in. <button onClick={clearUser}>Logout</button></div>}
      <Link to="/newblog">Create new blog</Link>
      {blogs.map(blog => <BlogItem blog={blog} key={blog.id} update={updateBlogs} remove={deleteBlog} />)}
    </div>
  )
}

export default Blog
