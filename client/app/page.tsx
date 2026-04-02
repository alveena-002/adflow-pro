import Link from 'next/link'

export default function Home() {
  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>

      {/* NAVBAR */}
      <nav style={{background:'rgba(15,23,42,0.95)', borderBottom:'1px solid var(--border)', padding:'0 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px', position:'sticky', top:0, zIndex:100, backdropFilter:'blur(12px)'}}>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <div style={{width:'32px', height:'32px', background:'var(--brand)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'white', fontFamily:'Syne'}}>A</div>
          <span style={{fontFamily:'Syne', fontWeight:700, fontSize:'18px'}}>AdFlow <span style={{color:'var(--brand)'}}>Pro</span></span>
        </div>
        <div style={{display:'flex', gap:'1.5rem', alignItems:'center'}}>
          <Link href="/explore" style={{color:'var(--text2)', textDecoration:'none'}}>Explore Ads</Link>
          <Link href="/packages" style={{color:'var(--text2)', textDecoration:'none'}}>Packages</Link>
          <Link href="/login" style={{color:'var(--text2)', textDecoration:'none'}}>Login</Link>
          <Link href="/register" style={{background:'var(--brand)', color:'white', padding:'8px 16px', borderRadius:'var(--radius)', textDecoration:'none', fontWeight:500}}>Post Ad</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:'5rem 2rem', textAlign:'center', background:'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'}}>
        <div style={{display:'inline-block', background:'rgba(26,86,219,0.15)', border:'1px solid rgba(26,86,219,0.3)', borderRadius:'20px', padding:'6px 16px', marginBottom:'1.5rem', color:'var(--brand)', fontSize:'13px', fontWeight:500}}>
          🚀 Pakistan&apos;s #1 Sponsored Listing Marketplace
        </div>
        <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'3.5rem', lineHeight:1.15, marginBottom:'1.5rem'}}>
          Post Your Ad.<br/>
          <span style={{background:'linear-gradient(90deg, #1a56db, #f59e0b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Reach Real Buyers.</span>
        </h1>
        <p style={{color:'var(--text2)', fontSize:'1.1rem', maxWidth:'550px', margin:'0 auto 2.5rem'}}>
          Submit your listing, get reviewed, go live. Package-based visibility with full moderation control.
        </p>
        <div style={{display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap'}}>
          <Link href="/register" style={{background:'var(--brand)', color:'white', padding:'14px 32px', borderRadius:'var(--radius)', textDecoration:'none', fontWeight:600, fontSize:'16px'}}>
            Post Your Ad →
          </Link>
          <Link href="/explore" style={{background:'var(--bg2)', color:'var(--text)', padding:'14px 32px', borderRadius:'var(--radius)', textDecoration:'none', fontWeight:500, border:'1px solid var(--border)'}}>
            Browse Ads
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section style={{padding:'2rem', display:'flex', justifyContent:'center', gap:'3rem', flexWrap:'wrap', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'var(--bg2)'}}>
        {[['2,400+','Active Listings'],['98%','Approval Rate'],['150+','Categories'],['24hr','Avg Review Time']].map(([num, label]) => (
          <div key={label} style={{textAlign:'center'}}>
            <div style={{fontFamily:'Syne', fontWeight:700, fontSize:'2rem', color:'var(--brand)'}}>{num}</div>
            <div style={{color:'var(--text2)', fontSize:'13px'}}>{label}</div>
          </div>
        ))}
      </section>

      {/* PACKAGES */}
      <section style={{padding:'4rem 2rem', maxWidth:'1100px', margin:'0 auto'}}>
        <h2 style={{fontFamily:'Syne', fontWeight:700, fontSize:'2rem', textAlign:'center', marginBottom:'0.5rem'}}>Choose Your Package</h2>
        <p style={{color:'var(--text2)', textAlign:'center', marginBottom:'3rem'}}>Select a plan that fits your listing needs</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem'}}>
          {[
            {name:'Basic', price:'Free', duration:'7 days', features:['Standard listing','Category placement','1 media URL'], color:'var(--bg3)', badge:''},
            {name:'Standard', price:'PKR 500', duration:'15 days', features:['Category priority','2x visibility weight','Manual refresh'], color:'var(--brand)', badge:'Popular'},
            {name:'Premium', price:'PKR 1200', duration:'30 days', features:['Homepage featured','3x visibility weight','Auto refresh every 3 days'], color:'#7c3aed', badge:'Best Value'},
          ].map((pkg) => (
            <div key={pkg.name} style={{background:'var(--bg2)', border:`1px solid ${pkg.color}40`, borderRadius:'var(--radius)', padding:'2rem', position:'relative'}}>
              {pkg.badge && <div style={{position:'absolute', top:'1rem', right:'1rem', background:pkg.color, color:'white', fontSize:'11px', fontWeight:600, padding:'4px 10px', borderRadius:'20px'}}>{pkg.badge}</div>}
              <div style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.3rem', marginBottom:'0.5rem'}}>{pkg.name}</div>
              <div style={{fontSize:'2rem', fontWeight:700, color:pkg.color, marginBottom:'0.25rem'}}>{pkg.price}</div>
              <div style={{color:'var(--text2)', fontSize:'13px', marginBottom:'1.5rem'}}>{pkg.duration}</div>
              {pkg.features.map(f => (
                <div key={f} style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', color:'var(--text2)', fontSize:'13px'}}>
                  <span style={{color:'var(--success)'}}>✓</span> {f}
                </div>
              ))}
              <Link href="/register" style={{display:'block', marginTop:'1.5rem', background:pkg.color, color:'white', padding:'10px', borderRadius:'var(--radius)', textDecoration:'none', textAlign:'center', fontWeight:500}}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED ADS */}
      <section style={{padding:'4rem 2rem', background:'var(--bg2)'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <h2 style={{fontFamily:'Syne', fontWeight:700, fontSize:'2rem', marginBottom:'0.5rem'}}>Featured Listings</h2>
          <p style={{color:'var(--text2)', marginBottom:'2rem'}}>Top sponsored ads right now</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'1.5rem'}}>
            {[
              {title:'iPhone 15 Pro Max - 256GB', cat:'Electronics', city:'Lahore', price:'PKR 285,000', pkg:'Premium'},
              {title:'2BHK Apartment for Rent', cat:'Real Estate', city:'Karachi', price:'PKR 45,000/mo', pkg:'Standard'},
              {title:'Toyota Corolla 2022', cat:'Vehicles', city:'Islamabad', price:'PKR 4,200,000', pkg:'Premium'},
              {title:'Freelance Web Designer', cat:'Services', city:'Faisalabad', price:'PKR 15,000', pkg:'Standard'},
            ].map((ad) => (
              <div key={ad.title} style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden', cursor:'pointer'}}>
                <div style={{height:'160px', background:'linear-gradient(135deg, var(--bg3), var(--bg2))', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text2)', fontSize:'2rem'}}>🖼</div>
                <div style={{padding:'1rem'}}>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
                    <span style={{background:'rgba(26,86,219,0.15)', color:'var(--brand)', fontSize:'11px', padding:'2px 8px', borderRadius:'20px'}}>{ad.cat}</span>
                    <span style={{background: ad.pkg==='Premium' ? 'rgba(124,58,237,0.2)' : 'rgba(26,86,219,0.15)', color: ad.pkg==='Premium' ? '#a78bfa' : 'var(--brand)', fontSize:'11px', padding:'2px 8px', borderRadius:'20px'}}>{ad.pkg}</span>
                  </div>
                  <div style={{fontWeight:600, marginBottom:'4px', fontSize:'14px'}}>{ad.title}</div>
                  <div style={{color:'var(--text2)', fontSize:'12px', marginBottom:'8px'}}>📍 {ad.city}</div>
                  <div style={{fontWeight:700, color:'var(--accent)'}}>{ad.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'2rem'}}>
            <Link href="/explore" style={{background:'var(--bg3)', color:'var(--text)', padding:'12px 32px', borderRadius:'var(--radius)', textDecoration:'none', border:'1px solid var(--border)'}}>
              View All Ads →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'var(--bg)', borderTop:'1px solid var(--border)', padding:'2rem', textAlign:'center', color:'var(--text2)', fontSize:'13px'}}>
        <div style={{fontFamily:'Syne', fontWeight:700, fontSize:'18px', marginBottom:'1rem'}}>AdFlow <span style={{color:'var(--brand)'}}>Pro</span></div>
        <div style={{display:'flex', justifyContent:'center', gap:'2rem', flexWrap:'wrap', marginBottom:'1rem'}}>
          <Link href="/explore" style={{color:'var(--text2)', textDecoration:'none'}}>Explore</Link>
          <Link href="/packages" style={{color:'var(--text2)', textDecoration:'none'}}>Packages</Link>
          <Link href="/login" style={{color:'var(--text2)', textDecoration:'none'}}>Login</Link>
          <Link href="/register" style={{color:'var(--text2)', textDecoration:'none'}}>Register</Link>
        </div>
        <p>© 2025 AdFlow Pro. All rights reserved.</p>
      </footer>

    </div>
  )
}