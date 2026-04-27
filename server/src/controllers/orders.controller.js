const supabase = require('../config/supabase')
const createOrder = async (req, res) => {
  try {
    const { ad_id, quantity, message } = req.body
    const buyer_id = req.user?.id

    console.log('📋 Creating order:', { ad_id, quantity, buyer_id, message })

    if (!ad_id || !quantity || !buyer_id) {
      return res.status(400).json({ error: 'ad_id, quantity, and buyer_id are required' })
    }

    // Verify ad exists
    const { data: ad, error: adError } = await supabase
      .from('ads')
      .select('id')
      .eq('id', ad_id)
      .single()

    if (adError || !ad) {
      console.log('❌ Ad not found:', adError)
      return res.status(404).json({ error: 'Ad not found' })
    }

    console.log('✅ Ad found:', ad.id)

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          ad_id,
          buyer_id,
          quantity,
          message,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (orderError) {
      console.log('❌ Order creation failed:', orderError)
      return res.status(500).json({ error: orderError.message || 'Failed to create order' })
    }

    console.log('✅ Order created:', order)

    return res.status(201).json({
      message: 'Order sent successfully',
      order
    })
  } catch (error) {
    console.error('❌ createOrder error:', error)
    return res.status(500).json({ error: error.message || 'Server error' })
  }
}

module.exports = { createOrder }
