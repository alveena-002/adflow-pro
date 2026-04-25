const express = require('express')
const router = express.Router()
const { getAdsForReview, reviewAd, getReviewStats } = require('../controllers/moderator.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')

// Moderator routes
router.get('/ads', verifyToken, verifyRole('moderator', 'admin', 'super_admin'), getAdsForReview)
router.put('/ads/:ad_id/review', verifyToken, verifyRole('moderator', 'admin', 'super_admin'), reviewAd)
router.get('/stats', verifyToken, verifyRole('moderator', 'admin', 'super_admin'), getReviewStats)

module.exports = router
