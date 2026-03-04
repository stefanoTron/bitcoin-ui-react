import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as s}from"./iframe-Dtn0yJuT.js";import{B as o}from"./BTCInput-CtPYXcKR.js";import{B as b}from"./BTCAmount-pJks9XaE.js";import{B as g}from"./BitcoinIcon-PqEskw1b.js";import{S as h}from"./SatsIcon-DqQ832G7.js";import"./preload-helper-PPVm8Dsz.js";const I={title:"Components/BTCInput",component:o,tags:["autodocs"],argTypes:{amount:{control:{type:"number",min:0,max:21e14}},activeColor:{control:"color"},inactiveColor:{control:"color"},satsSeparator:{control:"text"},btcSeparator:{control:"text"},disabled:{control:"boolean"},placeholder:{control:"text"}}},i={render:()=>{const[e,t]=s.useState(0);return n.jsxs("div",{style:{fontFamily:"monospace",fontSize:24,width:240},children:[n.jsx(o,{amount:e,onAmountChange:t}),n.jsxs("p",{style:{fontSize:12,color:"#888",marginTop:4},children:[e.toLocaleString()," sats"]})]})}},r={render:()=>{const[e,t]=s.useState(0),[y,f]=s.useState("");return n.jsxs("form",{onSubmit:a=>a.preventDefault(),style:{fontFamily:"system-ui, sans-serif",maxWidth:360},children:[n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("label",{style:{display:"block",fontSize:14,fontWeight:500,marginBottom:4},children:"Memo"}),n.jsx("input",{type:"text",value:y,onChange:a=>f(a.target.value),placeholder:"What's this for?",style:{width:"100%",boxSizing:"border-box",padding:"8px 12px",fontSize:16,border:"1px solid #ccc",borderRadius:6,fontFamily:"inherit"}})]}),n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("label",{style:{display:"block",fontSize:14,fontWeight:500,marginBottom:4},children:"Amount"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",border:"1px solid #ccc",borderRadius:6},children:[n.jsx(g,{size:20}),n.jsx(o,{amount:e,onAmountChange:t,style:{fontSize:16,fontFamily:"SF Mono, Menlo, monospace"}})]})]}),n.jsx("button",{type:"submit",style:{width:"100%",padding:"10px 16px",fontSize:16,fontWeight:600,color:"#fff",background:"#f7931a",border:"none",borderRadius:6,cursor:"pointer"},children:"Send"})]})}},d={render:()=>{const[e,t]=s.useState(5e4);return n.jsx("div",{style:{width:160,padding:"8px 12px",border:"1px solid #ddd",borderRadius:6,fontFamily:"monospace",fontSize:16},children:n.jsx(o,{amount:e,onAmountChange:t})})}},l={render:()=>{const[e,t]=s.useState(21e8);return n.jsx("div",{style:{width:480,padding:"12px 16px",border:"1px solid #ddd",borderRadius:6,fontFamily:"monospace",fontSize:32},children:n.jsx(o,{amount:e,onAmountChange:t})})}},m={render:()=>{const[e,t]=s.useState(1234567);return n.jsxs("div",{style:{fontFamily:"monospace",fontSize:20,maxWidth:400},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",border:"1px solid #ddd",borderRadius:6,marginBottom:12},children:[n.jsx(h,{size:18,tilted:!0}),n.jsx(o,{amount:e,onAmountChange:t})]}),n.jsxs("div",{style:{fontSize:14,color:"#666"},children:["Display: ",n.jsx(b,{amount:e,symbol:"btc"})]})]})}},p={render:()=>{const[e,t]=s.useState(21e3);return n.jsxs("p",{style:{fontFamily:"system-ui, sans-serif",fontSize:16,maxWidth:400},children:["Send"," ",n.jsx("span",{style:{display:"inline-flex",alignItems:"baseline",gap:4,borderBottom:"2px solid #f7931a",fontFamily:"SF Mono, Menlo, monospace"},children:n.jsx(o,{amount:e,onAmountChange:t,style:{width:"10ch"}})})," ","sats to Alice."]})}},c={render:()=>{const[e,t]=s.useState(5e5);return n.jsxs("div",{style:{background:"#1a1a2e",padding:24,borderRadius:8,maxWidth:360,fontFamily:"monospace",fontSize:24},children:[n.jsx("label",{style:{display:"block",fontSize:12,color:"#888",marginBottom:4},children:"Amount (BTC)"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",border:"1px solid #333",borderRadius:6},children:[n.jsx(g,{size:22}),n.jsx(o,{amount:e,onAmountChange:t,activeColor:"#f7931a",inactiveColor:"#555"})]})]})}},u={render:()=>n.jsx("div",{style:{fontFamily:"monospace",fontSize:20,maxWidth:280,padding:"8px 12px",border:"1px solid #eee",borderRadius:6,background:"#fafafa"},children:n.jsx(o,{amount:1e5,onAmountChange:()=>{},disabled:!0})})},x={render:()=>{const[e,t]=s.useState(0),[y,f]=s.useState(1e3),a={display:"flex",alignItems:"center",gap:8,padding:"8px 12px",border:"1px solid #ddd",borderRadius:6,fontFamily:"monospace",fontSize:18};return n.jsxs("div",{style:{fontFamily:"system-ui, sans-serif",maxWidth:360},children:[n.jsxs("div",{style:{marginBottom:12},children:[n.jsx("label",{style:{display:"block",fontSize:13,fontWeight:500,marginBottom:4},children:"Send"}),n.jsxs("div",{style:a,children:[n.jsx(g,{size:18}),n.jsx(o,{amount:e,onAmountChange:t})]})]}),n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("label",{style:{display:"block",fontSize:13,fontWeight:500,marginBottom:4},children:"Network fee"}),n.jsxs("div",{style:a,children:[n.jsx(h,{size:16,tilted:!0}),n.jsx(o,{amount:y,onAmountChange:f})]})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:14,color:"#666",padding:"8px 0",borderTop:"1px solid #eee"},children:[n.jsx("span",{children:"Total"}),n.jsx(b,{amount:e+y,symbol:"btc"})]})]})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [amount, setAmount] = useState(0);
    return <div style={{
      fontFamily: "monospace",
      fontSize: 24,
      width: 240
    }}>
        <BTCInput amount={amount} onAmountChange={setAmount} />
        <p style={{
        fontSize: 12,
        color: "#888",
        marginTop: 4
      }}>
          {amount.toLocaleString()} sats
        </p>
      </div>;
  }
}`,...i.parameters?.docs?.source},description:{story:"Basic interactive input",...i.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [amount, setAmount] = useState(0);
    const [memo, setMemo] = useState("");
    return <form onSubmit={e => e.preventDefault()} style={{
      fontFamily: "system-ui, sans-serif",
      maxWidth: 360
    }}>
        <div style={{
        marginBottom: 16
      }}>
          <label style={{
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 4
        }}>
            Memo
          </label>
          <input type="text" value={memo} onChange={e => setMemo(e.target.value)} placeholder="What's this for?" style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "8px 12px",
          fontSize: 16,
          border: "1px solid #ccc",
          borderRadius: 6,
          fontFamily: "inherit"
        }} />
        </div>
        <div style={{
        marginBottom: 16
      }}>
          <label style={{
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 4
        }}>
            Amount
          </label>
          <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: 6
        }}>
            <BitcoinIcon size={20} />
            <BTCInput amount={amount} onAmountChange={setAmount} style={{
            fontSize: 16,
            fontFamily: "SF Mono, Menlo, monospace"
          }} />
          </div>
        </div>
        <button type="submit" style={{
        width: "100%",
        padding: "10px 16px",
        fontSize: 16,
        fontWeight: 600,
        color: "#fff",
        background: "#f7931a",
        border: "none",
        borderRadius: 6,
        cursor: "pointer"
      }}>
          Send
        </button>
      </form>;
  }
}`,...r.parameters?.docs?.source},description:{story:"Input inside a form with label, border, and padding",...r.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [amount, setAmount] = useState(50_000);
    return <div style={{
      width: 160,
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: 6,
      fontFamily: "monospace",
      fontSize: 16
    }}>
        <BTCInput amount={amount} onAmountChange={setAmount} />
      </div>;
  }
}`,...d.parameters?.docs?.source},description:{story:"Narrow container — input adapts to small widths",...d.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [amount, setAmount] = useState(2_100_000_000);
    return <div style={{
      width: 480,
      padding: "12px 16px",
      border: "1px solid #ddd",
      borderRadius: 6,
      fontFamily: "monospace",
      fontSize: 32
    }}>
        <BTCInput amount={amount} onAmountChange={setAmount} />
      </div>;
  }
}`,...l.parameters?.docs?.source},description:{story:"Wide container — input fills available space",...l.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [amount, setAmount] = useState(1_234_567);
    return <div style={{
      fontFamily: "monospace",
      fontSize: 20,
      maxWidth: 400
    }}>
        <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: 6,
        marginBottom: 12
      }}>
          <SatsIcon size={18} tilted />
          <BTCInput amount={amount} onAmountChange={setAmount} />
        </div>
        <div style={{
        fontSize: 14,
        color: "#666"
      }}>
          Display: <BTCAmount amount={amount} symbol="btc" />
        </div>
      </div>;
  }
}`,...m.parameters?.docs?.source},description:{story:"Side-by-side with a BTCAmount display",...m.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [amount, setAmount] = useState(21_000);
    return <p style={{
      fontFamily: "system-ui, sans-serif",
      fontSize: 16,
      maxWidth: 400
    }}>
        Send{" "}
        <span style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 4,
        borderBottom: "2px solid #f7931a",
        fontFamily: "SF Mono, Menlo, monospace"
      }}>
          <BTCInput amount={amount} onAmountChange={setAmount} style={{
          width: "10ch"
        }} />
        </span>{" "}
        sats to Alice.
      </p>;
  }
}`,...p.parameters?.docs?.source},description:{story:"Inline within a sentence",...p.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [amount, setAmount] = useState(500_000);
    return <div style={{
      background: "#1a1a2e",
      padding: 24,
      borderRadius: 8,
      maxWidth: 360,
      fontFamily: "monospace",
      fontSize: 24
    }}>
        <label style={{
        display: "block",
        fontSize: 12,
        color: "#888",
        marginBottom: 4
      }}>
          Amount (BTC)
        </label>
        <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        border: "1px solid #333",
        borderRadius: 6
      }}>
          <BitcoinIcon size={22} />
          <BTCInput amount={amount} onAmountChange={setAmount} activeColor="#f7931a" inactiveColor="#555" />
        </div>
      </div>;
  }
}`,...c.parameters?.docs?.source},description:{story:"Dark theme",...c.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <div style={{
      fontFamily: "monospace",
      fontSize: 20,
      maxWidth: 280,
      padding: "8px 12px",
      border: "1px solid #eee",
      borderRadius: 6,
      background: "#fafafa"
    }}>
        <BTCInput amount={100_000} onAmountChange={() => {}} disabled />
      </div>;
  }
}`,...u.parameters?.docs?.source},description:{story:"Disabled state",...u.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [send, setSend] = useState(0);
    const [fee, setFee] = useState(1_000);
    const inputContainer: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: 6,
      fontFamily: "monospace",
      fontSize: 18
    };
    return <div style={{
      fontFamily: "system-ui, sans-serif",
      maxWidth: 360
    }}>
        <div style={{
        marginBottom: 12
      }}>
          <label style={{
          display: "block",
          fontSize: 13,
          fontWeight: 500,
          marginBottom: 4
        }}>
            Send
          </label>
          <div style={inputContainer}>
            <BitcoinIcon size={18} />
            <BTCInput amount={send} onAmountChange={setSend} />
          </div>
        </div>
        <div style={{
        marginBottom: 16
      }}>
          <label style={{
          display: "block",
          fontSize: 13,
          fontWeight: 500,
          marginBottom: 4
        }}>
            Network fee
          </label>
          <div style={inputContainer}>
            <SatsIcon size={16} tilted />
            <BTCInput amount={fee} onAmountChange={setFee} />
          </div>
        </div>
        <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        color: "#666",
        padding: "8px 0",
        borderTop: "1px solid #eee"
      }}>
          <span>Total</span>
          <BTCAmount amount={send + fee} symbol="btc" />
        </div>
      </div>;
  }
}`,...x.parameters?.docs?.source},description:{story:"Multiple inputs in a two-column layout",...x.parameters?.docs?.description}}};const F=["Default","InAForm","NarrowContainer","WideContainer","WithDisplay","Inline","DarkTheme","Disabled","MultipleInputs"];export{c as DarkTheme,i as Default,u as Disabled,r as InAForm,p as Inline,x as MultipleInputs,d as NarrowContainer,l as WideContainer,m as WithDisplay,F as __namedExportsOrder,I as default};
