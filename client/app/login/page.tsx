import Link from 'next/link'

export default function Login() {
  return (
    <div style={{minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem'}}>
      <div style={{width:'100%', maxWidth:'420px'}}>
        
        {/* LOGO */}
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
          <div style={{width:'48px', height:'48px', background:'var(--brand)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'white', fontSize:'20px', fontFamily:'Syne', margin:'0 auto 1rem'}}>A</div>
          <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.8rem'}}>Welcome Back</h1>
          <p style={{color:'var(--text2)', marginTop:'0.5rem'}}>Login to your AdFlow Pro account</p>
        </div>

        {/* FORM */}
        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem'}}>
          
          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Email Address</label>
            <input type="email" placeholder="you@example.com" style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', marginBottom:'6px', fontSize:'13px', fontWeight:500}}>Password</label>
            <input type="password" placeholder="••••••••" style={{width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', color:'var(--text)', fontSize:'14px', outline:'none'}} />
          </div>

          <button style={{width:'100%', background:'var(--brand)', color:'white', padding:'12px', borderRadius:'var(--radius)', border:'none', fontWeight:600, fontSize:'15px', cursor:'pointer'}}>
            Login →
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