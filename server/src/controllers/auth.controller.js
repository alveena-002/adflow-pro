const supabase = require('../config/supabase')
const jwt = require('jsonwebtoken')

// Register
const register = async (req, res) => {
  const { email, password, name, phone, city, role } = req.body

  const userRole = role === 'client' ? 'client' : 'buyer'

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, phone, city, role: userRole }
  })

  if (error) return res.status(400).json({ error: error.message })

  // Generate JWT token
  const token = jwt.sign(
    { id: data.user.id, email: data.user.email, role: userRole },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )

  res.status(201).json({
    message: 'Account created successfully',
    token,
    user: {
      id: data.user.id,
      email: data.user.email,
      name,
      phone,
      city,
      role: userRole
    }
  })
}

// Login
const login = async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) return res.status(401).json({ error: error.message })

  const role = data.user.user_metadata?.role || 'buyer'

  // Generate JWT token
  const token = jwt.sign(
    { id: data.user.id, email: data.user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )

  res.json({
    token,
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || '',
      phone: data.user.user_metadata?.phone || '',
      city: data.user.user_metadata?.city || '',
      role
    }
  })
}

// Get current user
const getUser = async (req, res) => {
  // Return user from JWT token directly
  res.json({ user: req.user })
}

module.exports = { register, login, getUser }