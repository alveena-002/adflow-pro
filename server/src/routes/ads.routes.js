const express = require('express')
const router = express.Router()
const { getAds, getAdBySlug, createAd, updateAd, deleteAd, getMyAds, getCategories, getCities, getPackages } = require('../controllers/ads.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')

router.get('/categories', getCategories)
router.get('/cities', getCities)
router.get('/packages', getPackages)
router.get('/', getAds)

// User-specific routes must come before the slug route.
router.get('/my-ads', verifyToken, getMyAds)
router.get('/my/listings', verifyToken, getMyAds)

router.post('/', verifyToken, verifyRole('client', 'admin'), createAd)
router.put('/:id', verifyToken, verifyRole('client', 'admin'), updateAd)
router.delete('/:id', verifyToken, verifyRole('client', 'admin'), deleteAd)
router.get('/:slug', getAdBySlug)

module.exports = router
