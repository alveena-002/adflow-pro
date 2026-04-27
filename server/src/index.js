require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const adsRoutes = require('./routes/ads.routes')
const paymentsRoutes = require('./routes/payments.routes')
const moderatorRoutes = require('./routes/moderator.routes')
const adminRoutes = require('./routes/admin.routes')
const ordersRoutes = require('./routes/orders.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/ads', adsRoutes)
app.use('/api/payments', paymentsRoutes)
app.use('/api/moderator', moderatorRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/orders', ordersRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AdFlow Pro API running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})