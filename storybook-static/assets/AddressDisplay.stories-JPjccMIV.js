import{j as r}from"./jsx-runtime-u17CrQMm.js";import{A as p}from"./AddressDisplay-DWGMLT_U.js";import{T as u}from"./TransactionAmount-v1JZOGbO.js";import"./iframe-Dtn0yJuT.js";import"./preload-helper-PPVm8Dsz.js";import"./BTCAmount-pJks9XaE.js";import"./BitcoinIcon-PqEskw1b.js";import"./SatsIcon-DqQ832G7.js";const i="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",y="bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297",S={title:"Components/AddressDisplay",component:p,tags:["autodocs"],decorators:[s=>r.jsx("div",{style:{fontFamily:"monospace",fontSize:16},children:r.jsx(s,{})})],argTypes:{address:{control:"text"},prefixChars:{control:{type:"number",min:1,max:50}},suffixChars:{control:{type:"number",min:1,max:50}},separator:{control:"text"},copyable:{control:"boolean"},addressColor:{control:"color"},separatorColor:{control:"color"},copyIconColor:{control:"color"},copiedLabel:{control:"text"}}},e={args:{address:i}},o={args:{address:"bc1qw508d6"}},a={args:{address:y,prefixChars:12,suffixChars:8,separator:"~~~"}},t={args:{address:i,copyable:!1}},n={render:s=>r.jsx("div",{style:{background:"#1a1a2e",padding:24,borderRadius:8,maxWidth:400},children:r.jsx(p,{...s})}),args:{address:i,addressColor:"#e0e0e0",separatorColor:"#555",copyIconColor:"#777"}},d={render:()=>{const s=[{address:"bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",amount:15e4},{address:"bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",amount:-42e3},{address:"bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297",amount:1e6},{address:"bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h",amount:-25e4}];return r.jsx("div",{style:{maxWidth:480},children:s.map((m,l)=>r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #eee"},children:[r.jsx(p,{address:m.address,copyable:!1}),r.jsx(u,{amount:m.amount})]},l))})}},c={args:{address:i,addressColor:"#6366f1",separatorColor:"#c084fc",copyIconColor:"#a78bfa"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    address: MAINNET_ADDRESS
  }
}`,...e.parameters?.docs?.source},description:{story:"Default display with truncation and copy button",...e.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    address: "bc1qw508d6"
  }
}`,...o.parameters?.docs?.source},description:{story:"Short address that does not need truncation",...o.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    address: TAPROOT_ADDRESS,
    prefixChars: 12,
    suffixChars: 8,
    separator: "~~~"
  }
}`,...a.parameters?.docs?.source},description:{story:"Custom prefix/suffix lengths",...a.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    address: MAINNET_ADDRESS,
    copyable: false
  }
}`,...t.parameters?.docs?.source},description:{story:"Copy button hidden",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    background: "#1a1a2e",
    padding: 24,
    borderRadius: 8,
    maxWidth: 400
  }}>
      <AddressDisplay {...args} />
    </div>,
  args: {
    address: MAINNET_ADDRESS,
    addressColor: "#e0e0e0",
    separatorColor: "#555",
    copyIconColor: "#777"
  }
}`,...n.parameters?.docs?.source},description:{story:"Dark theme with custom colors",...n.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const txns = [{
      address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      amount: 150_000
    }, {
      address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
      amount: -42_000
    }, {
      address: "bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297",
      amount: 1_000_000
    }, {
      address: "bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h",
      amount: -250_000
    }];
    return <div style={{
      maxWidth: 480
    }}>
        {txns.map((tx, i) => <div key={i} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #eee"
      }}>
            <AddressDisplay address={tx.address} copyable={false} />
            <TransactionAmount amount={tx.amount} />
          </div>)}
      </div>;
  }
}`,...d.parameters?.docs?.source},description:{story:"Realistic transaction list showing address alongside amount",...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    address: MAINNET_ADDRESS,
    addressColor: "#6366f1",
    separatorColor: "#c084fc",
    copyIconColor: "#a78bfa"
  }
}`,...c.parameters?.docs?.source},description:{story:"Custom color scheme",...c.parameters?.docs?.description}}};const k=["Default","ShortAddress","CustomTruncation","NotCopyable","DarkTheme","InATransactionList","CustomColors"];export{c as CustomColors,a as CustomTruncation,n as DarkTheme,e as Default,d as InATransactionList,t as NotCopyable,o as ShortAddress,k as __namedExportsOrder,S as default};
