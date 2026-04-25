const supabase = require('../config/supabase')

const getAds = async (req, res) => {
  try {
    const { category, city, search } = req.query
    let query = supabase
      .from('ads')
      .select('*, packages(name, weight), categories(name), cities(name), image_url')
      .eq('status', 'published')

    if (category) query = query.eq('category_id', category)
    if (city) query = query.eq('city_id', city)
    if (search) query = query.ilike('title', `%${search}%`)

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    res.json({ ads: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getAdBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const { data, error } = await supabase
      .from('ads')
      .select('*, packages(name, weight), categories(name), cities(name), image_url')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) return res.status(404).json({ error: 'Ad not found' })

    // Fetch user email
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(data.user_id)
    if (userError) {
      console.error(userError)
      data.contact_email = null
    } else {
      data.contact_email = userData.user.email
    }

    res.json({ ad: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const createAd = async (req, res) => {
  try {
    const { title, description, category_id, city_id, package_id, price, image_url } = req.body
    const user_id = req.user.id
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()

    const { data, error } = await supabase
      .from('ads')
      .insert([{ user_id, title, slug, description, category_id, city_id, package_id, price, image_url, status: 'draft' }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ message: 'Ad created successfully', ad: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const updateAd = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, category_id, city_id, package_id, price, image_url, status } = req.body
    const user_id = req.user.id

    const { data: existingAd, error: fetchError } = await supabase
      .from('ads')
      .select('user_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingAd) return res.status(404).json({ error: 'Ad not found' })
    if (existingAd.user_id !== user_id) return res.status(403).json({ error: 'Not authorized' })

    const updateFields = {
      title,
      description,
      category_id,
      city_id,
      package_id,
      price,
      image_url,
    }

    if (status) updateFields.status = status

    const { data, error } = await supabase
      .from('ads')
      .update(updateFields)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    res.json({ message: 'Ad updated successfully', ad: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const deleteAd = async (req, res) => {
  try {
    const { id } = req.params
    const user_id = req.user.id

    const { data: existingAd, error: fetchError } = await supabase
      .from('ads')
      .select('user_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingAd) return res.status(404).json({ error: 'Ad not found' })
    if (existingAd.user_id !== user_id) return res.status(403).json({ error: 'Not authorized' })

    const { error } = await supabase.from('ads').delete().eq('id', id)
    if (error) throw error

    res.json({ message: 'Ad deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getMyAds = async (req, res) => {
  try {
    console.log('GET /api/ads/my-ads called for user:', req.user?.id)
    const user_id = req.user.id
    const { data, error } = await supabase
      .from('ads')
      .select('*, packages(name), categories(name), cities(name)')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ ads: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getCategories = async (req, res) => {
  const { data, error } = await supabase.from('categories').select('*').eq('is_active', true)
  if (error) return res.status(500).json({ error: 'Server error' })
  res.json({ categories: data })
}

const getCities = async (req, res) => {
  const { data, error } = await supabase.from('cities').select('*').eq('is_active', true)
  if (error) return res.status(500).json({ error: 'Server error' })
  res.json({ cities: data })
}

const getPackages = async (req, res) => {
  const { data, error } = await supabase.from('packages').select('*')
  if (error) return res.status(500).json({ error: 'Server error' })
  res.json({ packages: data })
}

module.exports = { getAds, getAdBySlug, createAd, updateAd, deleteAd, getMyAds, getCategories, getCities, getPackages }
