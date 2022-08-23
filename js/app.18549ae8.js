(function(){var e={4353:function(e,t,a){"use strict";var r=a(9242),o=a(3396),s=a(4870),n=a(2483),c={__name:"App",setup(e){const t=(0,n.yj)(),a=(0,o.Fl)((()=>t.meta.layout||"default-layout"));return(e,t)=>((0,o.wg)(),(0,o.j4)((0,o.LL)((0,s.SU)(a))))}};const i=c;var _=i,l=a(8326),p=a(7139),d={__name:"IPFS",setup(e){const t=(0,l.s)(),a=(0,o.f3)("emitter"),r=((0,o.f3)("i18n"),Ipfs.create({init:!0,start:!0,relay:{enabled:!0,hop:{enabled:!0}},EXPERIMENTAL:{pubsub:!0},config:{Addresses:{Swarm:["/dns4/ws-star.discovery.cybernode.ai/tcp/443/wss/p2p-webrtc-star"]},Bootstrap:["/dns4/ws-star.discovery.cybernode.ai/tcp/4430/wss/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB"]}}));return null!==r&&(t.$patch({node:r}),t.$patch({IPFSStatus:!0})),(e,r)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,p.C_)(["ipfs_status",{green:(0,s.SU)(t).IPFSStatus}]),onMouseover:r[0]||(r[0]=t=>(0,s.SU)(a).emit("setNotification",e.$t("message.ipfs_notice")))},[(0,o._)("div",null,(0,p.zw)(e.$t("message.ipfs")),1)],34))}},u=a(89);const h=(0,u.Z)(d,[["__scopeId","data-v-45c8dc6d"]]);var w=h;const k=e=>((0,o.dD)("data-v-40d659b3"),e=e(),(0,o.Cn)(),e),m={class:"currency"},b=k((()=>(0,o._)("svg",null,[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_arr_down"})],-1))),g={class:"dropdown"};var v={__name:"Currency",setup(e){const t=(0,l.s)();var a=(0,s.iH)(!1);function n(e){t.$patch({currency:e}),this.showDropdown=!1}return(e,c)=>((0,o.wg)(),(0,o.iD)("div",m,[(0,o._)("button",{class:(0,p.C_)(["btn",{active:(0,s.SU)(a)}]),onClick:c[0]||(c[0]=(0,r.iM)((e=>(0,s.dq)(a)?a.value=!(0,s.SU)(a):a=!(0,s.SU)(a)),["prevent"]))},[(0,o._)("span",null,(0,p.zw)((0,s.SU)(t).currency),1),b],2),(0,o._)("div",g,[(0,o._)("div",null,[(0,o._)("button",{class:(0,p.C_)(["btn",{active:"BTC"==(0,s.SU)(t).currency}]),onClick:c[1]||(c[1]=(0,r.iM)((e=>n("BTC")),["prevent"]))},"BTC",2)]),(0,o._)("div",null,[(0,o._)("button",{class:(0,p.C_)(["btn",{active:"ETH"==(0,s.SU)(t).currency}]),onClick:c[2]||(c[2]=(0,r.iM)((e=>n("ETH")),["prevent"]))},"ETH",2)]),(0,o._)("div",null,[(0,o._)("button",{class:(0,p.C_)(["btn",{active:"ATOM"==(0,s.SU)(t).currency}]),onClick:c[3]||(c[3]=(0,r.iM)((e=>n("ATOM")),["prevent"]))},"ATOM",2)]),(0,o._)("div",null,[(0,o._)("button",{class:(0,p.C_)(["btn",{active:"USDT"==(0,s.SU)(t).currency}]),onClick:c[4]||(c[4]=(0,r.iM)((e=>n("USDT")),["prevent"]))},"USDT",2)])])]))}};const f=(0,u.Z)(v,[["__scopeId","data-v-40d659b3"]]);var E=f;const P=e=>((0,o.dD)("data-v-5840a212"),e=e(),(0,o.Cn)(),e),y={class:"user"},D=P((()=>(0,o._)("div",{class:"icon"},[(0,o._)("svg",null,[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_wallet"})])],-1))),R={class:"name"},$={class:"photo"},x=["src"];var j={__name:"User",setup(e){const t=(0,l.s)();return(e,a)=>((0,o.wg)(),(0,o.iD)("div",y,[D,(0,o._)("div",R,(0,p.zw)((0,s.SU)(t).userName),1),(0,o._)("div",$,[(0,s.SU)(t).avatar?((0,o.wg)(),(0,o.iD)("img",{key:0,src:(0,s.SU)(t).avatar,alt:""},null,8,x)):(0,o.kq)("",!0)])]))}};const S=(0,u.Z)(j,[["__scopeId","data-v-5840a212"]]);var C=S;const A=e=>((0,o.dD)("data-v-62e25d21"),e=e(),(0,o.Cn)(),e),T=A((()=>(0,o._)("div",{class:"icon"},[(0,o._)("svg",null,[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_wallet"})])],-1)));var U={__name:"ConnectBtn",setup(e){const t=(0,o.f3)("emitter");return(e,a)=>((0,o.wg)(),(0,o.iD)("button",{class:"connect_btn",onClick:a[0]||(a[0]=(0,r.iM)((e=>(0,s.SU)(t).emit("connectWallet")),["prevent"]))},[T,(0,o._)("span",null,(0,p.zw)(e.$t("message.connect_wallet")),1)]))}};const O=(0,u.Z)(U,[["__scopeId","data-v-62e25d21"]]);var z=O;const q={class:"cont"},M={class:"info row"},B=(0,o._)("div",{class:"logo"},[(0,o._)("img",{src:"/logo.svg",alt:""})],-1);var F={__name:"Header",setup(e){const t=(0,l.s)();return(e,a)=>((0,o.wg)(),(0,o.iD)("header",null,[(0,o._)("div",q,[(0,o._)("div",M,[B,(0,o.Wm)(w),(0,s.SU)(t).auth?((0,o.wg)(),(0,o.j4)(E,{key:0})):(0,o.kq)("",!0),(0,s.SU)(t).auth?((0,o.wg)(),(0,o.j4)(C,{key:1})):(0,o.kq)("",!0),(0,s.SU)(t).auth?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)(z,{key:2}))])])]))}};const I=F;var N=I,H={__name:"Error",setup(e){return(e,t)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(N),(0,o.Wm)((0,s.SU)(n.MA))],64))}};const L=H;var K=L,W=a(2350),Z=a(5673);const G={class:"notifications"},Q={class:"cont"},Y={class:"data"},J=(0,o._)("div",{class:"icon"},[(0,o._)("svg",null,[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_notification"})])],-1);var X={__name:"Default",setup(e){const t=(0,o.f3)("emitter"),a=(0,o.f3)("i18n"),r=(0,l.s)();return(0,o.bv)((()=>{r.tooltip=a.global.t("message.notice_default")})),t.on("connectWallet",(async()=>{const e="cosmoshub-4";window.keplr.enable(e);const t=window.getOfflineSigner(e),a=await t.getAccounts(),o=await window.keplr.getKey(e);if(o){r.$patch({userName:o.name}),r.$patch({auth:!0});new W.SigningCosmosClient("https://lcd-cosmoshub.keplr.app/rest",a[0].address,t);r.$patch({wallets:{cosmoshub:a[0].address,bostrom:(0,Z.g6)("bostrom",(0,Z.zl)(a[0].address).data),osmosis:(0,Z.g6)("osmo",(0,Z.zl)(a[0].address).data),juno:(0,Z.g6)("juno",(0,Z.zl)(a[0].address).data),emoney:(0,Z.g6)("emoney",(0,Z.zl)(a[0].address).data),stargaze:(0,Z.g6)("stars",(0,Z.zl)(a[0].address).data),gravity:(0,Z.g6)("gravity",(0,Z.zl)(a[0].address).data),crescent:(0,Z.g6)("cre",(0,Z.zl)(a[0].address).data),omniflix:(0,Z.g6)("omniflix",(0,Z.zl)(a[0].address).data),desmos:(0,Z.g6)("desmos",(0,Z.zl)(a[0].address).data)}}),await fetch(`https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=${r.wallets.bostrom}&cyberlink.particleFrom=Qmf89bXkJH9jw4uaLkHmZkxQ51qGKfUPtAMxA8rTwBrmTs&limit=1000000`).then((e=>e.json())).then((e=>{e.txs?r.$patch({avatar:"https://ipfs.io/ipfs/"+e.txs[0].tx.value.msg[0].value.links[0].to}):r.$patch({avatar:`https://robohash.org/${r.userName.toLowerCase()}?set=set4`})}));for(let e in r.networks)await fetch(`${r.networks[e].lcd_api}/cosmos/distribution/v1beta1/delegators/${r.wallets[e]}/validators`).then((e=>e.json())).then((t=>{t.validators&&t.validators.length&&t.validators.forEach((t=>{t==r.networks[e].validator&&r.$patch((t=>t.networks[e].status=!0))}))}));await fetch("https://rpc.bronbro.io/bro_data/").then((e=>e.json())).then((e=>{e.infos.forEach((e=>{"evmos"!=e.network&&r.$patch((t=>{switch(t.networks[e.network].health=e.health,t.networks[e.network].apr=e.apr,!0){case e.health>=0&&e.health<7:t.networks[e.network].health_color="red";break;case e.health>=7&&e.health<13:t.networks[e.network].health_color="orange";break;case e.health>=13:t.networks[e.network].health_color="green";break}switch(!0){case e.apr<.15:t.networks[e.network].speed=4;break;case e.apr>=.15&&e.apr<4:t.networks[e.network].speed=4.28378-1.89189*e.apr;break;case e.apr>=4:t.networks[e.network].speed=.5;break}}))}))}));for(let e in r.networks)r.networks[e].status&&await fetch(`${r.networks[e].lcd_api}/cosmos/staking/v1beta1/delegations/${r.wallets[e]}`).then((e=>e.json())).then((t=>{if(t.delegation_responses){let a=0;t.delegation_responses.forEach((e=>a+=parseFloat(e.balance.amount))),r.$patch((t=>t.networks[e].delegations_tokens=a/t.networks[e].exponent)),"bostrom"==e&&r.$patch((e=>e.networks.bostrom.delegations_tokens=a))}}));for(let e in r.networks)r.networks[e].status&&await fetch(`${r.networks[e].lcd_api}/cosmos/distribution/v1beta1/delegators/${r.wallets[e]}/rewards`).then((e=>e.json())).then((t=>r.$patch((a=>{a.networks[e].rewards_tokens=parseFloat(t.total[0].amount)/a.networks[e].exponent,"bostrom"==e&&r.$patch((e=>e.networks.bostrom.rewards_tokens=parseFloat(t.total[0].amount)))}))));for(let e in r.networks)r.networks[e].status&&await fetch(`${r.networks[e].lcd_api}/cosmos/bank/v1beta1/balances/${r.wallets[e]}`).then((e=>e.json())).then((t=>{let a=t.balances.find((t=>t.denom==r.networks[e].denom));t.balances&&t.balances.length&&"undefined"!==typeof a&&(r.$patch((t=>t.networks[e].availabel_tokens=parseFloat(a.amount)/t.networks[e].exponent)),"bostrom"==e&&r.$patch((e=>e.networks.bostrom.availabel_tokens=parseFloat(a.amount))),r.$patch((t=>t.networks[e].tokens_sum=t.networks[e].availabel_tokens+t.networks[e].delegations_tokens+t.networks[e].rewards_tokens)),r.$patch((t=>t.networks[e].delegations_percents=100*t.networks[e].delegations_tokens/t.networks[e].tokens_sum)),r.$patch((t=>t.networks[e].rewards_percents=100*t.networks[e].rewards_tokens/t.networks[e].tokens_sum)))}));await fetch("https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd").then((e=>e.json())).then((e=>r.$patch((t=>t.ATOM_price=e.cosmos.usd)))),await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then((e=>e.json())).then((e=>r.$patch((t=>t.ETH_price=e.ethereum.usd)))),await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then((e=>e.json())).then((e=>r.$patch((t=>t.BTC_price=e.bitcoin.usd))));for(let e in r.networks)r.networks[e].status&&await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${r.networks[e].coingecko_api}&vs_currencies=usd`).then((e=>e.json())).then((t=>{t[r.networks[e].coingecko_api].usd&&(r.$patch((a=>a.networks[e].price=t[r.networks[e].coingecko_api].usd)),r.$patch((t=>t.networks[e].price_usdt=t.networks[e].price*t.networks[e].tokens_sum)),r.$patch((t=>t.networks[e].price_atom=t.networks[e].price/t.ATOM_price)),r.$patch((t=>t.networks[e].price_eth=t.networks[e].price/t.ETH_price)),r.$patch((t=>t.networks[e].price_btc=t.networks[e].price/t.BTC_price)))}));for(let e in r.networks)r.$patch((t=>t.networks[e].balance_usdt=t.networks[e].tokens_sum*t.networks[e].price)),r.$patch((t=>t.networks[e].balance_atom=t.networks[e].tokens_sum*t.networks[e].price_atom)),r.$patch((t=>t.networks[e].balance_eth=t.networks[e].tokens_sum*t.networks[e].price_eth)),r.$patch((t=>t.networks[e].balance_btc=t.networks[e].tokens_sum*t.networks[e].price_btc));for(let e in r.networks)r.$patch((t=>t.networks[e].delegations_price=t.networks[e].delegations_tokens*t.networks[e].price)),r.$patch((t=>t.networks[e].delegations_price_usdt=t.networks[e].delegations_tokens*t.networks[e].price_usdt)),r.$patch((t=>t.networks[e].delegations_price_atom=t.networks[e].delegations_tokens*t.networks[e].price_atom)),r.$patch((t=>t.networks[e].delegations_price_eth=t.networks[e].delegations_tokens*t.networks[e].price_eth)),r.$patch((t=>t.networks[e].delegations_price_btc=t.networks[e].delegations_tokens*t.networks[e].price_btc)),r.$patch((t=>t.networks[e].rewards_price=t.networks[e].rewards_tokens*t.networks[e].price)),r.$patch((t=>t.networks[e].rewards_price_usdt=t.networks[e].rewards_tokens*t.networks[e].price_usdt)),r.$patch((t=>t.networks[e].rewards_price_atom=t.networks[e].rewards_tokens*t.networks[e].price_atom)),r.$patch((t=>t.networks[e].rewards_price_eth=t.networks[e].rewards_tokens*t.networks[e].price_eth)),r.$patch((t=>t.networks[e].rewards_price_btc=t.networks[e].rewards_tokens*t.networks[e].price_btc));for(let e in r.networks)r.networks[e].status&&await fetch(`${r.networks[e].lcd_api}/cosmos/staking/v1beta1/delegators/${r.wallets[e]}/validators`).then((e=>e.json())).then((t=>{t.validators.length&&r.$patch((a=>a.networks[e].validators.push(t.validators.find((t=>t.operator_address==a.networks[e].validator))))),r.networks[e].validators.forEach((t=>{t.annual_provision=r.networks[e].delegations_tokens*r.networks[e].apr*(1-t.commission.commission_rates.rate),r.$patch((a=>a.networks[e].total_annual_provision+=t.annual_provision))})),r.$patch((t=>t.networks[e].RPDE=t.networks[e].total_annual_provision/365.3)),r.$patch((t=>t.networks[e].RPDE_usdt=t.networks[e].price_usdt*t.networks[e].RPDE)),r.$patch((t=>t.networks[e].RPDE_atom=t.networks[e].price_atom*t.networks[e].RPDE)),r.$patch((t=>t.networks[e].RPDE_eth=t.networks[e].price_eth*t.networks[e].RPDE)),r.$patch((t=>t.networks[e].RPDE_btc=t.networks[e].price_btc*t.networks[e].RPDE)),r.$patch((t=>t.networks[e].RPDE_year_usdt=365.3*t.networks[e].RPDE_usdt)),r.$patch((t=>t.networks[e].RPDE_year_atom=365.3*t.networks[e].RPDE_atom)),r.$patch((t=>t.networks[e].RPDE_year_eth=365.3*t.networks[e].RPDE_eth)),r.$patch((t=>t.networks[e].RPDE_year_btc=365.3*t.networks[e].RPDE_btc)),r.$patch((t=>t.networks[e].personal_APR=t.networks[e].total_annual_provision/r.networks[e].delegations_tokens*100))}));for(let e in r.networks)r.$patch((t=>t.delegations_price+=r.networks[e].delegations_price)),r.$patch((t=>t.balance_usdt+=r.networks[e].balance_usdt)),r.$patch((t=>t.balance_atom+=r.networks[e].balance_atom)),r.$patch((t=>t.balance_eth+=r.networks[e].balance_eth)),r.$patch((t=>t.balance_btc+=r.networks[e].balance_btc)),r.$patch((t=>t.RPDE_usdt+=r.networks[e].RPDE_usdt)),r.$patch((t=>t.RPDE_atom+=r.networks[e].RPDE_atom)),r.$patch((t=>t.RPDE_eth+=r.networks[e].RPDE_eth)),r.$patch((t=>t.RPDE_btc+=r.networks[e].RPDE_btc));console.log(r.RPDE_usdt),console.log(r.delegations_price),r.$patch((e=>e.personal_APR=365.3*e.RPDE_usdt/e.delegations_price))}})),t.on("setNotification",(function(e){r.$patch({tooltip:e})})),(e,t)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(N),(0,o._)("section",G,[(0,o._)("div",Q,[(0,o._)("div",Y,[J,(0,o._)("span",null,(0,p.zw)((0,s.SU)(r).tooltip),1)])])]),(0,o.Wm)((0,s.SU)(n.MA))],64))}};const V=X;var ee=V;const te=[{path:"/:pathMatch(.*)",name:"Error",component:()=>a.e(684).then(a.bind(a,6187)),meta:{layout:K}},{path:"/keplr_error",name:"KeplrError",component:()=>a.e(217).then(a.bind(a,4709)),meta:{layout:K}},{path:"/",name:"Dashboard",component:()=>a.e(988).then(a.bind(a,8988)),meta:{layout:ee}}],ae=(0,n.p7)({history:(0,n.PO)("/"),routes:te});ae.beforeEach((async(e,t,a)=>{window.keplr||"KeplrError"===e.name?a():ae().push({name:"KeplrError"})}));var re=ae,oe=a(3556),se=a(5658),ne={en:{message:{ipfs:"Ipfs node",ipfs_notice:"Built-in IPFS node is active.",error_title_404:"Page was lost in space.... Are you sure that it exist?",keplr_error_title:"Oooops, seems you don't have<br> a Keplr extension",keplr_install_btn:"Install Keplr",connect_wallet:"Connect wallet",details:"Details",personal_apr:"Personal APR",RPDE:"RPDE",notice_default:"Bro_n_Bro foundation has come to light at early 2021 as a Validator for Cosmos Ecosystem. Some time after we started relaying and expanding other services to networks and projects."}}};const ce=(0,se.o)({locale:"en",fallbackLocale:"en",messages:ne});var ie=ce,_e=a(1373);const le=(0,_e.Z)(),pe=(0,r.ri)(_);pe.config.globalProperties.$filters={toFixed(e,t){return e.toFixed(t)}},pe.use((0,oe.WB)()),pe.use(re),pe.use(ie),pe.provide("i18n",ie),pe.provide("emitter",le),pe.mount("#app")},8326:function(e,t,a){"use strict";a.d(t,{s:function(){return o}});var r=a(3556);const o=(0,r.Q_)("global",{state:()=>({node:null,IPFSStatus:!1,auth:!1,userName:"",currency:"BTC",wallets:{},avatar:"",tooltip:"",BTC_price:0,ETH_price:0,ATOM_price:0,delegations_price:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,personal_APR:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,networks:{cosmoshub:{name:"Cosmos hub",status:!1,lcd_api:"https://lcd.cosmoshub-4.bronbro.io",validator:"cosmosvaloper106yp7zw35wftheyyv9f9pe69t8rteumjrx52jg",coingecko_api:"cosmos",denom:"uatom",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},bostrom:{name:"Bostrom",status:!1,lcd_api:"https://lcd.bostrom.bronbro.io",validator:"bostromvaloper1ydc5fy9fjdygvgw36u49yj39fr67pd9m5qexm8",coingecko_api:"bostrom",denom:"boot",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},osmosis:{name:"Osmosis",status:!1,lcd_api:"https://lcd.osmosis-1.bronbro.io",validator:"osmovaloper13tk45jkxgf7w0nxquup3suwaz2tx483xe832ge",coingecko_api:"osmosis",denom:"uosmo",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},juno:{name:"Juno",status:!1,lcd_api:"https://lcd.juno-1.bronbro.io",validator:"junovaloper1quqxfrxkycr0uzt4yk0d57tcq3zk7srm7sm6r8",coingecko_api:"juno-network",denom:"ujuno",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},emoney:{name:"E-money",status:!1,lcd_api:"https://lcd.emoney-3.bronbro.io",validator:"emoneyvaloper149vyxd36kxpg46rralaw6eejv4d9daqc3nv642",coingecko_api:"e-money",denom:"ungm",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},stargaze:{name:"Stargaze",status:!1,lcd_api:"https://lcd.stargaze-1.bronbro.io",validator:"starsvaloper1y58hfnm90r4efhlydx0gavz57lvm7k6uulkg3h",coingecko_api:"stargaze",denom:"ustars",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},gravity:{name:"G-Bridge",status:!1,lcd_api:"https://lcd.gravity-bridge-3.bronbro.io",validator:"gravityvaloper1vyd4k5j636erx5y5kdqghdu3rfjtwc48vdc7r6",coingecko_api:"graviton",denom:"ugraviton",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},crescent:{name:"Crescent hub",status:!1,lcd_api:"https://lcd.crescent-1.bronbro.io",validator:"crevaloper1c96vvme4k42zlvkc56fslmdpa2qj6u80xvqwau",coingecko_api:"crescent-network",denom:"ucre",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},omniflix:{name:"Omniflix hub",status:!1,lcd_api:"https://lcd.omniflixhub-1.bronbro.io",validator:"omniflixvaloper1e8grpphncncw9hrutyvnlv77n5dejwcne58zk4",coingecko_api:"omniflix-network",denom:"uflix",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},desmos:{name:"Desmos",status:!1,lcd_api:"https://lcd.desmos-mainnet.bronbro.io",validator:"desmosvaloper1sykf8q94l8q8mqstf64ptuvp74ueyehxpgcq76",coingecko_api:"desmos",denom:"udsm",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0}}})})},6601:function(){},9214:function(){},5568:function(){},5992:function(){},2361:function(){},4616:function(){}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(s.exports,s,s.exports,a),s.loaded=!0,s.exports}a.m=e,function(){a.amdO={}}(),function(){var e=[];a.O=function(t,r,o,s){if(!r){var n=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],s=e[l][2];for(var c=!0,i=0;i<r.length;i++)(!1&s||n>=s)&&Object.keys(a.O).every((function(e){return a.O[e](r[i])}))?r.splice(i--,1):(c=!1,s<n&&(n=s));if(c){e.splice(l--,1);var _=o();void 0!==_&&(t=_)}}return t}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[r,o,s]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,r){return a.f[r](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{217:"e8a480ee",684:"092ae1c2",988:"ae992657"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{217:"56b86346",988:"2206eeba"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="bro_app:";a.l=function(r,o,s,n){if(e[r])e[r].push(o);else{var c,i;if(void 0!==s)for(var _=document.getElementsByTagName("script"),l=0;l<_.length;l++){var p=_[l];if(p.getAttribute("src")==r||p.getAttribute("data-webpack")==t+s){c=p;break}}c||(i=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.setAttribute("data-webpack",t+s),c.src=r),e[r]=[o];var d=function(t,a){c.onerror=c.onload=null,clearTimeout(u);var o=e[r];if(delete e[r],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(a)})),t)return t(a)},u=setTimeout(d.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=d.bind(null,c.onerror),c.onload=d.bind(null,c.onload),i&&document.head.appendChild(c)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){a.p="/"}(),function(){var e=function(e,t,a,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var s=function(s){if(o.onerror=o.onload=null,"load"===s.type)a();else{var n=s&&("load"===s.type?"missing":s.type),c=s&&s.target&&s.target.href||t,i=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");i.code="CSS_CHUNK_LOAD_FAILED",i.type=n,i.request=c,o.parentNode.removeChild(o),r(i)}};return o.onerror=o.onload=s,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var a=document.getElementsByTagName("link"),r=0;r<a.length;r++){var o=a[r],s=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(s===e||s===t))return o}var n=document.getElementsByTagName("style");for(r=0;r<n.length;r++){o=n[r],s=o.getAttribute("data-href");if(s===e||s===t)return o}},r=function(r){return new Promise((function(o,s){var n=a.miniCssF(r),c=a.p+n;if(t(n,c))return o();e(r,c,o,s)}))},o={143:0};a.f.miniCss=function(e,t){var a={217:1,988:1};o[e]?t.push(o[e]):0!==o[e]&&a[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};a.f.j=function(t,r){var o=a.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var s=new Promise((function(a,r){o=e[t]=[a,r]}));r.push(o[2]=s);var n=a.p+a.u(t),c=new Error,i=function(r){if(a.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var s=r&&("load"===r.type?"missing":r.type),n=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+s+": "+n+")",c.name="ChunkLoadError",c.type=s,c.request=n,o[1](c)}};a.l(n,i,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,s,n=r[0],c=r[1],i=r[2],_=0;if(n.some((function(t){return 0!==e[t]}))){for(o in c)a.o(c,o)&&(a.m[o]=c[o]);if(i)var l=i(a)}for(t&&t(r);_<n.length;_++)s=n[_],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(l)},r=self["webpackChunkbro_app"]=self["webpackChunkbro_app"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(4353)}));r=a.O(r)})();
//# sourceMappingURL=app.18549ae8.js.map