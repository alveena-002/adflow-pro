const supabase = require('../db/db')

const submitPaymentProof = async (req, res) => {
  try {
    const { ad_id, amount, currency = 'PKR' } = req.body
    const user_id = req.user.id

    // Verify that the ad belongs to the user
    const { data: ad, error: adError } = await supabase
      .from('ads')
      .select('id, user_id, status')
      .eq('id', ad_id)
      .single()

    if (adError || !ad) {
      return res.status(404).json({ error: 'Ad not found' })
    }

    if (ad.user_id !== user_id) {
      return res.status(403).json({ error: 'You can only submit payment for your own ads' })
    }

    // Check if payment already exists
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id')
      .eq('ad_id', ad_id)
      .eq('status', 'submitted')
      .single()

    if (existingPayment) {
      return res.status(400).json({ error: 'Payment already submitted for this ad' })
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([{
        ad_id,
        user_id,
        amount,
        currency,
        status: 'submitted',
        proof_url: null
      }])
      .select()
      .single()

    if (paymentError) throw paymentError

    // Update ad status to payment_pending
    const { error: updateError } = await supabase
      .from('ads')
      .update({ status: 'payment_pending' })
      .eq('id', ad_id)

    if (updateError) throw updateError

    res.status(201).json({
      message: 'Payment proof submitted successfully',
      payment: {
        id: payment.id,
        ad_id: payment.ad_id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getPaymentProof = async (req, res) => {
  try {
    const { payment_id } = req.params
    const user_id = req.user.id

    const { data: payment, error } = await supabase
      .from('payments')
      .select('*, ads(user_id)')
      .eq('id', payment_id)
      .single()

    if (error || !payment) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    // Check if user is authorized (admin, super_admin, or the payment owner)
    if (req.user.role === 'client' && payment.user_id !== user_id) {
      return res.status(403).json({ error: 'Access denied' })
    }

    res.json({ payment })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { submitPaymentProof, getPaymentProof }
