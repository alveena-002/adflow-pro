const express = require('express')
const router = express.Router()
const {
  getPaymentsForVerification,
  verifyPayment,
  rejectPayment,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAdminStats
} = require('../controllers/admin.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')

// Payment verification routes
router.get('/payments', verifyToken, verifyRole('admin', 'super_admin'), getPaymentsForVerification)
router.put('/payments/:payment_id/verify', verifyToken, verifyRole('admin', 'super_admin'), verifyPayment)
router.put('/payments/:payment_id/reject', verifyToken, verifyRole('admin', 'super_admin'), rejectPayment)

// User management routes
router.get('/users', verifyToken, verifyRole('admin', 'super_admin'), getAllUsers)
router.put('/users/:user_id/role', verifyToken, verifyRole('admin', 'super_admin'), updateUserRole)
router.delete('/users/:user_id', verifyToken, verifyRole('admin', 'super_admin'), deleteUser)

// Admin stats
router.get('/stats', verifyToken, verifyRole('admin', 'super_admin'), getAdminStats)

module.exports = router
