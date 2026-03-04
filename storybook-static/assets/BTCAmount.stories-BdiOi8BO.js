import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as C}from"./BTCAmount-pJks9XaE.js";import"./iframe-Dtn0yJuT.js";import"./preload-helper-PPVm8Dsz.js";import"./BitcoinIcon-PqEskw1b.js";import"./SatsIcon-DqQ832G7.js";const j={title:"Components/BTCAmount",component:C,tags:["autodocs"],argTypes:{amount:{control:{type:"number",min:0,max:21e14}},activeColor:{control:"color"},inactiveColor:{control:"color"},satsSeparator:{control:"text"},btcSeparator:{control:"text"},animate:{control:"boolean"},className:{control:"text"},style:{control:"object"},symbol:{control:"select",options:[void 0,"btc","sats"]},symbolPosition:{control:"select",options:["left","right"]}},decorators:[_=>o.jsx("div",{style:{fontSize:32,fontFamily:"monospace"},children:o.jsx(_,{})})]},s={args:{amount:0}},r={args:{amount:1}},a={args:{amount:1e3}},e={args:{amount:1e4}},t={args:{amount:1e8}},n={args:{amount:21e8}},m={args:{amount:21e14}},c={args:{amount:12537829,activeColor:"#f7931a",inactiveColor:"#e0e0e0"}},u={args:{amount:5e4,animate:!1}},i={args:{amount:1e8,btcSeparator:",",satsSeparator:"."}},p={args:{amount:42e6,style:{fontFamily:"SF Mono, Menlo, monospace"}}},l={args:{amount:1e8,symbol:"btc"}},d={args:{amount:5e4,symbol:"sats"}},g={args:{amount:1e8,symbol:"btc",symbolPosition:"right"}},S={args:{amount:5e4,symbol:"sats",symbolPosition:"right"}},y={render:()=>o.jsx(C,{amount:1e8,symbol:o.jsx("span",{style:{fontSize:"0.75em"},children:"BTC"})})},b={render:()=>o.jsx(C,{amount:5e4,symbol:o.jsx("span",{style:{fontSize:"0.75em"},children:"sats"}),symbolPosition:"right"})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 0
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 1
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 1_000
  }
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 10_000
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 100_000_000
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 2_100_000_000
  }
}`,...n.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 2_100_000_000_000_000
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 12_537_829,
    activeColor: "#f7931a",
    inactiveColor: "#e0e0e0"
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 50_000,
    animate: false
  }
}`,...u.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 100_000_000,
    btcSeparator: ",",
    satsSeparator: "."
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 42_000_000,
    style: {
      fontFamily: "SF Mono, Menlo, monospace"
    }
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 100_000_000,
    symbol: "btc"
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 50_000,
    symbol: "sats"
  }
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 100_000_000,
    symbol: "btc",
    symbolPosition: "right"
  }
}`,...g.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    amount: 50_000,
    symbol: "sats",
    symbolPosition: "right"
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <BTCAmount amount={100_000_000} symbol={<span style={{
    fontSize: "0.75em"
  }}>BTC</span>} />
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <BTCAmount amount={50_000} symbol={<span style={{
    fontSize: "0.75em"
  }}>sats</span>} symbolPosition="right" />
}`,...b.parameters?.docs?.source}}};const v=["Zero","OneSatoshi","OneThousandSats","TenThousandSats","OneBTC","TwentyOneBTC","MaxSupply","CustomColors","NoAnimation","CustomSeparators","CustomFont","WithBTCSymbol","WithSatsSymbol","SymbolOnRight","SatsSymbolOnRight","CustomSymbol","CustomSymbolOnRight"];export{c as CustomColors,p as CustomFont,i as CustomSeparators,y as CustomSymbol,b as CustomSymbolOnRight,m as MaxSupply,u as NoAnimation,t as OneBTC,r as OneSatoshi,a as OneThousandSats,S as SatsSymbolOnRight,g as SymbolOnRight,e as TenThousandSats,n as TwentyOneBTC,l as WithBTCSymbol,d as WithSatsSymbol,s as Zero,v as __namedExportsOrder,j as default};
