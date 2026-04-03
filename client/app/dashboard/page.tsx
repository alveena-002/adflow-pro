import Link from 'next/link'

export default function Dashboard() {
  const ads = [
    {title:'iPhone 15 Pro Max', status:'Active', pkg:'Premium', views:245, expires:'Apr 28, 2025'},
    {title:'Toyota Corolla 2022', status:'Under Review', pkg:'Standard', views:0, expires:'-'},
    {title:'Office Chair for Sale', status:'Payment Pending', pkg:'Basic', views:0, expires:'-'},
    {title:'Samsung TV 55"', status:'Expired', pkg:'Basic', views:89, expires:'Mar 15, 2025'},
    {title:'Freelance Services', status:'Rejected', pkg:'Standard', views:0, expires:'-'},
  ]

  const statusColor: Record<string, string> = {
    'Active':'var(--success)',
    'Under Review':'var(--accent)',
    'Payment Pending':'#f97316',
    'Expired':'var(--text2)',
    'Rejected':'var(--danger)',
  }

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>

      {/* NAVBAR */}
      <nav style={{background:'rgba(15,23,42,0.95)', borderBottom:'1px solid var(--border)', padding:'0 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px', position:'sticky', top:0, zIndex:100, backdropFilter:'blur(12px)'}}>
        <Link href="/" style={{display:'flex', alignItems:'center', gap:'8px', textDecoration:'none'}}>
          <div style={{width:'32px', height:'32px', background:'var(--brand)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'white', fontFamily:'Syne'}}>A</div>
          <span style={{fontFamily:'Syne', fontWeight:700, fontSize:'18px', color:'var(--text)'}}>AdFlow <span style={{color:'var(--brand)'}}>Pro</span></span>
        </Link>
        <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
          <span style={{color:'var(--text2)', fontSize:'13px'}}>👤 Alveena Kamal</span>
          <Link href="/login" style={{color:'var(--text2)', textDecoration:'none', fontSize:'13px'}}>Logout</Link>
        </div>
      </nav>

      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'2rem'}}>

        {/* HEADER */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.8rem', marginBottom:'0.25rem'}}>My Dashboard</h1>
            <p style={{color:'var(--text2)'}}>Manage your listings and track performance</p>
          </div>
          <Link href="/dashboard/create" style={{background:'var(--brand)', color:'white', padding:'10px 20px', borderRadius:'var(--radius)', textDecoration:'none', fontWeight:600}}>
            + Post New Ad
          </Link>
        </div>

        {/* STATS */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'1rem', marginBottom:'2rem'}}>
          {[
            {label:'Total Ads', value:'5', color:'var(--brand)'},
            {label:'Active', value:'1', color:'var(--success)'},
            {label:'Under Review', value:'1', color:'var(--accent)'},
            {label:'Expired', value:'1', color:'var(--text2)'},
            {label:'Rejected', value:'1', color:'var(--danger)'},
          ].map((stat) => (
            <div key={stat.label} style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', textAlign:'center'}}>
              <div style={{fontSize:'2rem', fontWeight:700, color:stat.color, fontFamily:'Syne'}}>{stat.value}</div>
              <div style={{color:'var(--text2)', fontSize:'12px', marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ADS TABLE */}
        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden'}}>
          <div style={{padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 style={{fontFamily:'Syne', fontWeight:600, fontSize:'1rem'}}>My Listings</h2>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', fontSize:'13px'}}>
              <thead>
                <tr style={{background:'var(--bg)'}}>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Ad Title</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Package</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Status</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Views</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Expires</th>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad.title} style={{borderTop:'1px solid var(--border)'}}>
                    <td style={{padding:'12px 16px', fontWeight:500}}>{ad.title}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{ad.pkg}</td>
                    <td style={{padding:'12px 16px'}}>
                      <span style={{background:`${statusColor[ad.status]}20`, color:statusColor[ad.status], fontSize:'11px', padding:'3px 10px', borderRadius:'20px', fontWeight:500}}>{ad.status}</span>
                    </td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{ad.views}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{ad.expires}</td>
                    <td style={{padding:'12px 16px'}}>
                      <button style={{background:'var(--bg3)', color:'var(--text)', border:'none', padding:'5px 12px', borderRadius:'6px', fontSize:'12px', cursor:'pointer'}}>Edit</button>
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