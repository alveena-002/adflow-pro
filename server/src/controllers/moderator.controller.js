const supabase = require('../db/db')

const getAdsForReview = async (req, res) => {
  try {
    const { status = 'under_review' } = req.query

    const { data: ads, error } = await supabase
      .from('ads')
      .select('*, users(name, email, phone), packages(name, weight), categories(name), cities(name)')
      .eq('status', status)
      .order('created_at', { ascending: true })

    if (error) throw error

    res.json({ ads })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const reviewAd = async (req, res) => {
  try {
    const { ad_id } = req.params
    const { status, moderator_notes } = req.body
    const moderator_id = req.user.id

    // Validate status
    if (!['active', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be "active" or "rejected"' })
    }

    // Get the ad
    const { data: ad, error: adError } = await supabase
      .from('ads')
      .select('*, payments(status)')
      .eq('id', ad_id)
      .single()

    if (adError || !ad) {
      return res.status(404).json({ error: 'Ad not found' })
    }

    // Determine final status based on payment status
    let finalStatus = status
    if (status === 'active') {
      const paymentStatus = ad.payments?.[0]?.status
      if (paymentStatus === 'verified' || !ad.payments || ad.payments.length === 0) {
        finalStatus = 'active'
      } else if (paymentStatus === 'submitted') {
        finalStatus = 'payment_pending'
      }
    }

    // Update ad with review
    const { data: updatedAd, error: updateError } = await supabase
      .from('ads')
      .update({
        status: finalStatus,
        moderator_notes,
        moderator_id,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', ad_id)
      .select()
      .single()

    if (updateError) throw updateError

    res.json({
      message: `Ad ${status === 'active' ? 'approved' : 'rejected'} successfully`,
      ad: updatedAd
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getReviewStats = async (req, res) => {
  try {
    // Get count of ads under review
    const { count: underReviewCount, error: underReviewError } = await supabase
      .from('ads')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'under_review')

    // Get count of ads pending payment
    const { count: pendingPaymentCount, error: pendingPaymentError } = await supabase
      .from('ads')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'payment_pending')

    // Get count of active ads
    const { count: activeCount, error: activeError } = await supabase
      .from('ads')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active')

    if (underReviewError || pendingPaymentError || activeError) {
      throw new Error('Error fetching stats')
    }

    res.json({
      stats: {
        underReview: underReviewCount || 0,
        pendingPayment: pendingPaymentCount || 0,
        active: activeCount || 0
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getAdsForReview, reviewAd, getReviewStats }
