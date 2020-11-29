const express = require('express')

const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/', (req, res) => {
  const { username } = req.session
  res.send(`${username} is logged in`)
})

router.post('/authenticate', isAuthenticated, (req, res) => {
  const { username } = req.session
  res.json({ username })
})

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    req.session.username = username
    req.session.password = password

    res.send({
      success: true,
      data: username,
    })
  } catch {
    res.send('Failed to sign up')
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (err) {
      next(err)
    } else if (user) {
      req.session.username = username
      req.session.password = password
      res.send({
        success: true,
        data: user,
      })
    } else {
      res.send('Failed to log in')
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  res.send('User logged out')
})

module.exports = router
