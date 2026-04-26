'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Ad {
  id: number
  title: string
  description: string
  price: number
  image_url: string
  categories: { name: string }
  cities: { name: string }
  packages: { name: string; weight: number }
  contact_email: string
  status: string
  created_at: string
}

interface SimilarAd {
  id: number
  title: string
  slug: string
  price: number
  image_url: string
  categories: { name: string }
}

export default function AdDetail() {
  const { slug } = useParams()
  const router = useRouter()
  const [ad, setAd] = useState<Ad | null>(null)
  const [similarAds, setSimilarAds] = useState<SimilarAd[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [saved, setSaved] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    fetchAd()
    fetchSimilarAds()
    setFadeIn(true)
  }, [slug])

  const fetchAd = async () => {
    try {
      const res = await fetch(`https://adflow-pro-production-e4e8.up.railway.app/api/ads/${slug}`)
      if (!res.ok) throw new Error('Ad not found')
      const data = await res.json()
      setAd(data.ad)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchSimilarAds = async () => {
    try {
      const res = await fetch('https://adflow-pro-production-e4e8.up.railway.app/api/ads')
      const data = await res.json()
      setSimilarAds(data.ads.slice(0, 4)) // Take first 4 as similar
    } catch (err) {
      console.error('Failed to fetch similar ads:', err)
    }
  }

  const handleContact = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setShowEmail(true)
    } else {
      router.push('/login')
    }
  }

  const handleSave = () => {
    setSaved(!saved)
    // In a real app, save to backend or localStorage
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Skeleton for hero */}
          <div style={{ height: '400px', background: 'var(--bg2)', borderRadius: 'var(--radius)', marginBottom: '2rem' }}></div>
          {/* Skeleton for details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
            <div style={{ background: 'var(--bg2)', height: '600px', borderRadius: 'var(--radius)' }}></div>
            <div style={{ background: 'var(--bg2)', height: '400px', borderRadius: 'var(--radius)' }}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !ad) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text)', marginBottom: '1rem' }}>Ad Not Found</h1>
          <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>The ad you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => router.back()} style={{ background: 'var(--brand)', color: 'white', padding: '12px 24px', borderRadius: 'var(--radius)', border: 'none', cursor: 'pointer' }}>
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', opacity: fadeIn ? 1 : 0, transition: 'opacity 0.5s ease-in' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem' }}>
        <nav style={{ fontSize: '14px', color: 'var(--text2)' }}>
          <Link href="/" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Home</Link> &gt;
          <Link href="/explore" style={{ color: 'var(--text2)', textDecoration: 'none' }}> {ad.categories.name}</Link> &gt;
          <span style={{ color: 'var(--text)' }}> {ad.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden', borderRadius: 'var(--radius)', margin: '0 2rem 2rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <img
          src={ad.image_url || 'https://placehold.co/800x400?text=No+Image'}
          alt={ad.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)' }}></div>
        {ad.packages.name === 'Premium' && (
          <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
            Featured
          </div>
        )}
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Syne' }}>{ad.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>PKR {ad.price.toLocaleString()}</span>
            <span style={{ background: 'rgba(26,86,219,0.8)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{ad.categories.name}</span>
            <span style={{ background: ad.packages.name === 'Premium' ? 'rgba(124,58,237,0.8)' : 'rgba(26,86,219,0.6)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{ad.packages.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '14px' }}>
            <span>📅 {new Date(ad.created_at).toLocaleDateString()}</span>
            <span>📍 {ad.cities.name}</span>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        {/* Left Side */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text)' }}>Description</h2>
          <p style={{ color: 'var(--text2)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{ad.description}</p>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '2rem 0 1rem', color: 'var(--text)' }}>Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--bg2)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '0.5rem' }}>Category</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{ad.categories.name}</div>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '0.5rem' }}>City</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{ad.cities.name}</div>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '0.5rem' }}>Package</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{ad.packages.name}</div>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '0.5rem' }}>Status</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{ad.status}</div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '2rem 0 1rem', color: 'var(--text)' }}>Similar Ads</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {similarAds.map((simAd) => (
              <Link key={simAd.id} href={`/ad/${simAd.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
                  <img src={simAd.image_url || 'https://placehold.co/200x150?text=No+Image'} alt={simAd.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '0.5rem', color: 'var(--text)' }}>{simAd.title}</div>
                    <div style={{ color: 'var(--accent)', fontWeight: 700 }}>PKR {simAd.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
          {/* Seller Contact Card */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--brand)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '18px' }}>
                {ad.contact_email.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Seller</div>
                <div style={{ fontSize: '12px', color: 'var(--text2)' }}>Verified</div>
              </div>
            </div>
            <button onClick={handleContact} style={{ width: '100%', background: 'var(--brand)', color: 'white', padding: '12px', borderRadius: 'var(--radius)', border: 'none', cursor: 'pointer', marginBottom: '0.5rem' }}>
              Contact Seller
            </button>
            {showEmail && <div style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '0.5rem' }}>Email: {ad.contact_email}</div>}
            <button onClick={handleSave} style={{ width: '100%', background: saved ? 'var(--accent)' : 'var(--bg)', border: '1px solid var(--border)', color: saved ? 'white' : 'var(--text)', padding: '12px', borderRadius: 'var(--radius)', cursor: 'pointer', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {saved ? '❤️' : '🤍'} {saved ? 'Saved' : 'Save Ad'}
            </button>
            <button onClick={handleShare} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', padding: '12px', borderRadius: 'var(--radius)', cursor: 'pointer' }}>
              📎 Share
            </button>
          </div>

          {/* Safety Tips */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text)' }}>Safety Tips</h4>
            <ul style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6 }}>
              <li>Meet in public places</li>
              <li>Never share personal information</li>
              <li>Inspect items before purchase</li>
              <li>Use secure payment methods</li>
            </ul>
          </div>

          {/* Ad Stats */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text)' }}>Ad Stats</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text2)' }}>Views</span>
              <span style={{ color: 'var(--text)' }}>1,234</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
        <button onClick={() => router.back()} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text)', padding: '12px 24px', borderRadius: 'var(--radius)', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>
    </div>
  )
}