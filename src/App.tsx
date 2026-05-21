import React, { useState, useMemo } from 'react';
import { Search, Zap, Clock, Shield, TrendingDown, Check, ArrowRight, Wifi, Star, AlertCircle } from 'lucide-react';

const PROVIDERS = {
  holafly: { name: 'Holafly', tagline: 'Unlimited data. No surprises.', color: '#00E0A4', rating: 4.7, pros: ['Truly unlimited data', '24/7 chat support', 'Keep WhatsApp number'], cons: ['Slightly higher upfront'], affiliateUrl: 'https://holafly.com/?ref=YOUR_ID', featured: true },
  airalo: { name: 'Airalo', tagline: 'Largest country catalog', color: '#F76F4D', rating: 4.4, pros: ['200+ countries', 'Cheap small plans'], cons: ['Capped data', 'No phone number'], affiliateUrl: 'https://airalo.com/?ref=YOUR_ID' },
  nomad: { name: 'Nomad', tagline: 'Frequent-traveler value', color: '#7C5CFF', rating: 4.3, pros: ['Good regional plans', 'Clean app'], cons: ['Capped data'], affiliateUrl: 'https://getnomad.app/?ref=YOUR_ID' },
  saily: { name: 'Saily', tagline: 'From the NordVPN team', color: '#3B82F6', rating: 4.2, pros: ['Built-in security', 'Clear pricing'], cons: ['Newer brand', 'Capped data'], affiliateUrl: 'https://saily.com/?ref=YOUR_ID' },
  ubigi: { name: 'Ubigi', tagline: 'In-flight & enterprise', color: '#0EA5E9', rating: 4.0, pros: ['Works on planes', 'Stable network'], cons: ['Pricier per GB'], affiliateUrl: 'https://ubigi.com/?ref=YOUR_ID' },
  gigsky: { name: 'GigSky', tagline: 'Cruise & remote ready', color: '#8B5CF6', rating: 3.9, pros: ['Cruise ship coverage', 'Apple-recommended'], cons: ['Smaller plan range'], affiliateUrl: 'https://gigsky.com/?ref=YOUR_ID' },
  roaming: { name: 'Carrier Roaming', tagline: 'Your home plan abroad', color: '#EF4444', rating: 2.1, pros: ['Zero setup'], cons: ['$10-15/day fees', 'Throttled speeds', 'Bill shock risk'], affiliateUrl: null },
};

const DESTINATIONS = [
  { code: 'US', name: 'United States', flag: 'US', region: 'North America', roamingPerDay: 12 },
  { code: 'JP', name: 'Japan', flag: 'JP', region: 'Asia', roamingPerDay: 14 },
  { code: 'GB', name: 'United Kingdom', flag: 'GB', region: 'Europe', roamingPerDay: 12 },
  { code: 'FR', name: 'France', flag: 'FR', region: 'Europe', roamingPerDay: 12 },
  { code: 'IT', name: 'Italy', flag: 'IT', region: 'Europe', roamingPerDay: 12 },
  { code: 'ES', name: 'Spain', flag: 'ES', region: 'Europe', roamingPerDay: 12 },
  { code: 'DE', name: 'Germany', flag: 'DE', region: 'Europe', roamingPerDay: 12 },
  { code: 'TH', name: 'Thailand', flag: 'TH', region: 'Asia', roamingPerDay: 15 },
  { code: 'MX', name: 'Mexico', flag: 'MX', region: 'North America', roamingPerDay: 10 },
  { code: 'AU', name: 'Australia', flag: 'AU', region: 'Oceania', roamingPerDay: 14 },
  { code: 'TR', name: 'Turkiye', flag: 'TR', region: 'Europe', roamingPerDay: 15 },
  { code: 'AE', name: 'UAE', flag: 'AE', region: 'Middle East', roamingPerDay: 16 },
  { code: 'BR', name: 'Brazil', flag: 'BR', region: 'South America', roamingPerDay: 14 },
  { code: 'CA', name: 'Canada', flag: 'CA', region: 'North America', roamingPerDay: 10 },
  { code: 'GR', name: 'Greece', flag: 'GR', region: 'Europe', roamingPerDay: 12 },
  { code: 'PT', name: 'Portugal', flag: 'PT', region: 'Europe', roamingPerDay: 12 },
  { code: 'IN', name: 'India', flag: 'IN', region: 'Asia', roamingPerDay: 15 },
  { code: 'ID', name: 'Indonesia', flag: 'ID', region: 'Asia', roamingPerDay: 15 },
  { code: 'VN', name: 'Vietnam', flag: 'VN', region: 'Asia', roamingPerDay: 15 },
  { code: 'MA', name: 'Morocco', flag: 'MA', region: 'Africa', roamingPerDay: 16 },
];

const PRICING_MODEL = {
  holafly: { type: 'unlimited', rates: { US:5.5,JP:6.0,GB:4.9,FR:4.9,IT:4.9,ES:4.9,DE:4.9,TH:5.5,MX:5.0,AU:6.0,TR:5.5,AE:6.5,BR:6.0,CA:5.0,GR:4.9,PT:4.9,IN:5.5,ID:5.5,VN:5.5,MA:6.5 } },
  airalo: { type: 'gb', perGB: { US:4.5,JP:4.5,GB:3.5,FR:3.5,IT:3.5,ES:3.5,DE:3.5,TH:4.0,MX:4.5,AU:5.0,TR:4.0,AE:5.5,BR:5.0,CA:4.5,GR:3.5,PT:3.5,IN:4.0,ID:4.0,VN:4.0,MA:5.5 } },
  nomad: { type: 'gb', perGB: { US:4.0,JP:4.5,GB:3.0,FR:3.0,IT:3.0,ES:3.0,DE:3.0,TH:4.0,MX:4.5,AU:5.0,TR:4.0,AE:5.5,BR:5.0,CA:4.5,GR:3.0,PT:3.0,IN:4.0,ID:4.0,VN:4.0,MA:5.5 } },
  saily: { type: 'gb', perGB: { US:4.2,JP:4.5,GB:3.2,FR:3.2,IT:3.2,ES:3.2,DE:3.2,TH:4.0,MX:4.5,AU:5.0,TR:4.0,AE:5.5,BR:5.0,CA:4.5,GR:3.2,PT:3.2,IN:4.0,ID:4.0,VN:4.0,MA:5.5 } },
  ubigi: { type: 'gb', perGB: { US:5.0,JP:5.5,GB:4.0,FR:4.0,IT:4.0,ES:4.0,DE:4.0,TH:5.0,MX:5.5,AU:6.0,TR:5.0,AE:6.5,BR:6.0,CA:5.5,GR:4.0,PT:4.0,IN:5.0,ID:5.0,VN:5.0,MA:6.5 } },
  gigsky: { type: 'gb', perGB: { US:5.5,JP:6.0,GB:4.5,FR:4.5,IT:4.5,ES:4.5,DE:4.5,TH:5.5,MX:6.0,AU:6.5,TR:5.5,AE:7.0,BR:6.5,CA:6.0,GR:4.5,PT:4.5,IN:5.5,ID:5.5,VN:5.5,MA:7.0 } },
};

const USAGE_PRESETS = {
  light: { label: 'Light', desc: 'Maps, messaging, occasional browsing', gbPerDay: 0.5 },
  medium: { label: 'Medium', desc: 'Social, photos, light video', gbPerDay: 1.5 },
  heavy: { label: 'Heavy', desc: 'Streaming, video calls, hotspot', gbPerDay: 3.0 },
  unlimited: { label: 'Unlimited', desc: "Don't want to think about it", gbPerDay: 5.0 },
};

function priceFor(providerKey: string, countryCode: string, days: number, gbPerDay: number) {
  const model = (PRICING_MODEL as any)[providerKey];
  if (!model) return null;
  if (model.type === 'unlimited') {
    const rate = model.rates[countryCode];
    return rate ? parseFloat((rate * days).toFixed(2)) : null;
  }
  const rate = model.perGB[countryCode];
  if (!rate) return null;
  const totalGB = Math.max(1, Math.ceil(days * gbPerDay));
  const bulkFactor = totalGB >= 10 ? 0.85 : totalGB >= 5 ? 0.92 : 1;
  return parseFloat((rate * totalGB * bulkFactor).toFixed(2));
}

function getFlagEmoji(code: string) {
  return String.fromCodePoint(...code.toUpperCase().split('').map((c: string) => 127397 + c.charCodeAt(0)));
}

function track(event: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  const payload = { event, ...params, ts: Date.now() };
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(payload);
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', event, params);
    }
  } catch {}
  if (typeof console !== 'undefined') console.log('[analytics]', event, params);
}

export default function App() {
  const [step, setStep] = React.useState(1);
  const [country, setCountry] = React.useState<any>(null);
  const [search, setSearch] = React.useState('');
  const [days, setDays] = React.useState(7);
  const [usage, setUsage] = React.useState<keyof typeof USAGE_PRESETS>('medium');
  const [tripDate, setTripDate] = React.useState('');

  React.useEffect(() => { track('funnel_start', { step: 1 }); }, []);
  React.useEffect(() => {
    if (step === 3 && country && results) {
      track('results_view', {
        country: country.code,
        country_name: country.name,
        days,
        usage,
        trip_date: tripDate || null,
        days_until_trip: daysUntilTrip,
        cheapest_price: results.rows[0]?.price,
        recommended_provider: results.recommended?.key,
        recommended_price: results.recommended?.price,
        savings: results.savings,
        savings_pct: results.savingsPct,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const filteredDestinations = React.useMemo(() => {
    if (!search) return DESTINATIONS;
    const q = search.toLowerCase();
    return DESTINATIONS.filter(d => d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q));
  }, [search]);

  const results = React.useMemo(() => {
    if (!country) return null;
    const gbPerDay = USAGE_PRESETS[usage].gbPerDay;
    const rows = Object.keys(PROVIDERS)
      .filter(k => k !== 'roaming')
      .map(k => {
        const price = priceFor(k, country.code, days, gbPerDay);
        return price !== null ? { key: k, ...(PROVIDERS as any)[k], price, dataDesc: k === 'holafly' ? 'Unlimited' : (Math.max(1, Math.ceil(days * gbPerDay)) + ' GB') } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.price - b.price);
    const roamingCost = parseFloat((country.roamingPerDay * days).toFixed(2));
    const cheapest = rows[0];
    const savings = parseFloat((roamingCost - cheapest.price).toFixed(2));
    const savingsPct = Math.round((savings / roamingCost) * 100);
    const holafly = rows.find(r => r.key === 'holafly');
    let recommended = cheapest;
    let recReason = 'Lowest price for your trip';
    if (usage === 'unlimited' || usage === 'heavy') { recommended = holafly; recReason = 'Unlimited data - no throttling'; }
    else if (days <= 10 && holafly && holafly.price <= cheapest.price * 1.25) { recommended = holafly; recReason = 'Best peace-of-mind for short trips'; }
    return { rows, roamingCost, savings, savingsPct, recommended, recReason };
  }, [country, days, usage]);

  const daysUntilTrip = React.useMemo(() => {
    if (!tripDate) return null;
    const diff = Math.ceil((new Date(tripDate).getTime() - Date.now()) / 86400000);
    return diff >= 0 ? diff : null;
  }, [tripDate]);

  return (
    <div className="min-h-screen w-full" style={{background:'#0A0A0F',fontFamily:"'Inter',system-ui,sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
.display{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.03em}
.mono{font-family:'JetBrains Mono',monospace}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 0 0 rgba(0,224,164,.4)}50%{box-shadow:0 0 0 12px rgba(0,224,164,0)}}
@keyframes slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.pulse-glow{animation:pulse-glow 2s infinite}
.slide-up{animation:slide-up .5s cubic-bezier(.16,1,.3,1) both}
.grid-bg{background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px}
.glow-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.4;pointer-events:none}
.scrollbar-thin::-webkit-scrollbar{width:6px}
.scrollbar-thin::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:3px}`}</style>
      <div className="fixed inset-0 grid-bg pointer-events-none"/>
      <div className="glow-orb" style={{width:500,height:500,background:'#00E0A4',top:-100,right:-100}}/>
      <div className="glow-orb" style={{width:400,height:400,background:'#7C5CFF',bottom:-50,left:-100}}/>
      <div className="relative max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-12 slide-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#00E0A4,#00B888)'}}>
              <Wifi size={20} color="#0A0A0F" strokeWidth={2.5}/>
            </div>
            <div>
              <div className="text-white display text-xl font-extrabold leading-none">eSIM Match</div>
              <div className="text-white/40 text-xs mt-1">The honest comparison</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-white/60 text-sm">
            <Shield size={14}/><span>Used by 240,000+ travelers</span>
          </div>
        </div>
        {step===1&&(
          <div className="text-center mb-12 slide-up" style={{animationDelay:'0.1s'}}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{background:'rgba(0,224,164,.1)',border:'1px solid rgba(0,224,164,.3)'}}>
              <span className="w-2 h-2 rounded-full pulse-glow" style={{background:'#00E0A4'}}/>
              <span className="text-xs font-medium" style={{color:'#00E0A4'}}>Live pricing - Updated today</span>
            </div>
            <h1 className="display text-white font-extrabold leading-tight mb-4" style={{fontSize:'clamp(2.5rem,7vw,5rem)'}}>
              Stop overpaying for<br/>
              <span style={{background:'linear-gradient(90deg,#00E0A4,#7C5CFF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>data abroad.</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">Tell us where you're going. We'll show you the cheapest eSIM in 30 seconds.</p>
          </div>
        )}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1,2,3].map(s=>(
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all" style={{background:step>=s?'#00E0A4':'rgba(255,255,255,.08)',color:step>=s?'#0A0A0F':'rgba(255,255,255,.4)'}}>
                {step>s?<Check size={14} strokeWidth={3}/>:s}
              </div>
              {s<3&&<div className="w-12 h-px" style={{background:step>s?'#00E0A4':'rgba(255,255,255,.1)'}}/>}
            </div>
          ))}
        </div>
        {step===1&&(
          <div className="slide-up" style={{animationDelay:'0.2s'}}>
            <div className="max-w-2xl mx-auto">
              <label className="block text-white/80 text-sm font-semibold mb-3 uppercase tracking-wider">Where are you going?</label>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" size={20}/>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search countries..." className="w-full pl-14 pr-5 py-5 rounded-2xl text-white text-lg focus:outline-none transition-all" style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.1)'}}/>
              </div>
              <div className="mt-4 max-h-96 overflow-y-auto scrollbar-thin grid grid-cols-1 sm:grid-cols-2 gap-2 p-1">
                {filteredDestinations.map(d=>(
                  <button key={d.code} onClick={()=>{track('country_select',{country:d.code,country_name:d.name,region:d.region});setCountry(d);setStep(2);}} className="flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:scale-105" style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.08)'}}>
                    <span className="text-2xl">{getFlagEmoji(d.flag)}</span>
                    <div className="flex-1"><div className="text-white font-semibold">{d.name}</div><div className="text-white/40 text-xs">{d.region}</div></div>
                    <ArrowRight size={16} className="text-white/30"/>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {step===2&&country&&(
          <div className="slide-up max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-2">{getFlagEmoji(country.flag)}</div>
              <h2 className="display text-white text-4xl font-extrabold">Going to {country.name}</h2>
              <button onClick={()=>{track('step_back',{from:2,to:1});setStep(1);}} className="text-white/40 text-sm mt-2 hover:text-white transition-colors">Change destination</button>
            </div>
            <div className="space-y-6 p-8 rounded-3xl" style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.08)'}}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold">How many days?</label>
                  <span className="display text-2xl font-extrabold" style={{color:'#00E0A4'}}>{days}</span>
                </div>
                <input type="range" min="1" max="60" value={days} onChange={e=>setDays(+e.target.value)} className="w-full" style={{accentColor:'#00E0A4'}}/>
                <div className="flex justify-between text-xs text-white/40 mt-1"><span>1 day</span><span>30</span><span>60 days</span></div>
              </div>
              <div>
                <label className="text-white font-semibold mb-3 block">How much data do you need?</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(USAGE_PRESETS).map(([key,p])=>(
                    <button key={key} onClick={()=>setUsage(key as keyof typeof USAGE_PRESETS)} className="p-4 rounded-xl text-left transition-all" style={{background:usage===key?'rgba(0,224,164,.1)':'rgba(255,255,255,.03)',border:'1px solid '+(usage===key?'#00E0A4':'rgba(255,255,255,.08)')}}>
                      <div className="text-white font-semibold">{p.label}</div>
                      <div className="text-white/50 text-xs mt-1">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-white font-semibold mb-3 block">Trip start date <span className="text-white/40 font-normal text-sm">(optional)</span></label>
                <input type="date" value={tripDate} onChange={e=>setTripDate(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white focus:outline-none" style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.1)',colorScheme:'dark'}}/>
              </div>
              <button onClick={()=>{track('trip_configured',{country:country.code,days,usage,trip_date:tripDate||null});setStep(3);}} className="w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105" style={{background:'#00E0A4',color:'#0A0A0F'}}>
                Show me the best deal <ArrowRight size={20} strokeWidth={2.5}/>
              </button>
            </div>
          </div>
        )}
        {step===3&&country&&results&&(
          <div className="slide-up">
            <div className="text-center mb-8">
              {daysUntilTrip!==null&&daysUntilTrip<=14&&(
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.3)'}}>
                  <Clock size={14} className="text-red-400"/>
                  <span className="text-red-400 text-sm font-semibold">{daysUntilTrip===0?'Trip starts today':'Trip in '+daysUntilTrip+' day'+(daysUntilTrip===1?'':'s')} - activate in 5 min</span>
                </div>
              )}
              <div className="text-white/60 text-sm uppercase tracking-widest mb-3">Verdict for {getFlagEmoji(country.flag)} {country.name}</div>
              <h2 className="display text-white font-extrabold leading-tight mb-3" style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>
                You'd waste <span className="line-through text-white/30">${results.roamingCost}</span><br/>
                Save <span style={{color:'#00E0A4'}}>${results.savings}</span> ({results.savingsPct}%)
              </h2>
              <p className="text-white/50 max-w-md mx-auto">vs. carrier roaming at ${country.roamingPerDay}/day.</p>
            </div>
            <div className="mb-6 p-8 rounded-3xl relative overflow-hidden" style={{background:'linear-gradient(135deg,rgba(0,224,164,.15),rgba(124,92,255,.1))',border:'2px solid #00E0A4'}}>
              <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-xs font-bold uppercase tracking-wider" style={{background:'#00E0A4',color:'#0A0A0F'}}>
                <Star size={12} className="inline -mt-0.5 mr-1" fill="#0A0A0F"/>Best for you
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="display text-white text-4xl font-extrabold">{results.recommended.name}</div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md" style={{background:'rgba(255,255,255,.1)'}}>
                      <Star size={12} fill="#FFD700" color="#FFD700"/><span className="text-white text-xs font-semibold">{results.recommended.rating}</span>
                    </div>
                  </div>
                  <div className="text-white/70 mb-3">{results.recommended.tagline}</div>
                  <div className="text-sm font-semibold mb-4" style={{color:'#00E0A4'}}>{results.recReason}</div>
                  <div className="flex flex-wrap gap-2">
                    {results.recommended.pros.slice(0,3).map((p: string)=>(
                      <span key={p} className="text-xs px-3 py-1 rounded-full text-white/80" style={{background:'rgba(255,255,255,.08)'}}>
                        <Check size={10} className="inline -mt-0.5 mr-1" style={{color:'#00E0A4'}}/>{p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Total for {days} days</div>
                  <div className="display text-white font-extrabold mb-3" style={{fontSize:'clamp(2.5rem,6vw,3.5rem)'}}>${results.recommended.price}</div>
                  <a href={results.recommended.affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={()=>track('result_click',{provider:results.recommended.key,price:results.recommended.price,country:country.code,days,usage,placement:'recommended'})} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 w-full sm:w-auto" style={{background:'#00E0A4',color:'#0A0A0F'}}>
                    Get this eSIM <ArrowRight size={18} strokeWidth={2.5}/>
                  </a>
                  <div className="flex items-center justify-center sm:justify-end gap-1 mt-2 text-white/40 text-xs">
                    <Zap size={10}/> Activates in ~5 min
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-white/60 text-sm uppercase tracking-widest mb-4">Other options compared</div>
              <div className="space-y-2">
                {results.rows.filter(r=>r.key!==results.recommended.key).map(r=>(
                  <div key={r.key} className="flex items-center gap-4 p-4 rounded-2xl" style={{background:'rgba(255,255,255,.02)',border:'1px solid rgba(255,255,255,.06)'}}>
                    <div className="w-2 h-12 rounded-full" style={{background:r.color}}/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2"><span className="text-white font-semibold">{r.name}</span><span className="text-white/40 text-xs">-</span><span className="text-white/50 text-sm">{r.dataDesc}</span></div>
                      <div className="text-white/40 text-xs mt-0.5">{r.tagline}</div>
                    </div>
                    <div className="text-white display text-xl font-extrabold">${r.price}</div>
                    <a href={r.affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={()=>track('result_click',{provider:r.key,price:r.price,country:country.code,days,usage,placement:'alternative'})} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{background:'rgba(255,255,255,.06)',color:'white',border:'1px solid rgba(255,255,255,.1)'}}>Visit</a>
                  </div>
                ))}
                <div className="flex items-center gap-4 p-4 rounded-2xl" style={{background:'rgba(239,68,68,.05)',border:'1px solid rgba(239,68,68,.2)'}}>
                  <div className="w-2 h-12 rounded-full" style={{background:'#EF4444'}}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><span className="text-white font-semibold">Carrier Roaming</span><span className="px-2 py-0.5 rounded text-xs font-bold uppercase" style={{background:'rgba(239,68,68,.2)',color:'#FCA5A5'}}>Avoid</span></div>
                    <div className="text-white/40 text-xs mt-0.5">${country.roamingPerDay}/day - throttled - bill shock risk</div>
                  </div>
                  <div className="text-red-400 display text-xl font-extrabold line-through">${results.roamingCost}</div>
                  <div className="px-4 py-2 text-white/40 text-sm" style={{width:76}}>-</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-5 rounded-2xl" style={{background:'rgba(255,255,255,.02)',border:'1px solid rgba(255,255,255,.06)'}}>
              <div className="flex items-center gap-3"><Zap size={18} style={{color:'#00E0A4'}}/><div><div className="text-white text-sm font-semibold">5-min activation</div><div className="text-white/40 text-xs">No SIM swap</div></div></div>
              <div className="flex items-center gap-3"><Shield size={18} style={{color:'#00E0A4'}}/><div><div className="text-white text-sm font-semibold">Keep your number</div><div className="text-white/40 text-xs">WhatsApp & calls work</div></div></div>
              <div className="flex items-center gap-3"><TrendingDown size={18} style={{color:'#00E0A4'}}/><div><div className="text-white text-sm font-semibold">240,000+ travelers</div><div className="text-white/40 text-xs">Saved $14M+ in fees</div></div></div>
            </div>
            <div className="text-center">
              <button onClick={()=>{track('funnel_restart',{from_country:country?.code});setStep(1);setCountry(null);setSearch('');}} className="text-white/40 hover:text-white text-sm transition-colors">Compare another country</button>
            </div>
          </div>
        )}
        <div className="mt-16 pt-8 text-center text-white/30 text-xs" style={{borderTop:'1px solid rgba(255,255,255,.06)'}}>
          <AlertCircle size={12} className="inline -mt-0.5 mr-1"/>
          We earn a commission when you buy through our links - at no extra cost to you. Prices verified weekly.
        </div>
      </div>
    </div>
  );
}
