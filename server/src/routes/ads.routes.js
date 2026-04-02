const express = require('express')
const router = express.Router()
const { getAds, getAdBySlug, createAd, getMyAds } = require('../controllers/ads.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')

// Public routes
router.get('/', getAds)
router.get('/:slug', getAdBySlug)

// Protected routes (client only)
router.post('/', verifyToken, verifyRole('client', 'admin'), createAd)
router.get('/my/listings', verifyToken, getMyAds)

module.exports = router




