const express = require('express')
const router = express.Router()
const { submitPaymentProof, getPaymentProof } = require('../controllers/payments.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')

// Client routes
router.post('/', verifyToken, verifyRole('client'), submitPaymentProof)
router.get('/:payment_id', verifyToken, getPaymentProof)

module.exports = router
