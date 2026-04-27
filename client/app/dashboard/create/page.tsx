'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://adflow-pro-production-e4e8.up.railway.app'

export default function CreateAd() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', description: '', price: '',
    category_id: '', city_id: '', package_id: '', image_url: ''
  })
  const [categories, setCategories] = useState<{id:string,name:string}[]>([])
  const [cities, setCities] = useState<{id:string,name:string}[]>([])
  const [packages, setPackages] = useState<{id:string,name:string,price:number,duration_days:number}[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/ads/categories`).then(r=>r.json()).then(d=>setCategories(d.categories||[]))
    fetch(`${API_BASE_URL}/api/ads/cities`).then(r=>r.json()).then(d=>setCities(d.cities||[]))
    fetch(`${API_BASE_URL}/api/ads/packages`).then(r=>r.json()).then(d=>setPackages(d.packages||[]))
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/api/ads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: Number(form.price) })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to create ad')
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('Server error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>
      
      <nav style={{background:'rgba(15,23,42,0.95)', borderBottom:'1px solid var(--border)', padding:'0 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px', position:'sticky', top:0, zIndex:100, backdropFilter:'blur(12px)'}}>
        <Link href="/" style={{display:'flex', alignItems:'center', gap:'8px', textDecoration:'none'}}>
          <div style={{width:'32px', height:'32px', background:'var(--brand)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'white', fontFamily:'Syne'}}>A</div>
          <span style={{fontFamily:'Syne', fontWeight:700, fontSize:'18px', color:'var(--text)'}}>AdFlow <span style={{color:'var(--brand)'}}>Pro</span></span>
        </Link>
        <Link href="/dashboard" style={{color:'var(--text2)', textDecoration:'none', fontSize:'13px'}}>← Back to Dashboard</Link>
      </nav>

      <div style={{maxWidth:'700px', margin:'0 auto', padding:'2rem'}}>
        
        <div style={{marginBottom:'2rem'}}>
          <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.8rem', marginBottom:'0.25rem'}}>Post New Ad</h1>
          <p style={{color:'var(--text2)'}}>Fill in the details below to submit your listing</p>
        </div>

        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem'}}>

          {error && (
            <div style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'var(--danger)', padding:'10px 14px', borderRadius:'var(--radius)', marginBottom:'1rem', fontSize:'13px'}}>
              {error}
            </div>
          )}

          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Ad Title</label>
            <input type="text" placeholder="e.g. iPhone 15 Pro Max 256GB" value={form.title} onChange={e => setForm({...form, title:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          </div>

          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Description</label>
            <textarea placeholder="Describe your listing..." value={form.description} onChange={e => setForm({...form, description:e.target.value})} rows={4} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none', resize:'vertical'}} />
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.25rem'}}>
            <div>
              <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Price (PKR)</label>
              <input type="number" placeholder="e.g. 50000" value={form.price} onChange={e => setForm({...form, price:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
            </div>
            <div>
              <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Category</label>
              <select value={form.category_id} onChange={e => setForm({...form, category_id:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}}>
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.25rem'}}>
            <div>
              <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>City</label>
              <select value={form.city_id} onChange={e => setForm({...form, city_id:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}}>
                <option value="">Select city</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Package</label>
              <select value={form.package_id} onChange={e => setForm({...form, package_id:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}}>
                <option value="">Select package</option>
                {packages.map(p => <option key={p.id} value={p.id}>{p.name} - {p.price === 0 ? 'Free' : `PKR ${p.price}`} ({p.duration_days} days)</option>)}
              </select>
            </div>
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Image URL</label>
            <input type="text" placeholder="https://example.com/image.jpg" value={form.image_url} onChange={e => setForm({...form, image_url:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          </div>

          <div style={{display:'flex', gap:'1rem'}}>
            <button onClick={handleSubmit} disabled={loading} style={{flex:1, background:'var(--brand)', color:'white', padding:'12px', borderRadius:'var(--radius)', border:'none', fontWeight:600, fontSize:'15px', cursor:'pointer', opacity: loading ? 0.7 : 1}}>
              {loading ? 'Submitting...' : 'Submit Ad →'}
            </button>
            <Link href="/dashboard" style={{padding:'12px 24px', background:'var(--bg3)', color:'var(--text)', borderRadius:'var(--radius)', textDecoration:'none', fontWeight:500, textAlign:'center'}}>
              Cancel
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}