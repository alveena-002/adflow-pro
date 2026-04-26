const express = require('express')
const { createOrder } = require('../controllers/orders.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/', verifyToken, createOrder)

module.exports = router
