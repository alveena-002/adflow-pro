'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'

interface Ad {
  id: string
  title: string
  description: string
  price: number
  status: string
  image_url?: string
  packages: { name: string }
  categories: { name: string }
  cities: { name: string }
}

const statusColor: Record<string, string> = {
  draft: 'var(--text2)',
  published: 'var(--success)',
  under_review: 'var(--accent)',
  rejected: 'var(--danger)',
  expired: 'var(--text2)',
}

export default function Dashboard() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchMyAds(token)
  }, [])

  const fetchMyAds = async (token: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/ads/my-ads', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Unable to load your ads')
      } else {
        setAds(data.ads || [])
      }
    } catch (err) {
      console.error(err)
      setError('Server error while loading ads')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this ad?')
    if (!confirmed) return

    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')

    try {
      const res = await fetch(`http://localhost:5000/api/ads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Unable to delete ad')
      } else {
        setAds((current) => current.filter((ad) => ad.id !== id))
      }
    } catch (err) {
      console.error(err)
      setError('Server error while deleting ad')
    }
  }

  if (loading) {
    return <div style={{minHeight:'100vh', padding:'2rem', color:'var(--text)'}}>Loading your ads...</div>
  }

  const stats = {
    total: ads.length,
    published: ads.filter((ad) => ad.status === 'published').length,
    under_review: ads.filter((ad) => ad.status === 'under_review').length,
    draft: ads.filter((ad) => ad.status === 'draft').length,
    rejected: ads.filter((ad) => ad.status === 'rejected').length,
  }

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>
      <Navbar />

      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'2rem'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.8rem', marginBottom:'0.25rem'}}>My Dashboard</h1>
            <p style={{color:'var(--text2)'}}>Manage your listings and track performance</p>
          </div>
          <Link href="/dashboard/create" style={{background:'var(--brand)', color:'white', padding:'10px 20px', borderRadius:'var(--radius)', textDecoration:'none', fontWeight:600}}>
            + Post New Ad
          </Link>
        </div>

        {error && (
          <div style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'var(--danger)', padding:'12px 16px', borderRadius:'12px', marginBottom:'1.5rem'}}>
            {error}
          </div>
        )}

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'1rem', marginBottom:'2rem'}}>
          <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', textAlign:'center'}}>
            <div style={{fontSize:'2rem', fontWeight:700, color:'var(--brand)', fontFamily:'Syne'}}>{stats.total}</div>
            <div style={{color:'var(--text2)', fontSize:'12px', marginTop:'4px'}}>Total Ads</div>
          </div>
          <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', textAlign:'center'}}>
            <div style={{fontSize:'2rem', fontWeight:700, color:'var(--success)', fontFamily:'Syne'}}>{stats.published}</div>
            <div style={{color:'var(--text2)', fontSize:'12px', marginTop:'4px'}}>Published</div>
          </div>
          <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', textAlign:'center'}}>
            <div style={{fontSize:'2rem', fontWeight:700, color:'var(--accent)', fontFamily:'Syne'}}>{stats.under_review}</div>
            <div style={{color:'var(--text2)', fontSize:'12px', marginTop:'4px'}}>Under Review</div>
          </div>
          <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', textAlign:'center'}}>
            <div style={{fontSize:'2rem', fontWeight:700, color:'var(--text2)', fontFamily:'Syne'}}>{stats.draft}</div>
            <div style={{color:'var(--text2)', fontSize:'12px', marginTop:'4px'}}>Draft</div>
          </div>
          <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', textAlign:'center'}}>
            <div style={{fontSize:'2rem', fontWeight:700, color:'var(--danger)', fontFamily:'Syne'}}>{stats.rejected}</div>
            <div style={{color:'var(--text2)', fontSize:'12px', marginTop:'4px'}}>Rejected</div>
          </div>
        </div>

        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden'}}>
          <div style={{padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 style={{fontFamily:'Syne', fontWeight:600, fontSize:'1rem'}}>My Listings</h2>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', fontSize:'13px'}}>
              <thead>
                <tr style={{background:'var(--bg)'}}>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Title</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Category</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Status</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Price</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>City</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad.id} style={{borderTop:'1px solid var(--border)'}}>
                    <td style={{padding:'12px 16px', fontWeight:500}}>{ad.title}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{ad.categories?.name}</td>
                    <td style={{padding:'12px 16px'}}>
                      <span style={{background:`${statusColor[ad.status] || 'var(--text2)'}20`, color:statusColor[ad.status] || 'var(--text2)', fontSize:'11px', padding:'4px 10px', borderRadius:'20px', fontWeight:500, textTransform:'capitalize'}}>{ad.status.replace('_', ' ')}</span>
                    </td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>PKR {ad.price}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{ad.cities?.name}</td>
                    <td style={{padding:'12px 16px', display:'flex', gap:'0.5rem', flexWrap:'wrap'}}>
                      <Link href={`/dashboard/edit/${ad.id}`} style={{background:'var(--brand)', color:'white', padding:'8px 12px', borderRadius:'8px', fontSize:'12px', textDecoration:'none'}}>Edit</Link>
                      <button onClick={() => handleDelete(ad.id)} style={{background:'rgba(239,68,68,0.15)', color:'var(--danger)', border:'1px solid rgba(239,68,68,0.25)', padding:'8px 12px', borderRadius:'8px', fontSize:'12px', cursor:'pointer'}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
