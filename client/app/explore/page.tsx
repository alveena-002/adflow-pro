import Navbar from '../components/Navbar'

export default function Explore() {
  const ads = [
    {title:'iPhone 15 Pro Max 256GB', cat:'Electronics', city:'Lahore', price:'PKR 285,000', pkg:'Premium', days:25},
    {title:'2BHK Apartment for Rent', cat:'Real Estate', city:'Karachi', price:'PKR 45,000/mo', pkg:'Standard', days:10},
    {title:'Toyota Corolla 2022', cat:'Vehicles', city:'Islamabad', price:'PKR 4,200,000', pkg:'Premium', days:28},
    {title:'Freelance Web Designer', cat:'Services', city:'Faisalabad', price:'PKR 15,000', pkg:'Standard', days:8},
    {title:'Samsung 55" Smart TV', cat:'Electronics', city:'Multan', price:'PKR 120,000', pkg:'Basic', days:5},
    {title:'Office Space for Rent', cat:'Real Estate', city:'Rawalpindi', price:'PKR 80,000/mo', pkg:'Premium', days:22},
    {title:'Honda Civic 2021', cat:'Vehicles', city:'Lahore', price:'PKR 3,800,000', pkg:'Standard', days:12},
    {title:'Graphic Designer Available', cat:'Services', city:'Karachi', price:'PKR 12,000', pkg:'Basic', days:3},
  ]

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
            <div key={ad.title} style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden', cursor:'pointer', transition:'border-color 0.2s'}}>
              <div style={{height:'160px', background:'linear-gradient(135deg, var(--bg3), var(--bg2))', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text2)', fontSize:'2.5rem'}}>🖼</div>
              <div style={{padding:'1rem'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
                  <span style={{background:'rgba(26,86,219,0.15)', color:'var(--brand)', fontSize:'11px', padding:'2px 8px', borderRadius:'20px'}}>{ad.cat}</span>
                  <span style={{background: ad.pkg==='Premium' ? 'rgba(124,58,237,0.2)' : ad.pkg==='Standard' ? 'rgba(26,86,219,0.15)' : 'rgba(255,255,255,0.05)', color: ad.pkg==='Premium' ? '#a78bfa' : ad.pkg==='Standard' ? 'var(--brand)' : 'var(--text2)', fontSize:'11px', padding:'2px 8px', borderRadius:'20px'}}>{ad.pkg}</span>
                </div>
                <div style={{fontWeight:600, marginBottom:'4px', fontSize:'14px'}}>{ad.title}</div>
                <div style={{color:'var(--text2)', fontSize:'12px', marginBottom:'8px'}}>📍 {ad.city}</div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontWeight:700, color:'var(--accent)'}}>{ad.price}</div>
                  <div style={{color:'var(--text2)', fontSize:'11px'}}>⏱ {ad.days}d left</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}