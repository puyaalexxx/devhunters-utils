export async function dhtuLoadModule(o,t,c="ts"){try{const e=`/${t}.${c}`,n=Object.keys(o).find((o=>o.includes(e)));n&&await o[n]()}catch(o){console.error(`Error loading ${t} module:`,o)}}