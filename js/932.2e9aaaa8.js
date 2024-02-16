"use strict";(self["webpackChunkbro_app"]=self["webpackChunkbro_app"]||[]).push([[932],{60609:function(s,e,t){t.r(e),t.d(e,{default:function(){return Oe}});var l=t(73396),o=t(44870),a=t(87139),i=t(49242),n=t(27795),r=t.p+"img/empty_proposals.40cc1f50.svg",_=t(34776),c=t(90466);const p=s=>((0,l.dD)("data-v-37cd2cb6"),s=s(),(0,l.Cn)(),s),d=n+"#ic_arr_down",v={class:"networks"},u=["onClick"],w=p((()=>(0,l._)("svg",{class:"arr"},[(0,l._)("use",{"xlink:href":d})],-1))),g={class:"list"},k=p((()=>(0,l._)("div",{class:"logo"},[(0,l._)("img",{src:"/cosmoshub_logo.png",alt:""})],-1))),f={class:"name"},m={class:"token"},S=p((()=>(0,l._)("div",{class:"logo"},[(0,l._)("img",{src:"/bostrom_logo.png",alt:""})],-1))),y={class:"name"},b={class:"token"};var h={__name:"Networks",setup(s){const e=(0,_.s)();function t(s){s.target.classList.toggle("active")}return(s,n)=>{const r=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("section",v,[(0,l._)("div",{class:"title",onClick:(0,i.iM)(t,["prevent"])},[(0,l._)("span",null,(0,a.zw)(s.$t("message.account_networks_title")),1),w],8,u),(0,l._)("div",g,[(0,l.Wm)(r,{to:"/proposals/cosmoshub",class:(0,a.C_)(["network",{active:"cosmoshub"==(0,o.SU)(e).currentNetwork}])},{default:(0,l.w5)((()=>[k,(0,l._)("div",null,[(0,l._)("div",f,(0,a.zw)((0,o.SU)(e).networks.cosmoshub.name),1),(0,l._)("div",m,(0,a.zw)((0,o.SU)(e).networks.cosmoshub.token_name),1)])])),_:1},8,["class"]),(0,l.Wm)(r,{to:"/proposals/bostrom",class:(0,a.C_)(["network",{active:"bostrom"==(0,o.SU)(e).currentNetwork}])},{default:(0,l.w5)((()=>[S,(0,l._)("div",null,[(0,l._)("div",y,(0,a.zw)((0,o.SU)(e).networks.bostrom.name),1),(0,l._)("div",b,(0,a.zw)((0,o.SU)(e).networks.bostrom.token_name),1)])])),_:1},8,["class"])])])}}},z=t(40089);const U=(0,z.Z)(h,[["__scopeId","data-v-37cd2cb6"]]);var O=U,P=t(42325);const D=s=>((0,l.dD)("data-v-4278b9c6"),s=s(),(0,l.Cn)(),s),T=n+"#ic_status_deposite",$=n+"#ic_status_voting",R=n+"#ic_status_passed",A=n+"#ic_status_rejected",E=n+"#ic_suspicious",C={class:"network_logo"},j=["src"],x={class:"status"},L={key:0,class:"violet"},I=D((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":T})],-1))),N={key:1,class:"blue"},q=D((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":$})],-1))),H={key:2,class:"green"},F=D((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":R})],-1))),M={key:3,class:"red"},W=D((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":A})],-1))),G={key:0,class:"suspicious"},J=D((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":E})],-1))),V={class:"tooltip"},Y={key:1,class:"date"},B={key:2,class:"date"},Z={key:3,class:"date"},K={class:"name"},Q={class:"desc"},X={key:4,class:"progress"},ss={class:"bar"},es={class:"funds"},ts={class:"label"},ls={class:"val"},os={class:"label"},as={class:"val"},is={key:5,class:"progress"},ns={class:"bar"},rs={class:"exp"},_s={class:"yes green"},cs={class:"label"},ps={class:"val"},ds={class:"no orange"},vs={class:"label"},us={class:"val"},ws={class:"nwv red"},gs={class:"label"},ks={class:"val"},fs={key:6,class:"progress"},ms={class:"bar"},Ss={class:"exp"},ys={class:"yes green"},bs={class:"label"},hs={class:"val"},zs={class:"no orange"},Us={class:"label"},Os={class:"val"},Ps={class:"nwv red"},Ds={class:"label"},Ts={class:"val"},$s={class:"abstain grey"},Rs={class:"label"},As={class:"val"};var Es={__name:"ProposalsItem",props:["proposal"],setup(s){const e=s,t=(0,_.s)(),i=(new Date).getTimezoneOffset()/60*-1,n=(0,c.BKj)(r(e.proposal.voting_end_time));function r(s){let e=new Date(s);return new Date(e.setHours(e.getHours()+i))}function p(s){let t=e.proposal.tally_no+e.proposal.tally_no_with_veto+e.proposal.tally_yes;return(s/t*100).toFixed(2)}function d(s){let t=e.proposal.tally_abstain+e.proposal.tally_no+e.proposal.tally_no_with_veto+e.proposal.tally_yes;return(s/t*100).toFixed(2)}return(i,_)=>{const c=(0,l.up)("vue-countdown"),v=(0,l.up)("router-link");return(0,l.wg)(),(0,l.j4)(v,{to:`/${(0,o.SU)(t).currentNetwork}/proposal/${e.proposal.id}`,class:"proposal"},{default:(0,l.w5)((()=>[(0,l._)("div",C,[(0,l._)("img",{src:`/${(0,o.SU)(t).currentNetwork}_logo.png`,alt:""},null,8,j)]),(0,l._)("div",x,["PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",L,[I,(0,l._)("span",null,(0,a.zw)(i.$t("message.account_proposals_status_deposite")),1)])):(0,l.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",N,[q,(0,l._)("span",null,(0,a.zw)(i.$t("message.account_proposals_status_voting")),1)])):(0,l.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",H,[F,(0,l._)("span",null,(0,a.zw)(i.$t("message.account_proposals_status_passed")),1)])):(0,l.kq)("",!0),"PROPOSAL_STATUS_REJECTED"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",M,[W,(0,l._)("span",null,(0,a.zw)(i.$t("message.account_proposals_status_rejected")),1)])):(0,l.kq)("",!0)]),(0,o.SU)(P.Wx)(e.proposal)?((0,l.wg)(),(0,l.iD)("div",G,[J,(0,l._)("div",V,(0,a.zw)(i.$t("message.account_proposals_suspicious_tooltip")),1)])):(0,l.kq)("",!0),"PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",Y,[(0,l.Wm)(c,{time:r(s.proposal.deposit_end_time)-new Date},{default:(0,l.w5)((({days:s,hours:e,minutes:t,seconds:o})=>[(0,l.Uk)((0,a.zw)(s)+"D : "+(0,a.zw)(e)+"H : "+(0,a.zw)(t)+"M : "+(0,a.zw)(o)+"S ",1)])),_:1},8,["time"])])):(0,l.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",B,[(0,l.Wm)(c,{time:r(s.proposal.voting_end_time)-new Date},{default:(0,l.w5)((({days:s,hours:e,minutes:t,seconds:o})=>[(0,l.Uk)((0,a.zw)(s)+"D : "+(0,a.zw)(e)+"H : "+(0,a.zw)(t)+"M : "+(0,a.zw)(o)+"S ",1)])),_:1},8,["time"])])):(0,l.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status||"PROPOSAL_STATUS_REJECTED"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",Z,[(0,l._)("div",null,(0,a.zw)(i.$t("message.proposal_date_label_default")),1),(0,l._)("div",null,(0,a.zw)((0,o.SU)(n)),1)])):(0,l.kq)("",!0),(0,l._)("div",K,"#"+(0,a.zw)(e.proposal.id)+" "+(0,a.zw)(e.proposal.title),1),(0,l._)("div",Q,(0,a.zw)(e.proposal.description),1),"PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",X,[(0,l._)("div",ss,[(0,l._)("div",{class:"violet",style:(0,a.j5)(`width: ${i.$filters.toFixed((0,o.SU)(P.LH)(e.proposal.deposit,(0,o.SU)(t).networks[(0,o.SU)(t).currentNetwork].token_name)/(0,o.SU)(t).networks[(0,o.SU)(t).currentNetwork].proposal_need*100,2)}%;`)},null,4)]),(0,l._)("div",es,[(0,l._)("div",null,[(0,l._)("div",ts,(0,a.zw)(i.$t("message.proposal_deposite_label_collected")),1),(0,l._)("div",ls,(0,a.zw)(i.$filters.toFixed((0,o.SU)(P.LH)(e.proposal.deposit,(0,o.SU)(t).networks[(0,o.SU)(t).currentNetwork].token_name),0))+" "+(0,a.zw)((0,o.SU)(P.uR)((0,o.SU)(t).networks[(0,o.SU)(t).currentNetwork].token_name)),1)]),(0,l._)("div",null,[(0,l._)("div",os,(0,a.zw)(i.$t("message.proposal_deposite_label_necessary")),1),(0,l._)("div",as,(0,a.zw)(i.$filters.toFixed((0,o.SU)(P.LH)((0,o.SU)(t).networks[(0,o.SU)(t).currentNetwork].proposal_need,(0,o.SU)(t).networks[(0,o.SU)(t).currentNetwork].token_name),0))+" "+(0,a.zw)((0,o.SU)(P.uR)((0,o.SU)(t).networks[(0,o.SU)(t).currentNetwork].token_name)),1)])])])):(0,l.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,l.wg)(),(0,l.iD)("div",is,[(0,l._)("div",ns,[(0,l._)("div",{class:"yes green",style:(0,a.j5)(`width: ${p(e.proposal.tally_yes)}%;`)},null,4),(0,l._)("div",{class:"no orange",style:(0,a.j5)(`width: ${p(e.proposal.tally_no)}%;`)},null,4),(0,l._)("div",{class:"nwv red",style:(0,a.j5)(`width: ${p(e.proposal.tally_no_with_veto)}%;`)},null,4)]),(0,l._)("div",rs,[(0,l._)("div",_s,[(0,l._)("div",cs,(0,a.zw)(i.$t("message.proposal_voting_label_yes")),1),(0,l._)("div",ps,(0,a.zw)(p(e.proposal.tally_yes))+"%",1)]),(0,l._)("div",ds,[(0,l._)("div",vs,(0,a.zw)(i.$t("message.proposal_voting_label_no")),1),(0,l._)("div",us,(0,a.zw)(p(e.proposal.tally_no))+"%",1)]),(0,l._)("div",ws,[(0,l._)("div",gs,(0,a.zw)(i.$t("message.proposal_voting_label_nwv")),1),(0,l._)("div",ks,(0,a.zw)(p(e.proposal.tally_no_with_veto))+"%",1)])])])):(0,l.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status||"PROPOSAL_STATUS_REJECTED"==s.proposal.status?((0,l.wg)(),(0,l.iD)("div",fs,[(0,l._)("div",ms,[(0,l._)("div",{class:"yes green",style:(0,a.j5)(`width: ${d(e.proposal.tally_yes)}%;`)},null,4),(0,l._)("div",{class:"no orange",style:(0,a.j5)(`width: ${d(e.proposal.tally_no)}%;`)},null,4),(0,l._)("div",{class:"nwv red",style:(0,a.j5)(`width: ${d(e.proposal.tally_no_with_veto)}%;`)},null,4)]),(0,l._)("div",Ss,[(0,l._)("div",ys,[(0,l._)("div",bs,(0,a.zw)(i.$t("message.proposal_voting_label_yes")),1),(0,l._)("div",hs,(0,a.zw)(d(e.proposal.tally_yes))+"%",1)]),(0,l._)("div",zs,[(0,l._)("div",Us,(0,a.zw)(i.$t("message.proposal_voting_label_no")),1),(0,l._)("div",Os,(0,a.zw)(d(e.proposal.tally_no))+"%",1)]),(0,l._)("div",Ps,[(0,l._)("div",Ds,(0,a.zw)(i.$t("message.proposal_voting_label_nwv")),1),(0,l._)("div",Ts,(0,a.zw)(d(e.proposal.tally_no_with_veto))+"%",1)]),(0,l._)("div",$s,[(0,l._)("div",Rs,(0,a.zw)(i.$t("message.proposal_voting_label_abstain")),1),(0,l._)("div",As,(0,a.zw)(d(e.proposal.tally_abstain))+"%",1)])])])):(0,l.kq)("",!0)])),_:1},8,["to"])}}};const Cs=(0,z.Z)(Es,[["__scopeId","data-v-4278b9c6"]]);var js=Cs;const xs=n+"#ic_arrow_ver",Ls=(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":xs})],-1),Is=[Ls];var Ns={__name:"ButtonUp",setup(s){const e=(0,o.iH)("none");function t(){window.scrollTo({top:0,behavior:"smooth"})}return(0,l.bv)((()=>{window.addEventListener("scroll",(()=>{let s=window.pageYOffset,t=document.documentElement.clientHeight;e.value=s>t?"flex":"none"}))})),(s,o)=>((0,l.wg)(),(0,l.iD)("button",{class:"btn_up",onClick:o[0]||(o[0]=s=>t()),style:(0,a.j5)({display:e.value})},Is,4))}};const qs=Ns;var Hs=qs,Fs=t(15941);const Ms=s=>((0,l.dD)("data-v-9eb1480c"),s=s(),(0,l.Cn)(),s),Ws=n+"#ic_arrow_hor",Gs=n+"#ic_arr_down",Js=n+"#ic_check",Vs={class:"proposals_page"},Ys={class:"cont middle"},Bs={class:"back_btn"},Zs=Ms((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":Ws})],-1))),Ks=Ms((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":Ws})],-1))),Qs={class:"grid row"},Xs={class:"col"},se={class:"col_main"},ee={class:"head"},te={class:"title"},le={key:0,class:"loader_wrap"},oe=Ms((()=>(0,l._)("div",{class:"loader"},[(0,l._)("span")],-1))),ae=[oe],ie={key:1,class:"proposals"},ne={key:2,class:"empty"},re=Ms((()=>(0,l._)("img",{src:r,alt:""},null,-1))),_e={class:"title"},ce={key:0,class:"loader_wrap"},pe=Ms((()=>(0,l._)("div",{class:"loader"},[(0,l._)("span")],-1))),de=[pe],ve=Ms((()=>(0,l._)("div",{class:"load_more_area"},null,-1))),ue={class:"col"},we={class:"filter"},ge=["onClick"],ke=Ms((()=>(0,l._)("svg",{class:"arr"},[(0,l._)("use",{"xlink:href":Gs})],-1))),fe=["onClick"],me=Ms((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":Js})],-1))),Se=Ms((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":Js})],-1))),ye=Ms((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":Js})],-1))),be=Ms((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":Js})],-1))),he=Ms((()=>(0,l._)("svg",{class:"icon"},[(0,l._)("use",{"xlink:href":Js})],-1)));var ze={__name:"Proposals",setup(s){const e=(0,_.s)(),t=(0,l.f3)("i18n"),n=(0,o.iH)(!0),r=(0,o.iH)(!1),p=(0,c.ltg)("history"),d=(0,o.qj)({loading:!1,allReceived:!1,showButtonUp:!1,filter_deposit:!1,filter_voting:!1,filter_passed:!1,filter_rejected:!1,filter:""});async function v(){d.loading=!0,d.offset=d.offset+d.limit,await g(!0)}async function u(s){let e="",t=s.split("-");for(s of t)"deposit"==s&&(d.filter_deposit=!d.filter_deposit),"voting"==s&&(d.filter_voting=!d.filter_voting),"passed"==s&&(d.filter_passed=!d.filter_passed),"rejected"==s&&(d.filter_rejected=!d.filter_rejected);d.filter="",d.filter_deposit&&(e.length&&(e+="-"),e+="deposit",d.filter+=",PROPOSAL_STATUS_DEPOSIT_PERIOD"),d.filter_voting&&(e.length&&(e+="-"),e+="voting",d.filter+=",PROPOSAL_STATUS_VOTING_PERIOD"),d.filter_passed&&(e.length&&(e+="-"),e+="passed",d.filter+=",PROPOSAL_STATUS_PASSED"),d.filter_rejected&&(e.length&&(e+="-"),e+="rejected",d.filter+=",PROPOSAL_STATUS_REJECTED"),p.filter=e,d.allReceived=!1,await g()}async function w(){d.allReceived=!1,d.filter_deposit=!1,d.filter_voting=!1,d.filter_passed=!1,d.filter_rejected=!1,d.filter="",await g()}async function g(s=!1){r.value=!0;let t="";s||(n.value=!0,d.proposals=[],d.offset=0,d.limit=10),t=d.filter.length?`${e.networks[e.currentNetwork].index_api}/gov/proposals?limit=${d.limit}&offset=${d.offset}&status__in=${d.filter.substring(1)}`:`${e.networks[e.currentNetwork].index_api}/gov/proposals?limit=${d.limit}&offset=${d.offset}`,await fetch(t).then((s=>s.json())).then((e=>{e.proposals.length?d.proposals=d.proposals.concat(e.proposals):d.allReceived=!0,e.proposals.length<d.limit&&(d.allReceived=!0),s?d.loading=!1:n.value=!1,r.value=!1})),f.observe(document.querySelector(".load_more_area"))}function k(s){for(const e of s)e.intersectionRatio>=1&&!d.loading&&!d.allReceived&&v()}(0,l.wF)((async()=>{e.tooltip=t.global.t("message.notice_default_proposals_page");try{e.proposalsFilter?await u(e.proposalsFilter):await g()}catch(s){Fs.error(s)}})),(0,l.YP)((0,l.Fl)((()=>e.currentNetwork)),(async()=>{n.value=!0,d.proposals=[],d.offset=0,d.limit=10;try{e.proposalsFilter?await u(e.proposalsFilter):await g()}catch(s){Fs.error(s)}}));var f=new IntersectionObserver(k,{threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]});function m(s){s.target.classList.toggle("active")}return(s,t)=>{const _=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("section",Vs,[(0,l._)("div",Ys,[(0,l._)("div",Bs,[(0,o.SU)(e).demo?((0,l.wg)(),(0,l.j4)(_,{key:0,to:`/account/${(0,o.SU)(e).currentNetwork}?demo=true`,class:"btn"},{default:(0,l.w5)((()=>[Zs])),_:1},8,["to"])):((0,l.wg)(),(0,l.j4)(_,{key:1,to:`/account/${(0,o.SU)(e).currentNetwork}`,class:"btn"},{default:(0,l.w5)((()=>[Ks])),_:1},8,["to"]))]),(0,l._)("div",Qs,[(0,l._)("section",Xs,[(0,l.Wm)(O)]),(0,l._)("section",se,[(0,l._)("div",ee,[(0,l._)("div",te,(0,a.zw)(s.$t("message.account_proposals_title")),1)]),n.value?((0,l.wg)(),(0,l.iD)("div",le,ae)):((0,l.wg)(),(0,l.iD)("div",ie,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(d.proposals,((s,e)=>((0,l.wg)(),(0,l.j4)(js,{key:e,proposal:s},null,8,["proposal"])))),128))])),n.value||d.proposals.length?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("div",ne,[re,(0,l._)("div",_e,(0,a.zw)(s.$t("message.proposals_empty_title")),1)])),d.proposals.length?((0,l.wg)(),(0,l.iD)(l.HY,{key:3},[d.loading?((0,l.wg)(),(0,l.iD)("div",ce,de)):(0,l.kq)("",!0),ve],64)):(0,l.kq)("",!0)]),(0,l._)("section",ue,[(0,l._)("div",we,[(0,l._)("div",{class:"title",onClick:(0,i.iM)(m,["prevent"])},[(0,l._)("span",null,(0,a.zw)(s.$t("message.filter_title")),1),ke],8,ge),(0,l._)("div",{class:(0,a.C_)(["items",{lock:r.value}])},[(0,l._)("button",{class:(0,a.C_)(["btn",{active:!d.filter.length}]),onClick:(0,i.iM)(w,["prevent"])},[(0,l._)("span",null,(0,a.zw)(s.$t("message.account_proposals_status_all")),1),me],10,fe),(0,l._)("button",{class:(0,a.C_)(["btn",{active:d.filter_deposit}]),onClick:t[0]||(t[0]=(0,i.iM)((s=>u("deposit")),["prevent"]))},[(0,l._)("span",null,(0,a.zw)(s.$t("message.account_proposals_status_deposite")),1),Se],2),(0,l._)("button",{class:(0,a.C_)(["btn",{active:d.filter_passed}]),onClick:t[1]||(t[1]=(0,i.iM)((s=>u("passed")),["prevent"]))},[(0,l._)("span",null,(0,a.zw)(s.$t("message.account_proposals_status_passed")),1),ye],2),(0,l._)("button",{class:(0,a.C_)(["btn",{active:d.filter_rejected}]),onClick:t[2]||(t[2]=(0,i.iM)((s=>u("rejected")),["prevent"]))},[(0,l._)("span",null,(0,a.zw)(s.$t("message.account_proposals_status_rejected")),1),be],2),(0,l._)("button",{class:(0,a.C_)(["btn",{active:d.filter_voting}]),onClick:t[3]||(t[3]=(0,i.iM)((s=>u("voting")),["prevent"]))},[(0,l._)("span",null,(0,a.zw)(s.$t("message.account_proposals_status_voting")),1),he],2)],2)]),(0,l.Wm)(Hs)])])])])}}};const Ue=(0,z.Z)(ze,[["__scopeId","data-v-9eb1480c"]]);var Oe=Ue}}]);
//# sourceMappingURL=932.2e9aaaa8.js.map