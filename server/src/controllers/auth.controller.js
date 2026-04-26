const supabase = require('../config/supabase')

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

  // Auto login after register
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (loginError) return res.status(201).json({ message: 'Registered! Please login.', user: data.user })

  res.status(201).json({
    message: 'Account created successfully',
    token: loginData.session.access_token,
    user: {
      ...loginData.user,
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

  res.json({
    token: data.session.access_token,
    user: {
      ...data.user,
      role
    }
  })
}

// Get current user
const getUser = async (req, res) => {
  const user_id = req.user.id

  const { data: user, error } = await supabase
    .from('users')
    .select('id, name, email, phone, city, role')
    .eq('id', user_id)
    .single()

  if (error || !user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json({ user })
}

module.exports = { register, login, getUser }