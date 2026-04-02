import Navbar from '../components/Navbar'

export default function Moderator() {
  const queue = [
    {title:'iPhone 15 Pro Max 256GB', user:'Ali Hassan', cat:'Electronics', city:'Lahore', pkg:'Premium', submitted:'2 hours ago'},
    {title:'2BHK Apartment Gulberg', user:'Sara Ahmed', cat:'Real Estate', city:'Lahore', pkg:'Standard', submitted:'4 hours ago'},
    {title:'Toyota Corolla 2022', user:'Usman Malik', cat:'Vehicles', city:'Islamabad', pkg:'Premium', submitted:'6 hours ago'},
    {title:'Freelance Logo Designer', user:'Fatima Khan', cat:'Services', city:'Karachi', pkg:'Basic', submitted:'8 hours ago'},
    {title:'Samsung 55" Smart TV', user:'Bilal Raza', cat:'Electronics', city:'Multan', pkg:'Basic', submitted:'1 day ago'},
  ]

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>

      <Navbar />

      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'2rem'}}>

        <div style={{marginBottom:'2rem'}}>
          <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.8rem', marginBottom:'0.25rem'}}>Moderation Queue</h1>
          <p style={{color:'var(--text2)'}}>Review submitted ads for content quality and policy compliance</p>
        </div>

        {/* STATS */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'1rem', marginBottom:'2rem'}}>
          {[
            {label:'Pending Review', value:'5', color:'var(--accent)'},
            {label:'Approved Today', value:'12', color:'var(--success)'},
            {label:'Rejected Today', value:'3', color:'var(--danger)'},
            {label:'Avg Review Time', value:'2.4h', color:'var(--brand)'},
          ].map((stat) => (
            <div key={stat.label} style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', textAlign:'center'}}>
              <div style={{fontSize:'2rem', fontWeight:700, color:stat.color, fontFamily:'Syne'}}>{stat.value}</div>
              <div style={{color:'var(--text2)', fontSize:'12px', marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* REVIEW CARDS */}
        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          {queue.map((ad) => (
            <div key={ad.title} style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
              <div style={{flex:1}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px', flexWrap:'wrap'}}>
                  <span style={{fontWeight:600, fontSize:'15px'}}>{ad.title}</span>
                  <span style={{background:'rgba(26,86,219,0.15)', color:'var(--brand)', fontSize:'11px', padding:'2px 8px', borderRadius:'20px'}}>{ad.cat}</span>
                  <span style={{background:'rgba(255,255,255,0.05)', color:'var(--text2)', fontSize:'11px', padding:'2px 8px', borderRadius:'20px'}}>{ad.pkg}</span>
                </div>
                <div style={{color:'var(--text2)', fontSize:'13px'}}>
                  👤 {ad.user} · 📍 {ad.city} · 🕐 {ad.submitted}
                </div>
              </div>
              <div style={{display:'flex', gap:'8px', flexShrink:0}}>
                <button style={{background:'rgba(34,197,94,0.15)', color:'var(--success)', border:'1px solid rgba(34,197,94,0.3)', padding:'8px 16px', borderRadius:'var(--radius)', fontSize:'13px', cursor:'pointer', fontWeight:500}}>
                  ✓ Approve
                </button>
                <button style={{background:'rgba(239,68,68,0.15)', color:'var(--danger)', border:'1px solid rgba(239,68,68,0.3)', padding:'8px 16px', borderRadius:'var(--radius)', fontSize:'13px', cursor:'pointer', fontWeight:500}}>
                  ✗ Reject
                </button>
                <button style={{background:'var(--bg3)', color:'var(--text)', border:'none', padding:'8px 16px', borderRadius:'var(--radius)', fontSize:'13px', cursor:'pointer'}}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}