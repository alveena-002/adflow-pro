import Navbar from '../components/Navbar'

export default function Admin() {
  const payments = [
    {ad:'iPhone 15 Pro Max', user:'Ali Hassan', pkg:'Premium', amount:'PKR 1,200', method:'JazzCash', ref:'JC-20240415-001', submitted:'1 hour ago'},
    {ad:'2BHK Apartment', user:'Sara Ahmed', pkg:'Standard', amount:'PKR 500', method:'EasyPaisa', ref:'EP-20240415-042', submitted:'3 hours ago'},
    {ad:'Toyota Corolla', user:'Usman Malik', pkg:'Premium', amount:'PKR 1,200', method:'Bank Transfer', ref:'BT-20240414-118', submitted:'5 hours ago'},
  ]

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>

      <Navbar />

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'2rem'}}>

        <div style={{marginBottom:'2rem'}}>
          <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.8rem', marginBottom:'0.25rem'}}>Admin Dashboard</h1>
          <p style={{color:'var(--text2)'}}>Payment verification and system management</p>
        </div>

        {/* STATS */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'1rem', marginBottom:'2rem'}}>
          {[
            {label:'Total Ads', value:'248', color:'var(--brand)'},
            {label:'Active Ads', value:'186', color:'var(--success)'},
            {label:'Pending Payment', value:'12', color:'var(--accent)'},
            {label:'Revenue Today', value:'PKR 8,400', color:'#a78bfa'},
            {label:'Users', value:'94', color:'var(--brand)'},
            {label:'Flagged Ads', value:'3', color:'var(--danger)'},
          ].map((stat) => (
            <div key={stat.label} style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', textAlign:'center'}}>
              <div style={{fontSize:'1.6rem', fontWeight:700, color:stat.color, fontFamily:'Syne'}}>{stat.value}</div>
              <div style={{color:'var(--text2)', fontSize:'12px', marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* PAYMENT QUEUE */}
        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'2rem'}}>
          <div style={{padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--border)'}}>
            <h2 style={{fontFamily:'Syne', fontWeight:600, fontSize:'1rem'}}>Payment Verification Queue</h2>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', fontSize:'13px'}}>
              <thead>
                <tr style={{background:'var(--bg)'}}>
                  {['Ad Title','User','Package','Amount','Method','Ref #','Submitted','Action'].map(h => (
                    <th key={h} style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500, whiteSpace:'nowrap'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.ref} style={{borderTop:'1px solid var(--border)'}}>
                    <td style={{padding:'12px 16px', fontWeight:500}}>{p.ad}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{p.user}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{p.pkg}</td>
                    <td style={{padding:'12px 16px', color:'var(--accent)', fontWeight:600}}>{p.amount}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{p.method}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)', fontFamily:'monospace', fontSize:'11px'}}>{p.ref}</td>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{p.submitted}</td>
                    <td style={{padding:'12px 16px'}}>
                      <div style={{display:'flex', gap:'6px'}}>
                        <button style={{background:'rgba(34,197,94,0.15)', color:'var(--success)', border:'1px solid rgba(34,197,94,0.3)', padding:'5px 10px', borderRadius:'6px', fontSize:'11px', cursor:'pointer', fontWeight:500}}>✓ Verify</button>
                        <button style={{background:'rgba(239,68,68,0.15)', color:'var(--danger)', border:'1px solid rgba(239,68,68,0.3)', padding:'5px 10px', borderRadius:'6px', fontSize:'11px', cursor:'pointer', fontWeight:500}}>✗ Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1rem'}}>
          {[
            {label:'Manage Users', icon:'👥', color:'var(--brand)'},
            {label:'Manage Categories', icon:'📂', color:'var(--accent)'},
            {label:'Manage Packages', icon:'📦', color:'#7c3aed'},
            {label:'System Health', icon:'💚', color:'var(--success)'},
            {label:'Analytics', icon:'📊', color:'#f97316'},
            {label:'Audit Logs', icon:'📋', color:'var(--text2)'},
          ].map((item) => (
            <div key={item.label} style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', display:'flex', alignItems:'center', gap:'12px', cursor:'pointer'}}>
              <span style={{fontSize:'1.5rem'}}>{item.icon}</span>
              <span style={{fontWeight:500, color:item.color}}>{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}