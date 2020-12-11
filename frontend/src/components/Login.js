/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-filename-extension */
import Axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const login = async () => {
    const response = await Axios.post('/account/login', { username, password })
    if (response.data.success) {
      history.push('/')
    } else {
      alert('Incorrect username or password')
    }
  }

  return (
    <div style={{ margin: '0 auto', display: 'block', width: '300px' }} className="pl-4 pt-4">
      <h1> Log In </h1>
      <div className="pb-2">
        <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      </div>
      <div className="pb-2">
        <input onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <button type="submit" onClick={() => login(username, password, setMsg)}>
        Log In
      </button>
      {msg}
      <div>
        Don't have an account?
        <Link to="/signup"> Sign Up</Link>
      </div>
    </div>
  )
}

export default Login
