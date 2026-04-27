'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', city:'', role:'buyer' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Registration failed')
      } else {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        if (data.user.role === 'buyer') router.push('/explore')
        else router.push('/dashboard')
      }
    } catch {
      setError('Server error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem'}}>
      <div style={{width:'100%', maxWidth:'420px'}}>
        
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
          <div style={{width:'48px', height:'48px', background:'var(--brand)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'white', fontSize:'20px', margin:'0 auto 1rem'}}>A</div>
          <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.8rem'}}>Create Account</h1>
          <p style={{color:'var(--text2)', marginTop:'0.5rem'}}>Join AdFlow Pro today</p>
        </div>

        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem'}}>

          {error && (
            <div style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'var(--danger)', padding:'10px 14px', borderRadius:'var(--radius)', marginBottom:'1rem', fontSize:'13px'}}>
              {error}
            </div>
          )}

          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Full Name</label>
            <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          </div>

          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          </div>

          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Phone Number</label>
            <input type="text" placeholder="03xx-xxxxxxx" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          </div>

          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>City</label>
            <select value={form.city} onChange={e => setForm({...form, city:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}}>
              <option value="">Select your city</option>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Islamabad</option>
              <option>Faisalabad</option>
              <option>Rawalpindi</option>
              <option>Multan</option>
            </select>
          </div>

          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password:e.target.value})} style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          </div>

          {/* ROLE SELECTION */}
          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', marginBottom:'8px', fontSize:'13px', fontWeight:500}}>I want to</label>
            <div style={{display:'flex', gap:'1rem'}}>
              <div onClick={() => setForm({...form, role:'buyer'})} 
                style={{flex:1, padding:'12px', borderRadius:'var(--radius)', border:`2px solid ${form.role==='buyer' ? 'var(--brand)' : 'var(--border)'}`, cursor:'pointer', textAlign:'center', fontSize:'13px', fontWeight:600, background: form.role==='buyer' ? 'rgba(26,86,219,0.1)' : 'transparent', transition:'all 0.2s'}}>
                🛒 Buy Products
              </div>
              <div onClick={() => setForm({...form, role:'client'})} 
                style={{flex:1, padding:'12px', borderRadius:'var(--radius)', border:`2px solid ${form.role==='client' ? 'var(--brand)' : 'var(--border)'}`, cursor:'pointer', textAlign:'center', fontSize:'13px', fontWeight:600, background: form.role==='client' ? 'rgba(26,86,219,0.1)' : 'transparent', transition:'all 0.2s'}}>
                📢 Post Ads
              </div>
            </div>
          </div>

          <button 
            onClick={handleRegister}
            disabled={loading}
            style={{width:'100%', background:'var(--brand)', color:'white', padding:'12px', borderRadius:'var(--radius)', border:'none', fontWeight:600, fontSize:'15px', cursor:'pointer', opacity: loading ? 0.7 : 1}}>
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>

          <div style={{textAlign:'center', marginTop:'1.5rem', color:'var(--text2)', fontSize:'13px'}}>
            Already have an account?{' '}
            <Link href="/login" style={{color:'var(--brand)', textDecoration:'none', fontWeight:500}}>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}