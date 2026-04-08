const supabase = require('../db/db')

const getAds = async (req, res) => {
  try {
    const { category, city, search } = req.query
    let query = supabase
      .from('ads')
      .select('*, packages(name, weight), categories(name), cities(name)')
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
      .select('*, packages(name, weight), categories(name), cities(name)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) return res.status(404).json({ error: 'Ad not found' })
    res.json({ ad: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const createAd = async (req, res) => {
  try {
    const { title, description, category_id, city_id, package_id, price, media_url } = req.body
    const user_id = req.user.id
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()

    const { data, error } = await supabase
      .from('ads')
      .insert([{ user_id, title, slug, description, category_id, city_id, package_id, price, status: 'draft' }])
      .select()
      .single()

    if (error) throw error

    if (media_url) {
      await supabase.from('ad_media').insert([{ ad_id: data.id, source_type: 'image', original_url: media_url, thumbnail_url: media_url, validation_status: 'valid' }])
    }

    res.status(201).json({ message: 'Ad created successfully', ad: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getMyAds = async (req, res) => {
  try {
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

module.exports = { getAds, getAdBySlug, createAd, getMyAds, getCategories, getCities, getPackages }