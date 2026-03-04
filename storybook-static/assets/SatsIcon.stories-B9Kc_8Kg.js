import{j as e}from"./jsx-runtime-u17CrQMm.js";import{S as s}from"./SatsIcon-DqQ832G7.js";const l={title:"Icons/SatsIcon",component:s,tags:["autodocs"],argTypes:{size:{control:{type:"number",min:8,max:512,step:8}},color:{control:"color"},backgroundColor:{control:"color"},alt:{control:"text"},tilted:{control:"boolean"}}},r={args:{size:32}},t={args:{size:64,tilted:!0}},n={args:{size:128,backgroundColor:"#f7931a",color:"#ffffff"}},o={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:24},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{size:64}),e.jsx("p",{children:"Upright (default)"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{size:64,tilted:!0}),e.jsx("p",{children:"Tilted"})]})]})},a={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx(s,{size:16}),e.jsx(s,{size:32}),e.jsx(s,{size:64}),e.jsx(s,{size:128})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    size: 32
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    size: 64,
    tilted: true
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    size: 128,
    backgroundColor: "#f7931a",
    color: "#ffffff"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: 24
  }}>
      <div style={{
      textAlign: "center"
    }}>
        <SatsIcon size={64} />
        <p>Upright (default)</p>
      </div>
      <div style={{
      textAlign: "center"
    }}>
        <SatsIcon size={64} tilted />
        <p>Tilted</p>
      </div>
    </div>
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: 16
  }}>
      <SatsIcon size={16} />
      <SatsIcon size={32} />
      <SatsIcon size={64} />
      <SatsIcon size={128} />
    </div>
}`,...a.parameters?.docs?.source}}};const d=["Default","Tilted","WithBackground","TiltComparison","Sizes"];export{r as Default,a as Sizes,o as TiltComparison,t as Tilted,n as WithBackground,d as __namedExportsOrder,l as default};
