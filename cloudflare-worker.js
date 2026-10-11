// Cloudflare Worker: proxy restreint aux deux sources utilisées par Swing Consensus FR.
// Déployer dans Cloudflare Workers > Create > Edit code > Deploy.
const ALLOWED = new Set(['query1.finance.yahoo.com','query2.finance.yahoo.com','news.google.com']);
export default {async fetch(request, env, ctx) {
  const u=new URL(request.url);
  const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'};
  if(request.method==='OPTIONS') return new Response(null,{status:204,headers});
  if(request.method!=='GET'||u.pathname!=='/proxy')return new Response('Route inconnue',{status:404,headers});
  let dest;try{dest=new URL(u.searchParams.get('url')||'');}catch{return new Response('URL invalide',{status:400,headers});}
  if(dest.protocol!=='https:'||!ALLOWED.has(dest.hostname)||dest.port||dest.username||dest.password)return new Response('Domaine interdit',{status:403,headers});
  if(dest.hostname==='news.google.com'&&!dest.pathname.startsWith('/rss/search'))return new Response('Route interdite',{status:403,headers});
  if(dest.hostname!=='news.google.com'&&!/^\/v8\/finance\/chart\/[A-Za-z0-9%._^=\-]+$/.test(dest.pathname))return new Response('Route interdite',{status:403,headers});
  try{
    const upstream=await fetch(dest.toString(),{headers:{'Accept':dest.hostname==='news.google.com'?'application/rss+xml, application/xml':'application/json'},redirect:'error',cf:{cacheTtl:120,cacheEverything:true}});
    const h={...headers,'Content-Type':upstream.headers.get('content-type')||'application/octet-stream','Cache-Control':'public, max-age=60'};
    return new Response(upstream.body,{status:upstream.status,headers:h});
  }catch(e){return new Response('Source distante inaccessible : '+String(e.message||e),{status:502,headers});}
}};
