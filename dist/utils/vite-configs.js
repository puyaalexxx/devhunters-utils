export function dhtuGetViteConfigs(e,s,n,t,a){let m={},i={},l=!0,r=()=>"[name].js";return e?(m={...s,...n},r=e=>e.name.endsWith(t)?`js/${e.name.replace(t,"")}.js`:"[name].js"):(m={main:a.mainEntry+"/main.ts",...n},i=e=>{if(e.includes(a.tsChunks)){const s=e.split(a.tsChunks)[1].split("/");return s.length>1?`js/${s[s.length-1].replace(t,"").replace(".js","").replace(".ts","")}`:"js/[name].js"}},l=!1),{input:m,manualChunks:i,entryFileNames:r,assetFileNames:e=>{if(e.name&&e.name.endsWith(".css")){const s=e.name.replace(".css","");return e.name.includes("style.css")?"main[extname]":`css/${s}[extname]`}return a.assetFileNames+"/[name][extname]"},cssCodeSplit:l}}