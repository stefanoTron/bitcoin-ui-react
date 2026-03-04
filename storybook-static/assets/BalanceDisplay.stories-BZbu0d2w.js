import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as y}from"./iframe-Dtn0yJuT.js";import{B as f}from"./BalanceDisplay-ByzLYAPT.js";import"./preload-helper-PPVm8Dsz.js";import"./BTCAmount-pJks9XaE.js";import"./BitcoinIcon-PqEskw1b.js";import"./SatsIcon-DqQ832G7.js";const B={title:"Components/BalanceDisplay",component:f,tags:["autodocs"],decorators:[a=>e.jsx("div",{style:{fontFamily:"SF Mono, Menlo, monospace",fontSize:32,textAlign:"center",padding:24},children:e.jsx(a,{})})],argTypes:{amount:{control:{type:"number",min:0,max:21e14}},fiatValue:{control:"number"},fiatCode:{control:"text"},activeColor:{control:"color"},labelColor:{control:"color"},showToggle:{control:"boolean"},unit:{control:"select",options:[void 0,"btc","sats","fiat"]}}},t={args:{amount:123456789}},o={args:{amount:123456789,unit:"sats"}},s={args:{amount:1e8,fiatValue:45000.5}},n={args:{amount:1e8,fiatValue:42e3,fiatCode:"EUR",fiatLocale:"de-DE"}},i={args:{amount:5e7,showToggle:!1}},c={render:()=>{const[a,g]=y.useState("btc");return e.jsxs("div",{children:[e.jsx(f,{amount:25e7,fiatValue:112500,unit:a,onUnitChange:g}),e.jsx("div",{style:{marginTop:16,display:"flex",gap:8,justifyContent:"center"},children:["btc","sats","fiat"].map(r=>e.jsx("button",{onClick:()=>g(r),style:{padding:"4px 12px",fontSize:14,border:r===a?"2px solid #f7931a":"1px solid #ccc",borderRadius:4,background:r===a?"#fff8f0":"#fff",cursor:"pointer",fontWeight:r===a?600:400},children:r.toUpperCase()},r))})]})}},d={args:{amount:21e6}},l={render:()=>e.jsx("div",{style:{background:"#1a1a2e",padding:32,borderRadius:8},children:e.jsx(f,{amount:5e8,fiatValue:225e3,activeColor:"#e0e0e0",labelColor:"#666"})})},p={args:{amount:21e14,fiatValue:21e11}},m={args:{amount:0,fiatValue:0}},u={render:()=>e.jsxs("div",{style:{background:"linear-gradient(135deg, #f7931a 0%, #e8820a 100%)",borderRadius:16,padding:"32px 24px",color:"#fff",maxWidth:360,margin:"0 auto"},children:[e.jsx("div",{style:{fontSize:14,fontFamily:"system-ui, sans-serif",marginBottom:8,opacity:.8},children:"My Wallet"}),e.jsx(f,{amount:234567890,fiatValue:10567.32,activeColor:"#fff",labelColor:"rgba(255,255,255,0.7)",style:{fontSize:36}})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 123_456_789
  }
}`,...t.parameters?.docs?.source},description:{story:"Default — tap label to toggle BTC/sats",...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 123_456_789,
    unit: "sats"
  }
}`,...o.parameters?.docs?.source},description:{story:"Starts in sats mode",...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 100_000_000,
    fiatValue: 45000.5
  }
}`,...s.parameters?.docs?.source},description:{story:"With fiat — cycles BTC → sats → USD → BTC",...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 100_000_000,
    fiatValue: 42000,
    fiatCode: "EUR",
    fiatLocale: "de-DE"
  }
}`,...n.parameters?.docs?.source},description:{story:"Euro fiat with German locale",...n.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 50_000_000,
    showToggle: false
  }
}`,...i.parameters?.docs?.source},description:{story:"Static display — no toggle",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [unit, setUnit] = useState<"btc" | "sats" | "fiat">("btc");
    return <div>
        <BalanceDisplay amount={250_000_000} fiatValue={112500} unit={unit} onUnitChange={setUnit} />
        <div style={{
        marginTop: 16,
        display: "flex",
        gap: 8,
        justifyContent: "center"
      }}>
          {(["btc", "sats", "fiat"] as const).map(u => <button key={u} onClick={() => setUnit(u)} style={{
          padding: "4px 12px",
          fontSize: 14,
          border: u === unit ? "2px solid #f7931a" : "1px solid #ccc",
          borderRadius: 4,
          background: u === unit ? "#fff8f0" : "#fff",
          cursor: "pointer",
          fontWeight: u === unit ? 600 : 400
        }}>
              {u.toUpperCase()}
            </button>)}
        </div>
      </div>;
  }
}`,...c.parameters?.docs?.source},description:{story:"Controlled mode — external unit state",...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 21_000_000
  }
}`,...d.parameters?.docs?.source},description:{story:"No fiat — cycles BTC ↔ sats only",...d.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    background: "#1a1a2e",
    padding: 32,
    borderRadius: 8
  }}>
      <BalanceDisplay amount={500_000_000} fiatValue={225000} activeColor="#e0e0e0" labelColor="#666" />
    </div>
}`,...l.parameters?.docs?.source},description:{story:"Dark theme",...l.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 2_100_000_000_000_000,
    fiatValue: 2_100_000_000_000
  }
}`,...p.parameters?.docs?.source},description:{story:"Max supply — 21 million BTC",...p.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 0,
    fiatValue: 0
  }
}`,...m.parameters?.docs?.source},description:{story:"Empty wallet",...m.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    background: "linear-gradient(135deg, #f7931a 0%, #e8820a 100%)",
    borderRadius: 16,
    padding: "32px 24px",
    color: "#fff",
    maxWidth: 360,
    margin: "0 auto"
  }}>
      <div style={{
      fontSize: 14,
      fontFamily: "system-ui, sans-serif",
      marginBottom: 8,
      opacity: 0.8
    }}>
        My Wallet
      </div>
      <BalanceDisplay amount={234_567_890} fiatValue={10567.32} activeColor="#fff" labelColor="rgba(255,255,255,0.7)" style={{
      fontSize: 36
    }} />
    </div>
}`,...u.parameters?.docs?.source},description:{story:"Realistic wallet card",...u.parameters?.docs?.description}}};const j=["Default","Sats","WithFiat","FiatEuro","NoToggle","Controlled","NoFiat","DarkTheme","LargeBalance","ZeroBalance","InACard"];export{c as Controlled,l as DarkTheme,t as Default,n as FiatEuro,u as InACard,p as LargeBalance,d as NoFiat,i as NoToggle,o as Sats,s as WithFiat,m as ZeroBalance,j as __namedExportsOrder,B as default};
