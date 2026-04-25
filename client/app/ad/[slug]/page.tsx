'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '../../components/Navbar'

interface Ad {
  id: number
  title: string
  description: string
  price: number
  slug: string
  contact_email: string
  categories: { name: string }
  cities: { name: string }
  packages: { name: string }
  image_url: string
}

export default function AdDetail() {
  const { slug } = useParams()
  const [ad, setAd] = useState<Ad | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (slug) {
      fetchAd()
    }
  }, [slug])

  const fetchAd = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/ads/${slug}`)
      if (!res.ok) throw new Error('Ad not found')
      const data = await res.json()
      setAd(data.ad)
    } catch (err) {
      setError('Failed to load ad')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!ad) return <div>Ad not found</div>

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>{ad.title}</h1>
        <img src={ad.image_url || 'https://via.placeholder.com/800x600?text=No+Image'} alt={ad.title} style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem', borderRadius: '8px' }} />
        <p><strong>Category:</strong> {ad.categories?.name}</p>
        <p><strong>City:</strong> {ad.cities?.name}</p>
        <p><strong>Package:</strong> {ad.packages?.name}</p>
        <p><strong>Price:</strong> PKR {ad.price}</p>
        <p><strong>Description:</strong> {ad.description}</p>
        <p><strong>Email:</strong> <a href="mailto:kamalalaveena@gmail.com">kamalalaveena@gmail.com</a></p>
      </div>
    </div>
  )
}