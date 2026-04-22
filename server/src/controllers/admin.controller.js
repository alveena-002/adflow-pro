const supabase = require('../db/db')

// ============ PAYMENT MANAGEMENT ============

const getPaymentsForVerification = async (req, res) => {
  try {
    const { status = 'submitted' } = req.query

    const { data: payments, error } = await supabase
      .from('payments')
      .select('*, ads(title, slug, user_id), users(name, email, phone)')
      .eq('status', status)
      .order('created_at', { ascending: true })

    if (error) throw error

    res.json({ payments })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const verifyPayment = async (req, res) => {
  try {
    const { payment_id } = req.params
    const { admin_notes } = req.body
    const admin_id = req.user.id

    // Get payment and associated ad
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*, ads(id, status)')
      .eq('id', payment_id)
      .single()

    if (paymentError || !payment) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    // Update payment status
    const { data: updatedPayment, error: updatePaymentError } = await supabase
      .from('payments')
      .update({
        status: 'verified',
        admin_notes,
        admin_id,
        verified_at: new Date().toISOString()
      })
      .eq('id', payment_id)
      .select()
      .single()

    if (updatePaymentError) throw updatePaymentError

    // If ad is in payment_pending status, update it to active
    if (payment.ads.status === 'payment_pending') {
      const { error: adUpdateError } = await supabase
        .from('ads')
        .update({ status: 'active' })
        .eq('id', payment.ads.id)

      if (adUpdateError) throw adUpdateError
    }

    res.json({
      message: 'Payment verified successfully',
      payment: updatedPayment
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const rejectPayment = async (req, res) => {
  try {
    const { payment_id } = req.params
    const { admin_notes } = req.body
    const admin_id = req.user.id

    // Get payment
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*, ads(id)')
      .eq('id', payment_id)
      .single()

    if (paymentError || !payment) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    // Update payment status
    const { data: updatedPayment, error: updatePaymentError } = await supabase
      .from('payments')
      .update({
        status: 'rejected',
        admin_notes,
        admin_id,
        rejected_at: new Date().toISOString()
      })
      .eq('id', payment_id)
      .select()
      .single()

    if (updatePaymentError) throw updatePaymentError

    // Update ad status back to draft
    const { error: adUpdateError } = await supabase
      .from('ads')
      .update({ status: 'draft' })
      .eq('id', payment.ads.id)

    if (adUpdateError) throw adUpdateError

    res.json({
      message: 'Payment rejected successfully',
      payment: updatedPayment
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// ============ USER MANAGEMENT ============

const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query

    let query = supabase
      .from('users')
      .select('id, name, email, phone, city, role, created_at')

    if (role) {
      query = query.eq('role', role)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data: users, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    res.json({ users })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const updateUserRole = async (req, res) => {
  try {
    const { user_id } = req.params
    const { role } = req.body

    // Validate role
    if (!['client', 'moderator', 'admin', 'super_admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' })
    }

    // Prevent changing super_admin role
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user_id)
      .single()

    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Cannot modify super_admin role' })
    }

    // Update user role
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ role })
      .eq('id', user_id)
      .select('id, name, email, phone, city, role, created_at')
      .single()

    if (updateError) throw updateError

    res.json({
      message: 'User role updated successfully',
      user: updatedUser
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params

    // Prevent deleting super_admin
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user_id)
      .single()

    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Cannot delete super_admin' })
    }

    // Delete user
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', user_id)

    if (deleteError) throw deleteError

    res.json({ message: 'User deleted successfully' })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// ============ ADMIN STATS ============

const getAdminStats = async (req, res) => {
  try {
    // Count users by role
    const { data: usersByRole, error: usersByRoleError } = await supabase
      .from('users')
      .select('role', { count: 'exact' })

    // Count ads by status
    const { data: adsByStatus, error: adsByStatusError } = await supabase
      .from('ads')
      .select('status', { count: 'exact' })

    // Count payments by status
    const { data: paymentsByStatus, error: paymentsByStatusError } = await supabase
      .from('payments')
      .select('status', { count: 'exact' })

    if (usersByRoleError || adsByStatusError || paymentsByStatusError) {
      throw new Error('Error fetching stats')
    }

    // Process counts
    const userCounts = {}
    const adCounts = {}
    const paymentCounts = {}

    usersByRole?.forEach(u => {
      userCounts[u.role] = (userCounts[u.role] || 0) + 1
    })

    adsByStatus?.forEach(a => {
      adCounts[a.status] = (adCounts[a.status] || 0) + 1
    })

    paymentsByStatus?.forEach(p => {
      paymentCounts[p.status] = (paymentCounts[p.status] || 0) + 1
    })

    res.json({
      stats: {
        users: userCounts,
        ads: adCounts,
        payments: paymentCounts,
        totalUsers: Object.values(userCounts).reduce((a, b) => a + b, 0),
        totalAds: Object.values(adCounts).reduce((a, b) => a + b, 0),
        totalPayments: Object.values(paymentCounts).reduce((a, b) => a + b, 0)
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  getPaymentsForVerification,
  verifyPayment,
  rejectPayment,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAdminStats
}
