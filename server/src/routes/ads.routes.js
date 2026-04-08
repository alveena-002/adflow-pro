const express = require('express')
const router = express.Router()
const { getAds, getAdBySlug, createAd, getMyAds, getCategories, getCities, getPackages } = require('../controllers/ads.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')

router.get('/categories', getCategories)
router.get('/cities', getCities)
router.get('/packages', getPackages)
router.get('/', getAds)
router.get('/:slug', getAdBySlug)
router.post('/', verifyToken, verifyRole('client', 'admin'), createAd)
router.get('/my/listings', verifyToken, getMyAds)

module.exports = router