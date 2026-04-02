const supabase = require('../db/db')

const getAds = async (req, res) => {
  try {
    const { category, city, search, sort } = req.query

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

    if (error || !data) {
      return res.status(404).json({ error: 'Ad not found' })
    }

    res.json({ ad: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const createAd = async (req, res) => {
  try {
    const { title, description, category_id, city_id, package_id, price } = req.body
    const user_id = req.user.id

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()

    const { data, error } = await supabase
      .from('ads')
      .insert([{
        user_id,
        title,
        slug,
        description,
        category_id,
        city_id,
        package_id,
        price,
        status: 'draft'
      }])
      .select()
      .single()

    if (error) throw error

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

module.exports = { getAds, getAdBySlug, createAd, getMyAds }