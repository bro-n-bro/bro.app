(function(){"use strict";var e={3669:function(e,t,a){var o=a(9242),n=a(3396),s=a(4870),r=a(2483),i={__name:"App",setup(e){const t=(0,r.yj)(),a=(0,n.Fl)((()=>t.meta.layout||"default-layout"));return(e,t)=>((0,n.wg)(),(0,n.j4)((0,n.LL)((0,s.SU)(a))))}};const c=i;var _=c,l=a(8326),d=a(7139),p={__name:"IPFS",setup(e){const t=(0,l.s)(),a=(0,n.f3)("emitter"),o=((0,n.f3)("i18n"),Ipfs.create({init:!0,start:!0,relay:{enabled:!0,hop:{enabled:!0}},EXPERIMENTAL:{pubsub:!0},config:{Addresses:{Swarm:["/dns4/ws-star.discovery.cybernode.ai/tcp/443/wss/p2p-webrtc-star"]},Bootstrap:["/dns4/ws-star.discovery.cybernode.ai/tcp/4430/wss/p2p/QmUgmRxoLtGERot7Y6G7UyF6fwvnusQZfGR15PuE6pY3aB"]}}));return null!==o&&(t.$patch({node:o}),t.$patch({IPFSStatus:!0})),(e,o)=>((0,n.wg)(),(0,n.iD)("div",{class:(0,d.C_)(["ipfs_status",{green:(0,s.SU)(t).IPFSStatus}]),onMouseover:o[0]||(o[0]=t=>(0,s.SU)(a).emit("setNotification",e.$t("message.ipfs_notice")))},[(0,n._)("div",null,(0,d.zw)(e.$t("message.ipfs")),1)],34))}},u=a(89);const m=(0,u.Z)(p,[["__scopeId","data-v-45c8dc6d"]]);var b=m;const h=e=>((0,n.dD)("data-v-c4f493f2"),e=e(),(0,n.Cn)(),e),w={class:"currency"},g=h((()=>(0,n._)("svg",null,[(0,n._)("use",{"xlink:href":"/sprite.svg#ic_arr_down"})],-1))),k={class:"dropdown"};var v={__name:"Currency",setup(e){const t=(0,l.s)();var a=(0,s.iH)(!1);function r(e){t.$patch({currency:e}),this.showDropdown=!this.showDropdown}return(e,i)=>((0,n.wg)(),(0,n.iD)("div",w,[(0,n._)("button",{class:(0,d.C_)(["btn",{active:(0,s.SU)(a)}]),onClick:i[0]||(i[0]=(0,o.iM)((e=>(0,s.dq)(a)?a.value=!(0,s.SU)(a):a=!(0,s.SU)(a)),["prevent"]))},[(0,n._)("span",null,(0,d.zw)((0,s.SU)(t).currency),1),g],2),(0,n._)("div",k,[(0,n._)("div",null,[(0,n._)("button",{class:(0,d.C_)(["btn",{active:"BTC"==(0,s.SU)(t).currency}]),onClick:i[1]||(i[1]=(0,o.iM)((e=>r("BTC")),["prevent"]))},"BTC",2)]),(0,n._)("div",null,[(0,n._)("button",{class:(0,d.C_)(["btn",{active:"ETH"==(0,s.SU)(t).currency}]),onClick:i[2]||(i[2]=(0,o.iM)((e=>r("ETH")),["prevent"]))},"ETH",2)]),(0,n._)("div",null,[(0,n._)("button",{class:(0,d.C_)(["btn",{active:"ATOM"==(0,s.SU)(t).currency}]),onClick:i[3]||(i[3]=(0,o.iM)((e=>r("ATOM")),["prevent"]))},"ATOM",2)]),(0,n._)("div",null,[(0,n._)("button",{class:(0,d.C_)(["btn",{active:"USDT"==(0,s.SU)(t).currency}]),onClick:i[4]||(i[4]=(0,o.iM)((e=>r("USDT")),["prevent"]))},"USDT",2)])])]))}};const f=(0,u.Z)(v,[["__scopeId","data-v-c4f493f2"]]);var y=f;const E=e=>((0,n.dD)("data-v-5840a212"),e=e(),(0,n.Cn)(),e),P={class:"user"},D=E((()=>(0,n._)("div",{class:"icon"},[(0,n._)("svg",null,[(0,n._)("use",{"xlink:href":"/sprite.svg#ic_wallet"})])],-1))),R={class:"name"},$={class:"photo"},x=["src"];var S={__name:"User",setup(e){const t=(0,l.s)();return(e,a)=>((0,n.wg)(),(0,n.iD)("div",P,[D,(0,n._)("div",R,(0,d.zw)((0,s.SU)(t).userName),1),(0,n._)("div",$,[(0,s.SU)(t).avatar?((0,n.wg)(),(0,n.iD)("img",{key:0,src:(0,s.SU)(t).avatar,alt:""},null,8,x)):(0,n.kq)("",!0)])]))}};const C=(0,u.Z)(S,[["__scopeId","data-v-5840a212"]]);var j=C;const A=e=>((0,n.dD)("data-v-62e25d21"),e=e(),(0,n.Cn)(),e),z=A((()=>(0,n._)("div",{class:"icon"},[(0,n._)("svg",null,[(0,n._)("use",{"xlink:href":"/sprite.svg#ic_wallet"})])],-1)));var M={__name:"ConnectBtn",setup(e){const t=(0,n.f3)("emitter");return(e,a)=>((0,n.wg)(),(0,n.iD)("button",{class:"connect_btn",onClick:a[0]||(a[0]=(0,o.iM)((e=>(0,s.SU)(t).emit("connectWallet")),["prevent"]))},[z,(0,n._)("span",null,(0,d.zw)(e.$t("message.connect_wallet")),1)]))}};const O=(0,u.Z)(M,[["__scopeId","data-v-62e25d21"]]);var T=O;const B={class:"cont"},U={class:"info row"},q=(0,n._)("div",{class:"logo"},[(0,n._)("img",{src:"/logo.svg",alt:""})],-1);var F={__name:"Header",setup(e){const t=(0,l.s)();return(e,a)=>((0,n.wg)(),(0,n.iD)("header",null,[(0,n._)("div",B,[(0,n._)("div",U,[q,(0,n.Wm)(b),(0,s.SU)(t).auth?((0,n.wg)(),(0,n.j4)(y,{key:0})):(0,n.kq)("",!0),(0,s.SU)(t).auth?((0,n.wg)(),(0,n.j4)(j,{key:1})):(0,n.kq)("",!0),(0,s.SU)(t).auth?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(T,{key:2}))])])]))}};const H=F;var I=H,N={__name:"Error",setup(e){return(e,t)=>((0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(I),(0,n.Wm)((0,s.SU)(r.MA))],64))}};const L=N;var K=L,W=a.p+"img/logo_mini_black.6b4e25f2.svg";const V={class:"modal",id:"manage_modal"},Z={class:"modal_content"},G={class:"data"},Q=(0,n._)("svg",{class:"icon"},[(0,n._)("use",{"xlink:href":"/sprite.svg#ic_close"})],-1),Y=[Q],X=["onSubmit"],J={class:"type"},ee=(0,n._)("input",{type:"radio",name:"type",value:"delegate",checked:""},null,-1),te=(0,n._)("input",{type:"radio",name:"type",value:"redelegate"},null,-1),ae={class:"validator"},oe=(0,n._)("div",{class:"logo"},[(0,n._)("img",{src:W,alt:""})],-1),ne={class:"name"},se={class:"commission"},re=(0,n._)("span",{class:"sep"},"—",-1),ie={class:"notice"},ce={class:"title"},_e={class:"desc"},le={class:"tokens"},de={class:"label"},pe=(0,n._)("div",{class:"val"},"3.37K EVMOS",-1),ue={class:"label"},me=(0,n._)("div",{class:"val"},"0.64 EVMOS",-1),be={class:"amount"},he={class:"label"},we={class:"field"},ge=(0,n._)("input",{type:"number",name:"amount",value:"",class:"input"},null,-1),ke=(0,n._)("div",{class:"unit"},"EVMOS",-1),ve={type:"button",class:"max_btn"},fe={class:"validate_from"},ye={class:"label"},Ee=(0,n.uE)('<div class="field"><input type="text" name="validator" value="Bro_n_Bro" class="input" readonly><div class="arr"><svg><use xlink:href="/sprite.svg#ic_arr_down"></use></svg></div><button type="button" class="clear_btn"><svg><use xlink:href="/sprite.svg#ic_close"></use></svg></button><div class="dropdown"><div class="scroll"><div><button type="button" class="btn active">Bro_n_bro</button></div><div><button type="button" class="btn">stake.fish</button></div><div><button type="button" class="btn">Binance Staking</button></div><div><button type="button" class="btn">DokiaCapital</button></div><div><button type="button" class="btn">stake.fish</button></div><div><button type="button" class="btn">Binance Staking</button></div><div><button type="button" class="btn">DokiaCapital</button></div><div><button type="button" class="btn">stake.fish</button></div><div><button type="button" class="btn">Binance Staking</button></div><div><button type="button" class="btn">DokiaCapital</button></div><div><button type="button" class="btn">stake.fish</button></div><div><button type="button" class="btn">Binance Staking</button></div><div><button type="button" class="btn">DokiaCapital</button></div></div></div></div>',1),Pe={class:"fees"},De={class:"btns"},Re={type:"submit",class:"btn submit_btn"};var $e={__name:"ManageModal",setup(e){const t=5;function a(){}return(e,s)=>((0,n.wg)(),(0,n.iD)("section",V,[(0,n._)("div",Z,[(0,n._)("div",G,[(0,n._)("button",{class:"close_btn",onClick:s[0]||(s[0]=(0,o.iM)((t=>e.emitter.emit("close_manage_modal")),["prevent"]))},Y),(0,n._)("form",{class:"form",onSubmit:(0,o.iM)(a,["prevent"])},[(0,n._)("div",J,[(0,n._)("label",null,[ee,(0,n._)("div",null,(0,d.zw)(e.$t("message.manage_modal_action_delegate")),1)]),(0,n._)("label",null,[te,(0,n._)("div",null,(0,d.zw)(e.$t("message.manage_modal_action_redelegate")),1)])]),(0,n._)("div",ae,[oe,(0,n._)("div",null,[(0,n._)("div",ne,(0,d.zw)(e.$t("message.manage_modal_validator_name")),1),(0,n._)("div",se,[(0,n.Uk)((0,d.zw)(e.$t("message.manage_modal_commission"))+" ",1),re,(0,n._)("span",{class:"val"},(0,d.zw)(t)+"%")])])]),(0,n._)("div",ie,[(0,n._)("div",ce,(0,d.zw)(e.$t("message.manage_modal_notice_title")),1),(0,n._)("div",_e,(0,d.zw)(e.$t("message.manage_modal_notice_desc")),1)]),(0,n._)("div",le,[(0,n._)("div",null,[(0,n._)("div",de,(0,d.zw)(e.$t("message.manage_modal_my_delegation")),1),pe]),(0,n._)("div",null,[(0,n._)("div",ue,(0,d.zw)(e.$t("message.manage_modal_available_balance")),1),me])]),(0,n._)("div",be,[(0,n._)("div",he,(0,d.zw)(e.$t("message.manage_modal_amount")),1),(0,n._)("div",we,[ge,ke,(0,n._)("button",ve,(0,d.zw)(e.$t("message.manage_modal_max_btn")),1)])]),(0,n._)("div",fe,[(0,n._)("div",ye,(0,d.zw)(e.$t("message.manage_modal_validator_label")),1),Ee,(0,n._)("div",Pe,(0,d.zw)(e.$t("message.manage_modal_fees",{value:1e-4,currency:"EVMOS"})),1)]),(0,n._)("div",De,[(0,n._)("button",{type:"button",class:"btn close_btn",onClick:s[1]||(s[1]=(0,o.iM)((t=>e.emitter.emit("close_manage_modal")),["prevent"]))},(0,d.zw)(e.$t("message.manage_modal_back_btn")),1),(0,n._)("button",Re,(0,d.zw)(e.$t("message.manage_modal_delegate_btn")),1)])],40,X)])]),(0,n._)("div",{class:"overlay",onClick:s[2]||(s[2]=(0,o.iM)((t=>e.emitter.emit("close_manage_modal")),["prevent"]))})]))}};const xe=$e;var Se=xe,Ce=a(5673);const je={class:"notifications"},Ae={class:"cont"},ze={class:"data"},Me=(0,n._)("div",{class:"icon"},[(0,n._)("svg",null,[(0,n._)("use",{"xlink:href":"/sprite.svg#ic_notification"})])],-1);var Oe={__name:"Default",setup(e){const t=(0,n.f3)("emitter"),a=(0,n.f3)("i18n"),o=(0,l.s)();var i=(0,s.iH)(!1);return(0,n.bv)((()=>{o.tooltip=a.global.t("message.notice_default"),window.addEventListener("keplr_keystorechange",(()=>{window.location.reload(),o.$reset()}))})),t.on("connectWallet",(async()=>{const e="cosmoshub-4",t="desmos-mainnet",a="evmos_9001-2";window.keplr.enable(e);const n=window.getOfflineSigner(t),s=await n.getAccounts(),r=window.getOfflineSigner(a),i=await r.getAccounts(),c=window.getOfflineSigner(e),_=await c.getAccounts(),l=await window.keplr.getKey(e);if(l){o.$patch({userName:l.name}),o.$patch({auth:!0}),o.$patch({wallets:{cosmoshub:_[0].address,bostrom:(0,Ce.g6)("bostrom",(0,Ce.zl)(_[0].address).data),osmosis:(0,Ce.g6)("osmo",(0,Ce.zl)(_[0].address).data),juno:(0,Ce.g6)("juno",(0,Ce.zl)(_[0].address).data),emoney:(0,Ce.g6)("emoney",(0,Ce.zl)(_[0].address).data),stargaze:(0,Ce.g6)("stars",(0,Ce.zl)(_[0].address).data),gravity:(0,Ce.g6)("gravity",(0,Ce.zl)(_[0].address).data),evmos:i[0].address,crescent:(0,Ce.g6)("cre",(0,Ce.zl)(_[0].address).data),omniflix:(0,Ce.g6)("omniflix",(0,Ce.zl)(_[0].address).data),desmos:s[0].address}}),await fetch(`https://lcd.bostrom.cybernode.ai/txs?cyberlink.neuron=${o.wallets.bostrom}&cyberlink.particleFrom=Qmf89bXkJH9jw4uaLkHmZkxQ51qGKfUPtAMxA8rTwBrmTs&limit=1000000`).then((e=>e.json())).then((e=>{e.txs?o.$patch({avatar:"https://ipfs.io/ipfs/"+e.txs[0].tx.value.msg[0].value.links[0].to}):o.$patch({avatar:`https://robohash.org/${o.userName.toLowerCase()}?set=set4`})}));for(let e in o.networks)await fetch(`${o.networks[e].lcd_api}/cosmos/distribution/v1beta1/delegators/${o.wallets[e]}/validators`).then((e=>e.json())).then((t=>{t.validators&&t.validators.length&&t.validators.forEach((t=>{t==o.networks[e].validator&&o.$patch((t=>t.networks[e].status=!0))}))}));await fetch("https://rpc.bronbro.io/bro_data/").then((e=>e.json())).then((e=>{e.infos.forEach((e=>{o.$patch((t=>{switch(t.networks[e.network].health=e.health,t.networks[e.network].apr=e.apr,!0){case e.health>=0&&e.health<7:t.networks[e.network].health_color="red";break;case e.health>=7&&e.health<13:t.networks[e.network].health_color="orange";break;case e.health>=13:t.networks[e.network].health_color="green";break}switch(!0){case e.apr<.15:t.networks[e.network].speed=4;break;case e.apr>=.15&&e.apr<4:t.networks[e.network].speed=4.28378-1.89189*e.apr;break;case e.apr>=4:t.networks[e.network].speed=.5;break}}))}))}));for(let e in o.networks)o.networks[e].status&&await fetch(`${o.networks[e].lcd_api}/cosmos/staking/v1beta1/delegations/${o.wallets[e]}`).then((e=>e.json())).then((t=>{if(t.delegation_responses){let a=0;t.delegation_responses.forEach((e=>a+=parseFloat(e.balance.amount))),o.$patch((t=>t.networks[e].delegations_tokens=a/t.networks[e].exponent)),"bostrom"==e&&o.$patch((e=>e.networks.bostrom.delegations_tokens=a))}}));for(let e in o.networks)o.networks[e].status&&await fetch(`${o.networks[e].lcd_api}/cosmos/distribution/v1beta1/delegators/${o.wallets[e]}/rewards`).then((e=>e.json())).then((t=>o.$patch((a=>{a.networks[e].rewards_tokens=parseFloat(t.total[0].amount)/a.networks[e].exponent,"bostrom"==e&&o.$patch((e=>e.networks.bostrom.rewards_tokens=parseFloat(t.total[0].amount)))}))));for(let e in o.networks)o.networks[e].status&&await fetch(`${o.networks[e].lcd_api}/cosmos/bank/v1beta1/balances/${o.wallets[e]}`).then((e=>e.json())).then((t=>{let a=t.balances.find((t=>t.denom==o.networks[e].denom));t.balances&&t.balances.length&&"undefined"!==typeof a&&(o.$patch((t=>t.networks[e].availabel_tokens=parseFloat(a.amount)/t.networks[e].exponent)),"bostrom"==e&&o.$patch((e=>e.networks.bostrom.availabel_tokens=parseFloat(a.amount)))),o.$patch((t=>t.networks[e].tokens_sum=t.networks[e].availabel_tokens+t.networks[e].delegations_tokens+t.networks[e].rewards_tokens)),o.$patch((t=>t.networks[e].delegations_percents=100*t.networks[e].delegations_tokens/t.networks[e].tokens_sum)),o.$patch((t=>t.networks[e].rewards_percents=100*t.networks[e].rewards_tokens/t.networks[e].tokens_sum))}));await fetch("https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd").then((e=>e.json())).then((e=>o.$patch((t=>t.ATOM_price=e.cosmos.usd)))),await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then((e=>e.json())).then((e=>o.$patch((t=>t.ETH_price=e.ethereum.usd)))),await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then((e=>e.json())).then((e=>o.$patch((t=>t.BTC_price=e.bitcoin.usd))));for(let e in o.networks)o.networks[e].status&&await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${o.networks[e].coingecko_api}&vs_currencies=usd`).then((e=>e.json())).then((t=>{t[o.networks[e].coingecko_api].usd&&(o.$patch((a=>a.networks[e].price=t[o.networks[e].coingecko_api].usd)),o.$patch((a=>a.networks[e].price_usdt=t[o.networks[e].coingecko_api].usd)),o.$patch((t=>t.networks[e].price_atom=t.networks[e].price/t.ATOM_price)),o.$patch((t=>t.networks[e].price_eth=t.networks[e].price/t.ETH_price)),o.$patch((t=>t.networks[e].price_btc=t.networks[e].price/t.BTC_price)))}));for(let e in o.networks)o.$patch((t=>t.networks[e].balance_usdt=t.networks[e].tokens_sum*t.networks[e].price)),o.$patch((t=>t.networks[e].balance_atom=t.networks[e].tokens_sum*t.networks[e].price_atom)),o.$patch((t=>t.networks[e].balance_eth=t.networks[e].tokens_sum*t.networks[e].price_eth)),o.$patch((t=>t.networks[e].balance_btc=t.networks[e].tokens_sum*t.networks[e].price_btc));for(let e in o.networks)o.$patch((t=>t.networks[e].delegations_price=t.networks[e].delegations_tokens*t.networks[e].price)),o.$patch((t=>t.networks[e].delegations_price_usdt=t.networks[e].delegations_tokens*t.networks[e].price_usdt)),o.$patch((t=>t.networks[e].delegations_price_atom=t.networks[e].delegations_tokens*t.networks[e].price_atom)),o.$patch((t=>t.networks[e].delegations_price_eth=t.networks[e].delegations_tokens*t.networks[e].price_eth)),o.$patch((t=>t.networks[e].delegations_price_btc=t.networks[e].delegations_tokens*t.networks[e].price_btc)),o.$patch((t=>t.networks[e].rewards_price=t.networks[e].rewards_tokens*t.networks[e].price)),o.$patch((t=>t.networks[e].rewards_price_usdt=t.networks[e].rewards_tokens*t.networks[e].price_usdt)),o.$patch((t=>t.networks[e].rewards_price_atom=t.networks[e].rewards_tokens*t.networks[e].price_atom)),o.$patch((t=>t.networks[e].rewards_price_eth=t.networks[e].rewards_tokens*t.networks[e].price_eth)),o.$patch((t=>t.networks[e].rewards_price_btc=t.networks[e].rewards_tokens*t.networks[e].price_btc));for(let e in o.networks)o.networks[e].status&&await fetch(`${o.networks[e].lcd_api}/cosmos/staking/v1beta1/delegators/${o.wallets[e]}/validators`).then((e=>e.json())).then((t=>{t.validators.length&&o.$patch((a=>a.networks[e].validators.push(t.validators.find((t=>t.operator_address==a.networks[e].validator))))),o.networks[e].validators.forEach((t=>{t.annual_provision=o.networks[e].delegations_tokens*o.networks[e].apr*(1-t.commission.commission_rates.rate),o.$patch((a=>a.networks[e].total_annual_provision+=t.annual_provision))})),o.$patch((t=>t.networks[e].RPDE=t.networks[e].total_annual_provision/365.3)),o.$patch((t=>t.networks[e].RPDE_usdt=t.networks[e].price_usdt*t.networks[e].RPDE)),o.$patch((t=>t.networks[e].RPDE_atom=t.networks[e].price_atom*t.networks[e].RPDE)),o.$patch((t=>t.networks[e].RPDE_eth=t.networks[e].price_eth*t.networks[e].RPDE)),o.$patch((t=>t.networks[e].RPDE_btc=t.networks[e].price_btc*t.networks[e].RPDE)),o.$patch((t=>t.networks[e].RPDE_year_usdt=365.3*t.networks[e].RPDE_usdt)),o.$patch((t=>t.networks[e].RPDE_year_atom=365.3*t.networks[e].RPDE_atom)),o.$patch((t=>t.networks[e].RPDE_year_eth=365.3*t.networks[e].RPDE_eth)),o.$patch((t=>t.networks[e].RPDE_year_btc=365.3*t.networks[e].RPDE_btc)),o.$patch((t=>t.networks[e].personal_APR=t.networks[e].total_annual_provision/o.networks[e].delegations_tokens*100))}));for(let e in o.networks)o.$patch((t=>t.account.delegations_price+=o.networks[e].delegations_price)),o.$patch((t=>t.account.balance_usdt+=o.networks[e].balance_usdt)),o.$patch((t=>t.account.balance_atom+=o.networks[e].balance_atom)),o.$patch((t=>t.account.balance_eth+=o.networks[e].balance_eth)),o.$patch((t=>t.account.balance_btc+=o.networks[e].balance_btc)),o.$patch((t=>t.account.RPDE_usdt+=o.networks[e].RPDE_usdt)),o.$patch((t=>t.account.RPDE_atom+=o.networks[e].RPDE_atom)),o.$patch((t=>t.account.RPDE_eth+=o.networks[e].RPDE_eth)),o.$patch((t=>t.account.RPDE_btc+=o.networks[e].RPDE_btc));0!=o.account.delegations_price&&o.$patch((e=>e.account.personal_APR=365.3*e.account.RPDE_usdt/e.account.delegations_price*100))}})),t.on("setNotification",(function(e){o.$patch({tooltip:e})})),t.on("open_manage_modal",(function(){i=!i})),t.on("close_manage_modal",(function(){i=!i})),(e,t)=>((0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(I),(0,n._)("section",je,[(0,n._)("div",Ae,[(0,n._)("div",ze,[Me,(0,n._)("span",null,(0,d.zw)((0,s.SU)(o).tooltip),1)])])]),(0,n.Wm)((0,s.SU)(r.MA)),(0,s.SU)(i)?((0,n.wg)(),(0,n.j4)(Se,{key:0})):(0,n.kq)("",!0)],64))}};const Te=Oe;var Be=Te;const Ue=[{path:"/:pathMatch(.*)",name:"Error",component:()=>a.e(684).then(a.bind(a,6187)),meta:{layout:K}},{path:"/keplr_error",name:"KeplrError",component:()=>a.e(217).then(a.bind(a,4709)),meta:{layout:K}},{path:"/",name:"Dashboard",component:()=>a.e(50).then(a.bind(a,5050)),meta:{layout:Be}}],qe=(0,r.p7)({history:(0,r.PO)("/"),routes:Ue});qe.beforeEach((async(e,t,a)=>{window.keplr||"KeplrError"===e.name?a():qe().push({name:"KeplrError"})}));var Fe=qe,He=a(3556),Ie=a(5658),Ne={en:{message:{ipfs:"Ipfs node",ipfs_notice:"Built-in IPFS node is active.",error_title_404:"Page was lost in space.... Are you sure that it exist?",keplr_error_title:"Oooops, seems you don't have<br> a Keplr extension",keplr_install_btn:"Install Keplr",connect_wallet:"Connect wallet",details:"Details",delegate_btn:"Delegate to your Bro",personal_apr:"Personal APR",RPDE:"RPDE",notice_default:"Bro_n_Bro foundation has come to light at early 2021 as a Validator for Cosmos Ecosystem. Some time after we started relaying and expanding other services to networks and projects.",manage_modal_action_delegate:"Delegate",manage_modal_action_redelegate:"Redelegate",manage_modal_validator_name:"Bro_n_Bro",manage_modal_commission:"Commission",manage_modal_notice_title:"Staking will lock up your funds for 14 days",manage_modal_notice_desc:"Once you undelegate your staked EVMOS, you will need to wait 14 days for your tokens to be liquid",manage_modal_my_delegation:"My delegation",manage_modal_available_balance:"Available Balance",manage_modal_amount:"Amount to Delegate",manage_modal_max_btn:"MAX",manage_modal_validator_label:"Validator from Redelegate",manage_modal_fees:"{value} {currency} is reserved for transcation fees",manage_modal_back_btn:"Back",manage_modal_delegate_btn:"Delegate"}}};const Le=(0,Ie.o)({locale:"en",fallbackLocale:"en",messages:Ne});var Ke=Le,We=a(1373);const Ve=(0,We.Z)(),Ze=(0,o.ri)(_);Ze.config.globalProperties.$filters={toFixed(e,t){return e.toFixed(t)}},Ze.use((0,He.WB)()),Ze.use(Fe),Ze.use(Ke),Ze.provide("i18n",Ke),Ze.provide("emitter",Ve),Ze.mount("#app")},8326:function(e,t,a){a.d(t,{s:function(){return r}});var o=a(3556);const n={delegations_price:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,personal_APR:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0},s={cosmoshub:{name:"Cosmos hub",status:!1,lcd_api:"https://lcd.cosmoshub-4.bronbro.io",validator:"cosmosvaloper106yp7zw35wftheyyv9f9pe69t8rteumjrx52jg",coingecko_api:"cosmos",denom:"uatom",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},bostrom:{name:"Bostrom",status:!1,lcd_api:"https://lcd.bostrom.bronbro.io",validator:"bostromvaloper1ydc5fy9fjdygvgw36u49yj39fr67pd9m5qexm8",coingecko_api:"bostrom",denom:"boot",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},osmosis:{name:"Osmosis",status:!1,lcd_api:"https://lcd.osmosis-1.bronbro.io",validator:"osmovaloper13tk45jkxgf7w0nxquup3suwaz2tx483xe832ge",coingecko_api:"osmosis",denom:"uosmo",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},juno:{name:"Juno",status:!1,lcd_api:"https://lcd.juno-1.bronbro.io",validator:"junovaloper1quqxfrxkycr0uzt4yk0d57tcq3zk7srm7sm6r8",coingecko_api:"juno-network",denom:"ujuno",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},emoney:{name:"E-money",status:!1,lcd_api:"https://lcd.emoney-3.bronbro.io",validator:"emoneyvaloper149vyxd36kxpg46rralaw6eejv4d9daqc3nv642",coingecko_api:"e-money",denom:"ungm",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},stargaze:{name:"Stargaze",status:!1,lcd_api:"https://lcd.stargaze-1.bronbro.io",validator:"starsvaloper1y58hfnm90r4efhlydx0gavz57lvm7k6uulkg3h",coingecko_api:"stargaze",denom:"ustars",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},gravity:{name:"G-Bridge",status:!1,lcd_api:"https://lcd.gravity-bridge-3.bronbro.io",validator:"gravityvaloper1vyd4k5j636erx5y5kdqghdu3rfjtwc48vdc7r6",coingecko_api:"graviton",denom:"ugraviton",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},evmos:{name:"Evmos",status:!1,lcd_api:"https://lcd.evmos-9001-2.bronbro.io",validator:"evmosvaloper1ce4vh0e5kanlgc7z0rhcemvd8erjnfzcyfecl7",coingecko_api:"evmos",denom:"evmos",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e18,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},crescent:{name:"Crescent hub",status:!1,lcd_api:"https://lcd.crescent-1.bronbro.io",validator:"crevaloper1c96vvme4k42zlvkc56fslmdpa2qj6u80xvqwau",coingecko_api:"crescent-network",denom:"ucre",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},omniflix:{name:"Omniflix hub",status:!1,lcd_api:"https://lcd.omniflixhub-1.bronbro.io",validator:"omniflixvaloper1e8grpphncncw9hrutyvnlv77n5dejwcne58zk4",coingecko_api:"omniflix-network",denom:"uflix",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0},desmos:{name:"Desmos",status:!1,lcd_api:"https://lcd.desmos-mainnet.bronbro.io",validator:"desmosvaloper1sykf8q94l8q8mqstf64ptuvp74ueyehxpgcq76",coingecko_api:"desmos",denom:"udsm",health:0,health_color:"grey",apr:0,speed:0,availabel_tokens:0,delegations_tokens:0,delegations_percents:0,delegations_price:0,delegations_price_usdt:0,delegations_price_atom:0,delegations_price_eth:0,delegations_price_btc:0,validators:[],total_annual_provision:0,RPDE:0,RPDE_usdt:0,RPDE_atom:0,RPDE_eth:0,RPDE_btc:0,RPDE_year_usdt:0,RPDE_year_atom:0,RPDE_year_eth:0,RPDE_year_btc:0,personal_APR:0,price:0,price_usdt:0,price_atom:0,price_eth:0,price_btc:0,balance_usdt:0,balance_atom:0,balance_eth:0,balance_btc:0,exponent:1e6,rewards_tokens:0,rewards_price:0,rewards_price_usdt:0,rewards_price_atom:0,rewards_price_eth:0,rewards_price_btc:0,rewards_percents:0,tokens_sum:0}},r=(0,o.Q_)("global",{state:()=>({node:null,IPFSStatus:!1,auth:!1,userName:"",currency:"BTC",wallets:{},avatar:"",tooltip:"",BTC_price:0,ETH_price:0,ATOM_price:0,account:n,networks:s})})}},t={};function a(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,a),s.exports}a.m=e,function(){var e=[];a.O=function(t,o,n,s){if(!o){var r=1/0;for(l=0;l<e.length;l++){o=e[l][0],n=e[l][1],s=e[l][2];for(var i=!0,c=0;c<o.length;c++)(!1&s||r>=s)&&Object.keys(a.O).every((function(e){return a.O[e](o[c])}))?o.splice(c--,1):(i=!1,s<r&&(r=s));if(i){e.splice(l--,1);var _=n();void 0!==_&&(t=_)}}return t}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[o,n,s]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,o){return a.f[o](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{50:"a90635ad",217:"8e3f5882",684:"1dad73e2"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{50:"19aea7a4",217:"56b86346"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="bro_app:";a.l=function(o,n,s,r){if(e[o])e[o].push(n);else{var i,c;if(void 0!==s)for(var _=document.getElementsByTagName("script"),l=0;l<_.length;l++){var d=_[l];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+s){i=d;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",t+s),i.src=o),e[o]=[n];var p=function(t,a){i.onerror=i.onload=null,clearTimeout(u);var n=e[o];if(delete e[o],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((function(e){return e(a)})),t)return t(a)},u=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){var e=function(e,t,a,o){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var s=function(s){if(n.onerror=n.onload=null,"load"===s.type)a();else{var r=s&&("load"===s.type?"missing":s.type),i=s&&s.target&&s.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=r,c.request=i,n.parentNode.removeChild(n),o(c)}};return n.onerror=n.onload=s,n.href=t,document.head.appendChild(n),n},t=function(e,t){for(var a=document.getElementsByTagName("link"),o=0;o<a.length;o++){var n=a[o],s=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(s===e||s===t))return n}var r=document.getElementsByTagName("style");for(o=0;o<r.length;o++){n=r[o],s=n.getAttribute("data-href");if(s===e||s===t)return n}},o=function(o){return new Promise((function(n,s){var r=a.miniCssF(o),i=a.p+r;if(t(r,i))return n();e(o,i,n,s)}))},n={143:0};a.f.miniCss=function(e,t){var a={50:1,217:1};n[e]?t.push(n[e]):0!==n[e]&&a[e]&&t.push(n[e]=o(e).then((function(){n[e]=0}),(function(t){throw delete n[e],t})))}}(),function(){var e={143:0};a.f.j=function(t,o){var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var s=new Promise((function(a,o){n=e[t]=[a,o]}));o.push(n[2]=s);var r=a.p+a.u(t),i=new Error,c=function(o){if(a.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var s=o&&("load"===o.type?"missing":o.type),r=o&&o.target&&o.target.src;i.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",i.name="ChunkLoadError",i.type=s,i.request=r,n[1](i)}};a.l(r,c,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,s,r=o[0],i=o[1],c=o[2],_=0;if(r.some((function(t){return 0!==e[t]}))){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(c)var l=c(a)}for(t&&t(o);_<r.length;_++)s=r[_],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(l)},o=self["webpackChunkbro_app"]=self["webpackChunkbro_app"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=a.O(void 0,[998],(function(){return a(3669)}));o=a.O(o)})();
//# sourceMappingURL=app.06d2e0c8.js.map