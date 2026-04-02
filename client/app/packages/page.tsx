import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Packages() {
  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>

      <Navbar />

      <div style={{maxWidth:'1000px', margin:'0 auto', padding:'4rem 2rem'}}>
        <div style={{textAlign:'center', marginBottom:'3rem'}}>
          <h1 style={{fontFamily:'Syne', fontWeight:700, fontSize:'2.5rem', marginBottom:'1rem'}}>Listing Packages</h1>
          <p style={{color:'var(--text2)', fontSize:'1rem', maxWidth:'500px', margin:'0 auto'}}>Choose the right plan for your listing. All packages include full moderation review.</p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'2rem', marginBottom:'4rem'}}>
          {[
            {name:'Basic', price:'Free', duration:'7 days', weight:'1x', homepage:false, refresh:'None', color:'var(--bg3)', badge:'', features:['Standard listing placement','Category browsing visibility','1 media URL allowed','Email notification on approval','Community support']},
            {name:'Standard', price:'PKR 500', duration:'15 days', weight:'2x', homepage:false, refresh:'Manual', color:'var(--brand)', badge:'Most Popular', features:['Category priority placement','2x visibility ranking weight','3 media URLs allowed','Manual listing refresh','Priority email support']},
            {name:'Premium', price:'PKR 1,200', duration:'30 days', weight:'3x', homepage:true, refresh:'Auto (every 3 days)', color:'#7c3aed', badge:'Best Value', features:['Homepage featured placement','3x visibility ranking weight','5 media URLs allowed','Auto refresh every 3 days','Dedicated support','Verified seller badge']},
          ].map((pkg) => (
            <div key={pkg.name} style={{background:'var(--bg2)', border:`2px solid ${pkg.color}40`, borderRadius:'var(--radius)', padding:'2rem', position:'relative', display:'flex', flexDirection:'column'}}>
              {pkg.badge && <div style={{position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)', background:pkg.color, color:'white', fontSize:'11px', fontWeight:700, padding:'4px 16px', borderRadius:'20px', whiteSpace:'nowrap'}}>{pkg.badge}</div>}
              <div style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.4rem', marginBottom:'0.5rem'}}>{pkg.name}</div>
              <div style={{fontSize:'2.2rem', fontWeight:700, color:pkg.color, marginBottom:'0.25rem'}}>{pkg.price}</div>
              <div style={{color:'var(--text2)', fontSize:'13px', marginBottom:'1.5rem', paddingBottom:'1.5rem', borderBottom:'1px solid var(--border)'}}>
                {pkg.duration} duration · {pkg.weight} weight
              </div>
              <div style={{flex:1}}>
                {pkg.features.map(f => (
                  <div key={f} style={{display:'flex', alignItems:'flex-start', gap:'8px', marginBottom:'10px', fontSize:'13px', color:'var(--text2)'}}>
                    <span style={{color:'var(--success)', marginTop:'1px', flexShrink:0}}>✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/register" style={{display:'block', marginTop:'1.5rem', background:pkg.color, color:'white', padding:'12px', borderRadius:'var(--radius)', textDecoration:'none', textAlign:'center', fontWeight:600}}>
                Choose {pkg.name}
              </Link>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden'}}>
          <div style={{padding:'1.5rem', borderBottom:'1px solid var(--border)'}}>
            <h2 style={{fontFamily:'Syne', fontWeight:700, fontSize:'1.3rem'}}>Package Comparison</h2>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', fontSize:'13px'}}>
              <thead>
                <tr style={{background:'var(--bg)'}}>
                  <th style={{padding:'12px 16px', textAlign:'left', color:'var(--text2)', fontWeight:500}}>Feature</th>
                  <th style={{padding:'12px 16px', textAlign:'center', color:'var(--text2)', fontWeight:500}}>Basic</th>
                  <th style={{padding:'12px 16px', textAlign:'center', color:'var(--brand)', fontWeight:500}}>Standard</th>
                  <th style={{padding:'12px 16px', textAlign:'center', color:'#a78bfa', fontWeight:500}}>Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Duration','7 days','15 days','30 days'],
                  ['Visibility Weight','1x','2x','3x'],
                  ['Homepage Featured','✗','✗','✓'],
                  ['Media URLs','1','3','5'],
                  ['Auto Refresh','✗','✗','✓'],
                  ['Price','Free','PKR 500','PKR 1,200'],
                ].map(([feature, basic, standard, premium]) => (
                  <tr key={feature} style={{borderTop:'1px solid var(--border)'}}>
                    <td style={{padding:'12px 16px', color:'var(--text2)'}}>{feature}</td>
                    <td style={{padding:'12px 16px', textAlign:'center'}}>{basic}</td>
                    <td style={{padding:'12px 16px', textAlign:'center', color:'var(--brand)'}}>{standard}</td>
                    <td style={{padding:'12px 16px', textAlign:'center', color:'#a78bfa'}}>{premium}</td>
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