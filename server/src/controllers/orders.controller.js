const supabase = require('../db/db')

const createOrder = async (req, res) => {
  try {
    const { ad_id, quantity, message } = req.body
    const buyer_id = req.user?.id

    if (!ad_id || !quantity || !buyer_id) {
      return res.status(400).json({ error: 'ad_id, quantity, and buyer_id are required' })
    }

    const { data: ad, error: adError } = await supabase
      .from('ads')
      .select('id')
      .eq('id', ad_id)
      .single()

    if (adError || !ad) {
      return res.status(404).json({ error: 'Ad not found' })
    }

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
      return res.status(500).json({ error: orderError.message || 'Failed to create order' })
    }

    return res.status(201).json({
      message: 'Order sent successfully',
      order
    })
  } catch (error) {
    console.error('createOrder error:', error)
    return res.status(500).json({ error: error.message || 'Server error' })
  }
}

module.exports = { createOrder }
