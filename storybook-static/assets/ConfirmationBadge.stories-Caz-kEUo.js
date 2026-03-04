import{j as n}from"./jsx-runtime-u17CrQMm.js";import{C as r}from"./ConfirmationBadge-H-_2zmQS.js";import{A as u}from"./AddressDisplay-DWGMLT_U.js";import{T as g}from"./TransactionAmount-v1JZOGbO.js";import"./iframe-Dtn0yJuT.js";import"./preload-helper-PPVm8Dsz.js";import"./BTCAmount-pJks9XaE.js";import"./BitcoinIcon-PqEskw1b.js";import"./SatsIcon-DqQ832G7.js";const q={title:"Components/ConfirmationBadge",component:r,tags:["autodocs"],decorators:[o=>n.jsx("div",{style:{fontFamily:"monospace",fontSize:14},children:n.jsx(o,{})})],argTypes:{confirmations:{control:{type:"number",min:0,max:100}},threshold:{control:{type:"number",min:1,max:20}},showCount:{control:"boolean"},unconfirmedColor:{control:"color"},confirmingColor:{control:"color"},confirmedColor:{control:"color"},unconfirmedLabel:{control:"text"},confirmedLabel:{control:"text"}}},e={args:{confirmations:0}},s={args:{confirmations:1}},i={args:{confirmations:3}},a={args:{confirmations:6}},t={render:()=>n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[0,1,2,3,4,5,6,7].map(o=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsxs("span",{style:{width:100,color:"#666"},children:[o," confirmation",o!==1?"s":""]}),n.jsx(r,{confirmations:o})]},o))})},c={render:()=>n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[0,1,2,3,4].map(o=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsxs("span",{style:{width:100,color:"#666"},children:[o," confirmation",o!==1?"s":""]}),n.jsx(r,{confirmations:o,threshold:3})]},o))})},d={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[n.jsx(r,{confirmations:0,unconfirmedLabel:"Pending",confirmedLabel:"Settled"}),n.jsx(r,{confirmations:3,unconfirmedLabel:"Pending",confirmedLabel:"Settled"}),n.jsx(r,{confirmations:6,unconfirmedLabel:"Pending",confirmedLabel:"Settled"})]})},m={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[n.jsx(r,{confirmations:0,unconfirmedColor:"#dc2626",confirmingColor:"#2563eb",confirmedColor:"#16a34a"}),n.jsx(r,{confirmations:3,unconfirmedColor:"#dc2626",confirmingColor:"#2563eb",confirmedColor:"#16a34a"}),n.jsx(r,{confirmations:6,unconfirmedColor:"#dc2626",confirmingColor:"#2563eb",confirmedColor:"#16a34a"})]})},l={render:()=>{const o=[{address:"bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",amount:15e4,confs:0},{address:"bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",amount:-42e3,confs:2},{address:"bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h",amount:1e6,confs:6},{address:"bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297",amount:-8500,confs:1}];return n.jsx("div",{style:{maxWidth:600},children:o.map((f,p)=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,padding:"10px 0",borderBottom:"1px solid #eee"},children:[n.jsx("div",{style:{flex:1,minWidth:0},children:n.jsx(u,{address:f.address,copyable:!1})}),n.jsx(g,{amount:f.amount}),n.jsx("div",{style:{width:100,textAlign:"right"},children:n.jsx(r,{confirmations:f.confs})})]},p))})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    confirmations: 0
  }
}`,...e.parameters?.docs?.source},description:{story:"Zero confirmations -- unconfirmed",...e.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    confirmations: 1
  }
}`,...s.parameters?.docs?.source},description:{story:"Single confirmation -- confirming",...s.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    confirmations: 3
  }
}`,...i.parameters?.docs?.source},description:{story:"Three confirmations -- still confirming",...i.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    confirmations: 6
  }
}`,...a.parameters?.docs?.source},description:{story:"Six or more confirmations -- confirmed",...a.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(n => <div key={n} style={{
      display: "flex",
      alignItems: "center",
      gap: 12
    }}>
          <span style={{
        width: 100,
        color: "#666"
      }}>
            {n} confirmation{n !== 1 ? "s" : ""}
          </span>
          <ConfirmationBadge confirmations={n} />
        </div>)}
    </div>
}`,...t.parameters?.docs?.source},description:{story:"All states from 0 through 7 in a vertical list",...t.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      {[0, 1, 2, 3, 4].map(n => <div key={n} style={{
      display: "flex",
      alignItems: "center",
      gap: 12
    }}>
          <span style={{
        width: 100,
        color: "#666"
      }}>
            {n} confirmation{n !== 1 ? "s" : ""}
          </span>
          <ConfirmationBadge confirmations={n} threshold={3} />
        </div>)}
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Custom threshold of 3 instead of default 6",...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <ConfirmationBadge confirmations={0} unconfirmedLabel="Pending" confirmedLabel="Settled" />
      <ConfirmationBadge confirmations={3} unconfirmedLabel="Pending" confirmedLabel="Settled" />
      <ConfirmationBadge confirmations={6} unconfirmedLabel="Pending" confirmedLabel="Settled" />
    </div>
}`,...d.parameters?.docs?.source},description:{story:"Custom label text",...d.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <ConfirmationBadge confirmations={0} unconfirmedColor="#dc2626" confirmingColor="#2563eb" confirmedColor="#16a34a" />
      <ConfirmationBadge confirmations={3} unconfirmedColor="#dc2626" confirmingColor="#2563eb" confirmedColor="#16a34a" />
      <ConfirmationBadge confirmations={6} unconfirmedColor="#dc2626" confirmingColor="#2563eb" confirmedColor="#16a34a" />
    </div>
}`,...m.parameters?.docs?.source},description:{story:"Custom color scheme",...m.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const txns = [{
      address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      amount: 150_000,
      confs: 0
    }, {
      address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
      amount: -42_000,
      confs: 2
    }, {
      address: "bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h",
      amount: 1_000_000,
      confs: 6
    }, {
      address: "bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297",
      amount: -8_500,
      confs: 1
    }];
    return <div style={{
      maxWidth: 600
    }}>
        {txns.map((tx, i) => <div key={i} style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px solid #eee"
      }}>
            <div style={{
          flex: 1,
          minWidth: 0
        }}>
              <AddressDisplay address={tx.address} copyable={false} />
            </div>
            <TransactionAmount amount={tx.amount} />
            <div style={{
          width: 100,
          textAlign: "right"
        }}>
              <ConfirmationBadge confirmations={tx.confs} />
            </div>
          </div>)}
      </div>;
  }
}`,...l.parameters?.docs?.source},description:{story:"Realistic transaction row with address, amount, and confirmation badge",...l.parameters?.docs?.description}}};const k=["Unconfirmed","OneConfirmation","ThreeConfirmations","Confirmed","AllStates","CustomThreshold","CustomLabels","CustomColors","InATransactionRow"];export{t as AllStates,a as Confirmed,m as CustomColors,d as CustomLabels,c as CustomThreshold,l as InATransactionRow,s as OneConfirmation,i as ThreeConfirmations,e as Unconfirmed,k as __namedExportsOrder,q as default};
