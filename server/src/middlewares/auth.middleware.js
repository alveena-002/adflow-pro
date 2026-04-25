const supabase = require('../config/supabase')

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'No token provided' })

  const { data, error } = await supabase.auth.getUser(token)

  if (error) return res.status(401).json({ error: 'Invalid token' })

  req.user = data.user
  next()
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