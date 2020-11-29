const isAuthenticated = (req, res, next) => {
  const { username } = req.session

  if (username && username !== '') {
    req.authenticated = true
    next()
  } else {
    req.authenticated = false
    next()
  }
}

module.exports = isAuthenticated
