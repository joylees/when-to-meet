/* eslint-disable no-alert */
/* eslint-disable react/jsx-filename-extension */
import Axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const signup = async () => {
    const response = await Axios.post('/account/signup', { username, password })
    if (response.data.success) {
      // eslint-disable-next-line no-alert
      history.push('/')
    } else {
      alert('Sign up failed')
    }
  }

  return (
    <div style={{ margin: '0 auto', display: 'block', width: '300px' }} className="pl-4 pt-4">
      <h1> Sign Up </h1>
      <div className="pb-2">
        <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      </div>
      <div className="pb-2">
        <input onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <button type="submit" onClick={() => signup(username, password, setMsg)}>
        Sign Up
      </button>
      {msg}
      <div>
        Not already a user?
        <Link to="/login">Log In</Link>
      </div>
    </div>
  )
}

export default SignUp
