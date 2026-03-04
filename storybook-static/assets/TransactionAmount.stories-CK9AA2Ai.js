import{j as e}from"./jsx-runtime-u17CrQMm.js";import{T as u}from"./TransactionAmount-v1JZOGbO.js";import"./iframe-Dtn0yJuT.js";import"./preload-helper-PPVm8Dsz.js";import"./BTCAmount-pJks9XaE.js";import"./BitcoinIcon-PqEskw1b.js";import"./SatsIcon-DqQ832G7.js";const C={title:"Components/TransactionAmount",component:u,tags:["autodocs"],decorators:[d=>e.jsx("div",{style:{fontFamily:"monospace",fontSize:16},children:e.jsx(d,{})})],argTypes:{amount:{control:{type:"number"}},showSign:{control:"boolean"},symbol:{control:{type:"select",options:[void 0,"btc","sats"]}},symbolPosition:{control:{type:"select",options:["left","right"]}},positiveColor:{control:"color"},negativeColor:{control:"color"},inactiveColor:{control:"color"}}},o={args:{amount:15e4}},t={args:{amount:-42e3}},s={args:{amount:0}},n={args:{amount:1234567,symbol:"btc"}},r={args:{amount:-5e5,symbol:"sats"}},a={args:{amount:15e4,symbol:"btc",symbolPosition:"right"}},i={render:()=>e.jsx(u,{amount:15e4,symbol:e.jsx("span",{style:{fontSize:"0.75em"},children:"BTC"})})},m={args:{amount:75e3,showSign:!1}},c={args:{amount:21e4,positiveColor:"#3b82f6",negativeColor:"#f97316",inactiveColor:"#cbd5e1"}},l={render:()=>{const d=[{label:"Payment from Alice",amount:5e5,date:"Mar 3"},{label:"Coffee shop",amount:-4200,date:"Mar 2"},{label:"Mining payout",amount:125e4,date:"Mar 1"},{label:"VPN subscription",amount:-15e3,date:"Feb 28"},{label:"Refund",amount:8e3,date:"Feb 27"},{label:"Hardware wallet",amount:-35e4,date:"Feb 26"}];return e.jsx("div",{style:{maxWidth:400},children:d.map((p,y)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #eee"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"system-ui, sans-serif",fontSize:14,fontWeight:500},children:p.label}),e.jsx("div",{style:{fontSize:12,color:"#999",marginTop:2},children:p.date})]}),e.jsx(u,{amount:p.amount})]},y))})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 150_000
  }
}`,...o.parameters?.docs?.source},description:{story:"Positive (received) amount",...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    amount: -42_000
  }
}`,...t.parameters?.docs?.source},description:{story:"Negative (sent) amount",...t.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 0
  }
}`,...s.parameters?.docs?.source},description:{story:"Zero amount",...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 1_234_567,
    symbol: "btc"
  }
}`,...n.parameters?.docs?.source},description:{story:"Positive amount with BTC symbol",...n.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    amount: -500_000,
    symbol: "sats"
  }
}`,...r.parameters?.docs?.source},description:{story:"Negative amount with sats symbol",...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 150_000,
    symbol: "btc",
    symbolPosition: "right"
  }
}`,...a.parameters?.docs?.source},description:{story:"Symbol on the right side",...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <TransactionAmount amount={150_000} symbol={<span style={{
    fontSize: "0.75em"
  }}>BTC</span>} />
}`,...i.parameters?.docs?.source},description:{story:"Custom element as symbol",...i.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 75_000,
    showSign: false
  }
}`,...m.parameters?.docs?.source},description:{story:"Amount without sign prefix",...m.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 210_000,
    positiveColor: "#3b82f6",
    negativeColor: "#f97316",
    inactiveColor: "#cbd5e1"
  }
}`,...c.parameters?.docs?.source},description:{story:"Custom color scheme",...c.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const txns = [{
      label: "Payment from Alice",
      amount: 500_000,
      date: "Mar 3"
    }, {
      label: "Coffee shop",
      amount: -4_200,
      date: "Mar 2"
    }, {
      label: "Mining payout",
      amount: 1_250_000,
      date: "Mar 1"
    }, {
      label: "VPN subscription",
      amount: -15_000,
      date: "Feb 28"
    }, {
      label: "Refund",
      amount: 8_000,
      date: "Feb 27"
    }, {
      label: "Hardware wallet",
      amount: -350_000,
      date: "Feb 26"
    }];
    return <div style={{
      maxWidth: 400
    }}>
        {txns.map((tx, i) => <div key={i} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #eee"
      }}>
            <div>
              <div style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 500
          }}>
                {tx.label}
              </div>
              <div style={{
            fontSize: 12,
            color: "#999",
            marginTop: 2
          }}>{tx.date}</div>
            </div>
            <TransactionAmount amount={tx.amount} />
          </div>)}
      </div>;
  }
}`,...l.parameters?.docs?.source},description:{story:"Realistic transaction list with alternating sent/received",...l.parameters?.docs?.description}}};const _=["Received","Sent","Zero","WithBTCSymbol","WithSatsSymbol","SymbolOnRight","CustomSymbol","NoSign","CustomColors","TransactionList"];export{c as CustomColors,i as CustomSymbol,m as NoSign,o as Received,t as Sent,a as SymbolOnRight,l as TransactionList,n as WithBTCSymbol,r as WithSatsSymbol,s as Zero,_ as __namedExportsOrder,C as default};
