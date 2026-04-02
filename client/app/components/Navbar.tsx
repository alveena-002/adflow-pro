import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{background:'rgba(15,23,42,0.95)', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'0 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px', position:'sticky', top:0, zIndex:100, backdropFilter:'blur(12px)'}}>
      
      {/* LOGO */}
      <Link href="/" style={{display:'flex', alignItems:'center', gap:'8px', textDecoration:'none'}}>
        <div style={{width:'32px', height:'32px', background:'#1a56db', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'white', fontFamily:'Syne'}}>A</div>
        <span style={{fontFamily:'Syne', fontWeight:700, fontSize:'18px', color:'#f1f5f9'}}>AdFlow <span style={{color:'#1a56db'}}>Pro</span></span>
      </Link>

      {/* LINKS */}
      <div style={{display:'flex', gap:'1.5rem', alignItems:'center'}}>
        <Link href="/" style={{color:'#94a3b8', textDecoration:'none', fontSize:'14px'}}>Home</Link>
        <Link href="/explore" style={{color:'#94a3b8', textDecoration:'none', fontSize:'14px'}}>Explore Ads</Link>
        <Link href="/packages" style={{color:'#94a3b8', textDecoration:'none', fontSize:'14px'}}>Packages</Link>
        <Link href="/login" style={{color:'#94a3b8', textDecoration:'none', fontSize:'14px'}}>Login</Link>
        <Link href="/register" style={{background:'#1a56db', color:'white', padding:'8px 16px', borderRadius:'10px', textDecoration:'none', fontWeight:500, fontSize:'14px'}}>Register</Link>
      </div>

    </nav>
  )
}