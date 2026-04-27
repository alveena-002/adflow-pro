const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'No token provided' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

const verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' })

    const userRole = req.user.user_metadata?.role || req.user.app_metadata?.role

    console.log('User role:', userRole)

    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied' })
    }
    next()
  }
}

module.exports = { verifyToken, verifyRole }