(function(){var e={7865:function(e,t,n){"use strict";var a=n(9242),r=n(3396),o=n(4870),s=n(2483),i={__name:"App",setup(e){const t=(0,s.yj)(),n=(0,r.Fl)((()=>t.meta.layout||"default-layout"));return(e,t)=>((0,r.wg)(),(0,r.j4)((0,r.LL)((0,o.SU)(n))))}};const c=i;var l=c,u=n(8326),p=n(7139),d={__name:"IPFS",setup(e){const t=(0,u.s)(),n=(0,r.f3)("emitter"),a=((0,r.f3)("i18n"),Ipfs.create({init:!0,start:!0,relay:{enabled:!0,hop:{enabled:!0}},EXPERIMENTAL:{pubsub:!0},config:{Addresses:{Swarm:["/dns4/ws-star.discovery.cybernode.ai/tcp/443/wss/p2p-webrtc-star"]},Bootstrap:["/dns4/ws-star.discovery.cybernode.ai/tcp/4430/wss/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB"]}}));return null!==a&&(t.$patch({node:a}),t.$patch({IPFSStatus:!0})),(e,a)=>((0,r.wg)(),(0,r.iD)("div",{class:(0,p.C_)(["ipfs_status",{green:(0,o.SU)(t).IPFSStatus}]),onMouseover:a[0]||(a[0]=t=>(0,o.SU)(n).emit("setNotification",e.$t("message.ipfs_notice")))},[(0,r._)("div",null,(0,p.zw)(e.$t("message.ipfs")),1)],34))}},_=n(89);const v=(0,_.Z)(d,[["__scopeId","data-v-45c8dc6d"]]);var f=v;const h=e=>((0,r.dD)("data-v-1192bd0e"),e=e(),(0,r.Cn)(),e),m={class:"currency"},g=h((()=>(0,r._)("svg",null,[(0,r._)("use",{"xlink:href":"/sprite.svg#ic_arr_down"})],-1))),b={class:"dropdown"};var y={__name:"Currency",setup(e){const t=(0,u.s)(),n=(0,o.iH)(!1);function s(e){t.$patch({currency:e}),this.showDropdown=!1}return(e,i)=>((0,r.wg)(),(0,r.iD)("div",m,[(0,r._)("button",{class:(0,p.C_)(["btn",{active:n.value}]),onClick:i[0]||(i[0]=(0,a.iM)((e=>n.value=!n.value),["prevent"]))},[(0,r._)("span",null,(0,p.zw)((0,o.SU)(t).currency),1),g],2),(0,r._)("div",b,[(0,r._)("div",null,[(0,r._)("button",{class:(0,p.C_)(["btn",{active:"BTC"==(0,o.SU)(t).currency}]),onClick:i[1]||(i[1]=(0,a.iM)((e=>s("BTC")),["prevent"]))},"BTC",2)]),(0,r._)("div",null,[(0,r._)("button",{class:(0,p.C_)(["btn",{active:"ETH"==(0,o.SU)(t).currency}]),onClick:i[2]||(i[2]=(0,a.iM)((e=>s("ETH")),["prevent"]))},"ETH",2)]),(0,r._)("div",null,[(0,r._)("button",{class:(0,p.C_)(["btn",{active:"ATOM"==(0,o.SU)(t).currency}]),onClick:i[3]||(i[3]=(0,a.iM)((e=>s("ATOM")),["prevent"]))},"ATOM",2)]),(0,r._)("div",null,[(0,r._)("button",{class:(0,p.C_)(["btn",{active:"USDT"==(0,o.SU)(t).currency}]),onClick:i[4]||(i[4]=(0,a.iM)((e=>s("USDT")),["prevent"]))},"USDT",2)])])]))}};const w=(0,_.Z)(y,[["__scopeId","data-v-1192bd0e"]]);var k=w;const S=e=>((0,r.dD)("data-v-5840a212"),e=e(),(0,r.Cn)(),e),P={class:"user"},C=S((()=>(0,r._)("div",{class:"icon"},[(0,r._)("svg",null,[(0,r._)("use",{"xlink:href":"/sprite.svg#ic_wallet"})])],-1))),E={class:"name"},A={class:"photo"},D=["src"];var R={__name:"User",setup(e){const t=(0,u.s)();return(e,n)=>((0,r.wg)(),(0,r.iD)("div",P,[C,(0,r._)("div",E,(0,p.zw)((0,o.SU)(t).userName),1),(0,r._)("div",A,[(0,o.SU)(t).avatar?((0,r.wg)(),(0,r.iD)("img",{key:0,src:(0,o.SU)(t).avatar,alt:""},null,8,D)):(0,r.kq)("",!0)])]))}};const U=(0,_.Z)(R,[["__scopeId","data-v-5840a212"]]);var T=U;const j=e=>((0,r.dD)("data-v-62e25d21"),e=e(),(0,r.Cn)(),e),x=j((()=>(0,r._)("div",{class:"icon"},[(0,r._)("svg",null,[(0,r._)("use",{"xlink:href":"/sprite.svg#ic_wallet"})])],-1)));var O={__name:"ConnectBtn",setup(e){const t=(0,r.f3)("emitter");return(e,n)=>((0,r.wg)(),(0,r.iD)("button",{class:"connect_btn",onClick:n[0]||(n[0]=(0,a.iM)((e=>(0,o.SU)(t).emit("connectWallet")),["prevent"]))},[x,(0,r._)("span",null,(0,p.zw)(e.$t("message.connect_wallet")),1)]))}};const M=(0,_.Z)(O,[["__scopeId","data-v-62e25d21"]]);var z=M;const B={class:"cont"},I={class:"info row"},N=(0,r._)("div",{class:"logo"},[(0,r._)("img",{src:"/logo.svg",alt:""})],-1);var $={__name:"Header",setup(e){const t=(0,u.s)();return(e,n)=>((0,r.wg)(),(0,r.iD)("header",null,[(0,r._)("div",B,[(0,r._)("div",I,[N,(0,r.Wm)(f),(0,o.SU)(t).auth?((0,r.wg)(),(0,r.j4)(k,{key:0})):(0,r.kq)("",!0),(0,o.SU)(t).auth?((0,r.wg)(),(0,r.j4)(T,{key:1})):(0,r.kq)("",!0),(0,o.SU)(t).auth?(0,r.kq)("",!0):((0,r.wg)(),(0,r.j4)(z,{key:2}))])])]))}};const F=$;var L=F,H={__name:"Error",setup(e){return(e,t)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(L),(0,r.Wm)((0,o.SU)(s.MA))],64))}};const K=H;var W=K,q=n(2350),Z=n(5673);const Q={class:"notifications"},G={class:"cont"},Y={class:"data"},X=(0,r._)("div",{class:"icon"},[(0,r._)("svg",null,[(0,r._)("use",{"xlink:href":"/sprite.svg#ic_notification"})])],-1);var J={__name:"Default",setup(e){const t=(0,r.f3)("emitter"),n=(0,r.f3)("i18n"),a=(0,u.s)();return(0,r.bv)((()=>{a.tooltip=n.global.t("message.notice_default")})),t.on("connectWallet",(async()=>{const e="cosmoshub-4";window.keplr.enable(e);const t=window.getOfflineSigner(e),n=await t.getAccounts(),r=await window.keplr.getKey(e);if(r){a.$patch({userName:r.name}),a.$patch({auth:!0});new q.SigningCosmosClient("https://lcd-cosmoshub.keplr.app/rest",n[0].address,t);a.$patch({wallets:{cosmos:n[0].address,bostrom:(0,Z.g6)("bostrom",(0,Z.zl)(n[0].address).data),osmo:(0,Z.g6)("osmo",(0,Z.zl)(n[0].address).data),juno:(0,Z.g6)("juno",(0,Z.zl)(n[0].address).data),emoney:(0,Z.g6)("emoney",(0,Z.zl)(n[0].address).data),stars:(0,Z.g6)("stars",(0,Z.zl)(n[0].address).data),gravity:(0,Z.g6)("gravity",(0,Z.zl)(n[0].address).data),evm:(0,Z.g6)("evm",(0,Z.zl)(n[0].address).data),cre:(0,Z.g6)("cre",(0,Z.zl)(n[0].address).data),omniflix:(0,Z.g6)("omniflix",(0,Z.zl)(n[0].address).data),desmos:(0,Z.g6)("desmos",(0,Z.zl)(n[0].address).data)}}),await fetch(`https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=${a.wallets.bostrom}&cyberlink.particleFrom=Qmf89bXkJH9jw4uaLkHmZkxQ51qGKfUPtAMxA8rTwBrmTs&limit=1000000`).then((e=>e.json())).then((e=>{e.txs?a.$patch({avatar:"https://ipfs.io/ipfs/"+e.txs[0].tx.value.msg[0].value.links[0].to}):a.$patch({avatar:`https://robohash.org/${a.userName.toLowerCase()}?set=set4`})}))}})),t.on("setNotification",(function(e){a.$patch({tooltip:e})})),(e,t)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(L),(0,r._)("section",Q,[(0,r._)("div",G,[(0,r._)("div",Y,[X,(0,r._)("span",null,(0,p.zw)((0,o.SU)(a).tooltip),1)])])]),(0,r.Wm)((0,o.SU)(s.MA))],64))}};const V=J;var ee=V;const te=[{path:"/:pathMatch(.*)",name:"Error",component:()=>n.e(684).then(n.bind(n,6187)),meta:{layout:W}},{path:"/keplr_error",name:"KeplrError",component:()=>n.e(217).then(n.bind(n,4709)),meta:{layout:W}},{path:"/",name:"Dashboard",component:()=>n.e(763).then(n.bind(n,9763)),meta:{layout:ee}}],ne=(0,s.p7)({history:(0,s.PO)("/"),routes:te});ne.beforeEach((async(e,t,n)=>{window.keplr||"KeplrError"===e.name?n():ne().push({name:"KeplrError"})}));var ae=ne,re=n(3556),oe=n(5658),se={en:{message:{ipfs:"Ipfs node",ipfs_notice:"Built-in IPFS node is active.",error_title_404:"Page was lost in space.... Are you sure that it exist?",keplr_error_title:"Oooops, seems you don't have<br> a Keplr extension",keplr_install_btn:"Install Keplr",connect_wallet:"Connect wallet",notice_default:"Bro_n_Bro foundation has come to light at early 2021 as a Validator for Cosmos Ecosystem. Some time after we started relaying and expanding other services to networks and projects."}}};const ie=(0,oe.o)({locale:"en",fallbackLocale:"en",messages:se});var ce=ie,le=n(1373);const ue=(0,le.Z)(),pe=(0,a.ri)(l);pe.use((0,re.WB)()),pe.use(ae),pe.use(ce),pe.provide("i18n",ce),pe.provide("emitter",ue),pe.mount("#app")},8326:function(e,t,n){"use strict";n.d(t,{s:function(){return r}});var a=n(3556);const r=(0,a.Q_)("global",{state:()=>({node:null,IPFSStatus:!1,auth:!1,userName:"",currency:"BTC",wallets:{},avatar:"",tooltip:"",balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,personal_APR:0,RPDE:0,networks:{cosmos:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},bostrom:{status:!1,health:0,health_color:"grey",apr:0,speed:0,availabel:0,availabel_percents:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},osmo:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},juno:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},emoney:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},stars:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},gravity:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},evm:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},cre:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},omniflix:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0},desmos:{status:!1,health:0,health_color:"grey",apr:0,speed:0,delegations_sum:0,validators:[],total_annual_provision:0,RPDE:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0}}})})},6601:function(){},9214:function(){},5568:function(){},5992:function(){},2361:function(){},4616:function(){}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={id:a,loaded:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,a,r,o){if(!a){var s=1/0;for(u=0;u<e.length;u++){a=e[u][0],r=e[u][1],o=e[u][2];for(var i=!0,c=0;c<a.length;c++)(!1&o||s>=o)&&Object.keys(n.O).every((function(e){return n.O[e](a[c])}))?a.splice(c--,1):(i=!1,o<s&&(s=o));if(i){e.splice(u--,1);var l=r();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[a,r,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,a){return n.f[a](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{217:"1897c9df",684:"87ca3b2a",763:"519c6653"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{217:"56b86346",763:"cd1a3180"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="bro_app:";n.l=function(a,r,o,s){if(e[a])e[a].push(r);else{var i,c;if(void 0!==o)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var p=l[u];if(p.getAttribute("src")==a||p.getAttribute("data-webpack")==t+o){i=p;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",t+o),i.src=a),e[a]=[r];var d=function(t,n){i.onerror=i.onload=null,clearTimeout(_);var r=e[a];if(delete e[a],i.parentNode&&i.parentNode.removeChild(i),r&&r.forEach((function(e){return e(n)})),t)return t(n)},_=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,a){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var o=function(o){if(r.onerror=r.onload=null,"load"===o.type)n();else{var s=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=s,c.request=i,r.parentNode.removeChild(r),a(c)}};return r.onerror=r.onload=o,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var r=n[a],o=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(o===e||o===t))return r}var s=document.getElementsByTagName("style");for(a=0;a<s.length;a++){r=s[a],o=r.getAttribute("data-href");if(o===e||o===t)return r}},a=function(a){return new Promise((function(r,o){var s=n.miniCssF(a),i=n.p+s;if(t(s,i))return r();e(a,i,r,o)}))},r={143:0};n.f.miniCss=function(e,t){var n={217:1,763:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=a(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,a){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)a.push(r[2]);else{var o=new Promise((function(n,a){r=e[t]=[n,a]}));a.push(r[2]=o);var s=n.p+n.u(t),i=new Error,c=function(a){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var o=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.src;i.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",i.name="ChunkLoadError",i.type=o,i.request=s,r[1](i)}};n.l(s,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,o,s=a[0],i=a[1],c=a[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(c)var u=c(n)}for(t&&t(a);l<s.length;l++)o=s[l],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},a=self["webpackChunkbro_app"]=self["webpackChunkbro_app"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(7865)}));a=n.O(a)})();
//# sourceMappingURL=app.355279f6.js.map