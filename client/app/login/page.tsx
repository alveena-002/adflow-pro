'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed')
      } else {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        if (data.user.role === 'admin') router.push('/admin')
        else if (data.user.role === 'moderator') router.push('/moderator')
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
          <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.8rem'}}>Client Login</h1>
          <p style={{color:'var(--text2)', marginTop:'0.5rem'}}>Login to manage your ads and post new listings</p>
        </div>

        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem'}}>
          
          {error && (
            <div style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'var(--danger)', padding:'10px 14px', borderRadius:'var(--radius)', marginBottom:'1rem', fontSize:'13px'}}>
              {error}
            </div>
          )}

          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} 
            />
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} 
            />
          </div>

          <button 
            onClick={handleLogin}
            disabled={loading}
            style={{width:'100%', background:'var(--brand)', color:'white', padding:'12px', borderRadius:'var(--radius)', border:'none', fontWeight:600, fontSize:'15px', cursor:'pointer', opacity: loading ? 0.7 : 1}}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>

          <div style={{textAlign:'center', marginTop:'1.5rem', color:'var(--text2)', fontSize:'13px'}}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{color:'var(--brand)', textDecoration:'none', fontWeight:500}}>Register here</Link>
          </div>
        </div>

      </div>
    </div>
  )
}