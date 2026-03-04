import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as n}from"./iframe-Dtn0yJuT.js";import{S as s}from"./SeedPhraseInput-BI4ZayuE.js";import"./preload-helper-PPVm8Dsz.js";const E={title:"Components/SeedPhraseInput",component:s,tags:["autodocs"],decorators:[r=>e.jsx("div",{style:{fontFamily:"system-ui, sans-serif",fontSize:14,maxWidth:480},children:e.jsx(r,{})})],argTypes:{wordCount:{control:"select",options:[12,24]},columns:{control:"select",options:[2,3,4]},readOnly:{control:"boolean"}}},v=["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident"],A=["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual"],i={render:()=>{const[r,o]=n.useState(Array(12).fill(""));return e.jsx(s,{words:r,onWordsChange:o})}},l={render:()=>{const[r,o]=n.useState(Array(24).fill(""));return e.jsx(s,{words:r,onWordsChange:o,wordCount:24})}},c={render:()=>{const r=Array(12).fill("");r[0]="abandon",r[1]="ability",r[2]="able";const[o,t]=n.useState(r);return e.jsx(s,{words:o,onWordsChange:t})}},p={render:()=>{const[r,o]=n.useState([...v]),[t,d]=n.useState("");return e.jsxs("div",{children:[e.jsx(s,{words:r,onWordsChange:o,onComplete:()=>d("All words valid!")}),t&&e.jsx("p",{style:{color:"#16a34a",fontWeight:600,marginTop:12},children:t})]})}},u={render:()=>e.jsx(s,{words:v,onWordsChange:()=>{},readOnly:!0})},m={render:()=>e.jsx(s,{words:A,onWordsChange:()=>{},wordCount:24,readOnly:!0})},y={render:()=>{const[r,o]=n.useState([...v]);return e.jsx(s,{words:r,onWordsChange:o,columns:3})}},g={render:()=>{const[r,o]=n.useState([...A]);return e.jsx("div",{style:{maxWidth:640},children:e.jsx(s,{words:r,onWordsChange:o,wordCount:24,columns:4})})}},f={render:()=>{const[r,o]=n.useState(Array(12).fill(""));return e.jsxs("div",{children:[e.jsx("p",{style:{color:"#666",marginBottom:12},children:"Start typing in any field to see BIP39 autocomplete suggestions."}),e.jsx(s,{words:r,onWordsChange:o})]})}},h={render:()=>{const[r,o]=n.useState(Array(12).fill("")),[t,d]=n.useState(!1),a=r.filter(j=>j!=="").length;return e.jsxs("div",{children:[e.jsx(s,{words:r,onWordsChange:j=>{o(j),d(!1)},onComplete:()=>d(!0)}),e.jsxs("div",{style:{marginTop:12,display:"flex",alignItems:"center",gap:8},children:[e.jsxs("span",{style:{color:"#666"},children:[a,"/12 words entered"]}),t&&e.jsx("span",{style:{color:"#16a34a",fontWeight:600},children:"Complete!"})]})]})}},S={render:()=>{const[r,o]=n.useState(Array(12).fill(""));return e.jsxs("div",{style:{background:"#1a1a2e",padding:24,borderRadius:8,color:"#e0e0e0"},children:[e.jsx("h3",{style:{margin:"0 0 16px",fontSize:16,fontWeight:600},children:"Recovery Phrase"}),e.jsx(s,{words:r,onWordsChange:o,inputStyle:{background:"#16213e",border:"1px solid #333",borderRadius:6,color:"#e0e0e0"},dropdownStyle:{background:"#16213e",border:"1px solid #333",color:"#e0e0e0"}})]})}},w={render:()=>{const[r,o]=n.useState(Array(12).fill("")),[t,d]=n.useState(!1);return e.jsxs("form",{onSubmit:a=>a.preventDefault(),children:[e.jsx("h3",{style:{margin:"0 0 4px",fontSize:18,fontWeight:600},children:"Recover Wallet"}),e.jsx("p",{style:{color:"#666",margin:"0 0 16px",fontSize:13},children:"Enter your 12-word recovery phrase to restore your wallet."}),e.jsx(s,{words:r,onWordsChange:a=>{o(a),d(!1)},onComplete:()=>d(!0)}),e.jsx("button",{type:"submit",disabled:!t,style:{marginTop:16,width:"100%",padding:"10px 16px",fontSize:16,fontWeight:600,color:"#fff",background:t?"#f7931a":"#ccc",border:"none",borderRadius:6,cursor:t?"pointer":"not-allowed"},children:"Restore Wallet"})]})}},x={render:()=>e.jsxs("div",{style:{display:"flex",gap:32,maxWidth:720},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("h4",{style:{margin:"0 0 8px",fontSize:14,fontWeight:600},children:"12 words"}),e.jsx(s,{words:v,onWordsChange:()=>{},readOnly:!0})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("h4",{style:{margin:"0 0 8px",fontSize:14,fontWeight:600},children:"24 words"}),e.jsx(s,{words:A,onWordsChange:()=>{},wordCount:24,readOnly:!0})]})]})},b={render:()=>{const[r,o]=n.useState(Array(12).fill(""));return e.jsx(s,{words:r,onWordsChange:o,inputStyle:{borderRadius:20,padding:"6px 14px",border:"2px solid #e2e8f0",background:"#f8fafc"},dropdownStyle:{borderRadius:12,border:"2px solid #e2e8f0",boxShadow:"0 4px 12px rgba(0,0,0,0.08)"}})}},W={render:()=>{const[r,o]=n.useState(Array(12).fill(""));return e.jsx(s,{words:r,onWordsChange:o,inputStyle:{border:"none",borderBottom:"2px solid #ddd",borderRadius:0,padding:"4px 0"},dropdownStyle:{borderRadius:0,borderTop:"2px solid #f7931a",boxShadow:"0 4px 8px rgba(0,0,0,0.1)"}})}},C={render:()=>{const[r,o]=n.useState(Array(12).fill(""));return e.jsx("div",{style:{background:"#fff8f0",padding:24,borderRadius:8},children:e.jsx(s,{words:r,onWordsChange:o,inputStyle:{border:"1px solid #f7931a",borderRadius:6,background:"#fff",padding:"6px 10px"},dropdownStyle:{border:"1px solid #f7931a",borderRadius:6,background:"#fff"},style:{gap:10}})})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return <SeedPhraseInput words={words} onWordsChange={setWords} />;
  }
}`,...i.parameters?.docs?.source},description:{story:"Empty 12-word grid — default state",...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(24).fill(""));
    return <SeedPhraseInput words={words} onWordsChange={setWords} wordCount={24} />;
  }
}`,...l.parameters?.docs?.source},description:{story:"Empty 24-word grid",...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const initial = Array(12).fill("");
    initial[0] = "abandon";
    initial[1] = "ability";
    initial[2] = "able";
    const [words, setWords] = useState(initial);
    return <SeedPhraseInput words={words} onWordsChange={setWords} />;
  }
}`,...c.parameters?.docs?.source},description:{story:"First 3 words filled, rest empty",...c.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState([...SAMPLE_12]);
    const [message, setMessage] = useState("");
    return <div>
        <SeedPhraseInput words={words} onWordsChange={setWords} onComplete={() => setMessage("All words valid!")} />
        {message && <p style={{
        color: "#16a34a",
        fontWeight: 600,
        marginTop: 12
      }}>{message}</p>}
      </div>;
  }
}`,...p.parameters?.docs?.source},description:{story:"All 12 words filled — onComplete fires",...p.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <SeedPhraseInput words={SAMPLE_12} onWordsChange={() => {}} readOnly />;
  }
}`,...u.parameters?.docs?.source},description:{story:"Read-only 12-word display",...u.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <SeedPhraseInput words={SAMPLE_24} onWordsChange={() => {}} wordCount={24} readOnly />;
  }
}`,...m.parameters?.docs?.source},description:{story:"Read-only 24-word display",...m.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState([...SAMPLE_12]);
    return <SeedPhraseInput words={words} onWordsChange={setWords} columns={3} />;
  }
}`,...y.parameters?.docs?.source},description:{story:"3-column layout",...y.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState([...SAMPLE_24]);
    return <div style={{
      maxWidth: 640
    }}>
        <SeedPhraseInput words={words} onWordsChange={setWords} wordCount={24} columns={4} />
      </div>;
  }
}`,...g.parameters?.docs?.source},description:{story:"4-column layout with 24 words",...g.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return <div>
        <p style={{
        color: "#666",
        marginBottom: 12
      }}>
          Start typing in any field to see BIP39 autocomplete suggestions.
        </p>
        <SeedPhraseInput words={words} onWordsChange={setWords} />
      </div>;
  }
}`,...f.parameters?.docs?.source},description:{story:"Autocomplete demo — type in any field to see BIP39 suggestions",...f.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    const [complete, setComplete] = useState(false);
    const filled = words.filter((w: string) => w !== "").length;
    return <div>
        <SeedPhraseInput words={words} onWordsChange={w => {
        setWords(w);
        setComplete(false);
      }} onComplete={() => setComplete(true)} />
        <div style={{
        marginTop: 12,
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
          <span style={{
          color: "#666"
        }}>{filled}/12 words entered</span>
          {complete && <span style={{
          color: "#16a34a",
          fontWeight: 600
        }}>Complete!</span>}
        </div>
      </div>;
  }
}`,...h.parameters?.docs?.source},description:{story:"Interactive with progress indicator",...h.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return <div style={{
      background: "#1a1a2e",
      padding: 24,
      borderRadius: 8,
      color: "#e0e0e0"
    }}>
        <h3 style={{
        margin: "0 0 16px",
        fontSize: 16,
        fontWeight: 600
      }}>
          Recovery Phrase
        </h3>
        <SeedPhraseInput words={words} onWordsChange={setWords} inputStyle={{
        background: "#16213e",
        border: "1px solid #333",
        borderRadius: 6,
        color: "#e0e0e0"
      }} dropdownStyle={{
        background: "#16213e",
        border: "1px solid #333",
        color: "#e0e0e0"
      }} />
      </div>;
  }
}`,...S.parameters?.docs?.source},description:{story:"Dark background theme — demonstrates inputStyle and dropdownStyle",...S.parameters?.docs?.description}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    const [complete, setComplete] = useState(false);
    return <form onSubmit={e => e.preventDefault()}>
        <h3 style={{
        margin: "0 0 4px",
        fontSize: 18,
        fontWeight: 600
      }}>
          Recover Wallet
        </h3>
        <p style={{
        color: "#666",
        margin: "0 0 16px",
        fontSize: 13
      }}>
          Enter your 12-word recovery phrase to restore your wallet.
        </p>
        <SeedPhraseInput words={words} onWordsChange={w => {
        setWords(w);
        setComplete(false);
      }} onComplete={() => setComplete(true)} />
        <button type="submit" disabled={!complete} style={{
        marginTop: 16,
        width: "100%",
        padding: "10px 16px",
        fontSize: 16,
        fontWeight: 600,
        color: "#fff",
        background: complete ? "#f7931a" : "#ccc",
        border: "none",
        borderRadius: 6,
        cursor: complete ? "pointer" : "not-allowed"
      }}>
          Restore Wallet
        </button>
      </form>;
  }
}`,...w.parameters?.docs?.source},description:{story:"Wallet recovery form context",...w.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <div style={{
      display: "flex",
      gap: 32,
      maxWidth: 720
    }}>
        <div style={{
        flex: 1
      }}>
          <h4 style={{
          margin: "0 0 8px",
          fontSize: 14,
          fontWeight: 600
        }}>12 words</h4>
          <SeedPhraseInput words={SAMPLE_12} onWordsChange={() => {}} readOnly />
        </div>
        <div style={{
        flex: 1
      }}>
          <h4 style={{
          margin: "0 0 8px",
          fontSize: 14,
          fontWeight: 600
        }}>24 words</h4>
          <SeedPhraseInput words={SAMPLE_24} onWordsChange={() => {}} wordCount={24} readOnly />
        </div>
      </div>;
  }
}`,...x.parameters?.docs?.source},description:{story:"12-word and 24-word grids side by side",...x.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return <SeedPhraseInput words={words} onWordsChange={setWords} inputStyle={{
      borderRadius: 20,
      padding: "6px 14px",
      border: "2px solid #e2e8f0",
      background: "#f8fafc"
    }} dropdownStyle={{
      borderRadius: 12,
      border: "2px solid #e2e8f0",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }} />;
  }
}`,...b.parameters?.docs?.source},description:{story:"Rounded pill-style inputs",...b.parameters?.docs?.description}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return <SeedPhraseInput words={words} onWordsChange={setWords} inputStyle={{
      border: "none",
      borderBottom: "2px solid #ddd",
      borderRadius: 0,
      padding: "4px 0"
    }} dropdownStyle={{
      borderRadius: 0,
      borderTop: "2px solid #f7931a",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }} />;
  }
}`,...W.parameters?.docs?.source},description:{story:"Minimal underline-only inputs",...W.parameters?.docs?.description}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return <div style={{
      background: "#fff8f0",
      padding: 24,
      borderRadius: 8
    }}>
        <SeedPhraseInput words={words} onWordsChange={setWords} inputStyle={{
        border: "1px solid #f7931a",
        borderRadius: 6,
        background: "#fff",
        padding: "6px 10px"
      }} dropdownStyle={{
        border: "1px solid #f7931a",
        borderRadius: 6,
        background: "#fff"
      }} style={{
        gap: 10
      }} />
      </div>;
  }
}`,...C.parameters?.docs?.source},description:{story:"Bitcoin orange accent theme",...C.parameters?.docs?.description}}};const T=["Empty12","Empty24","PartiallyFilled","Complete","ReadOnly","ReadOnly24","ThreeColumns","FourColumns","WithAutocomplete","Interactive","DarkTheme","InAForm","SideBySide","CustomInputStyle","UnderlineStyle","BitcoinTheme"];export{C as BitcoinTheme,p as Complete,b as CustomInputStyle,S as DarkTheme,i as Empty12,l as Empty24,g as FourColumns,w as InAForm,h as Interactive,c as PartiallyFilled,u as ReadOnly,m as ReadOnly24,x as SideBySide,y as ThreeColumns,W as UnderlineStyle,f as WithAutocomplete,T as __namedExportsOrder,E as default};
