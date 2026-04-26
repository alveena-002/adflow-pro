'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'

interface Ad {
  id: number
  title: string
  slug: string
  price: number
  categories: { name: string }
  cities: { name: string }
  packages: { name: string; weight: number }
  image_url: string
}

export default function Explore() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAds()
  }, [])

  const fetchAds = async () => {
    try {
      const res = await fetch('https://adflow-pro-production-e4e8.up.railway.app/api/ads')
      const data = await res.json()
      setAds(data.ads)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>

      <Navbar />

      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'2rem'}}>
        
        {/* HEADER */}
        <div style={{marginBottom:'2rem'}}>
          <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'2rem', marginBottom:'0.5rem'}}>Explore Ads</h1>
          <p style={{color:'var(--text2)'}}>Browse all active listings</p>
        </div>

        {/* SEARCH & FILTERS */}
        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.5rem', marginBottom:'2rem', display:'flex', gap:'1rem', flexWrap:'wrap'}}>
          <input type="text" placeholder="🔍 Search ads..." style={{flex:1, minWidth:'200px', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          <select style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}}>
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Real Estate</option>
            <option>Vehicles</option>
            <option>Services</option>
          </select>
          <select style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}}>
            <option>All Cities</option>
            <option>Lahore</option>
            <option>Karachi</option>
            <option>Islamabad</option>
            <option>Faisalabad</option>
          </select>
          <select style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}}>
            <option>Sort: Newest</option>
            <option>Sort: Price Low</option>
            <option>Sort: Price High</option>
            <option>Sort: Featured</option>
          </select>
        </div>

        {/* ADS GRID */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'1.5rem'}}>
          {ads.map((ad) => (
            <Link key={ad.id} href={`/ad/${ad.slug}`}>
              <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden', cursor:'pointer', transition:'all 0.2s'}} className="hover:shadow-lg hover:-translate-y-1 hover:border-brand/30">
                <div style={{height:'180px', position: 'relative', overflow: 'hidden'}}>
                  <img src={ad.image_url || 'https://placehold.co/400x300?text=No+Image'} alt={ad.title} style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s'}} className="hover:scale-105" />
                </div>
                <div style={{padding:'1.25rem'}}>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
                    <span style={{background:'rgba(26,86,219,0.15)', color:'var(--brand)', fontSize:'11px', padding:'4px 10px', borderRadius:'20px', fontWeight: 600}}>{ad.categories?.name}</span>
                    <span style={{background: ad.packages?.name==='Premium' ? 'rgba(124,58,237,0.15)' : ad.packages?.name==='Standard' ? 'rgba(26,86,219,0.1)' : 'rgba(255,255,255,0.05)', color: ad.packages?.name==='Premium' ? '#a78bfa' : ad.packages?.name==='Standard' ? 'var(--brand)' : 'var(--text2)', fontSize:'11px', padding:'4px 10px', borderRadius:'20px', fontWeight: 600}}>{ad.packages?.name}</span>
                  </div>
                  <div style={{fontWeight:600, marginBottom:'6px', fontSize:'15px'}}>{ad.title}</div>
                  <div style={{color:'var(--text2)', fontSize:'12px', marginBottom:'12px'}}>📍 {ad.cities?.name}</div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{fontWeight:700, color:'var(--accent)', fontSize:'16px'}}>PKR {ad.price}</div>
                    <div style={{color:'var(--text2)', fontSize:'11px', background: 'var(--bg)', padding: '4px 8px', borderRadius: '4px'}}>⏱ 30d left</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}