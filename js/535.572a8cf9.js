"use strict";(self["webpackChunkbro_app"]=self["webpackChunkbro_app"]||[]).push([[535],{37368:function(t,e,s){var o,i,l,n=s(15941);s(21703),s(57658),function(s,n){if("object"==typeof t.exports){if(!s.document)throw new Error("HC-Sticky requires a browser to run.");t.exports=n(s)}else i=[],o=n(s),l="function"===typeof o?o.apply(e,i):o,void 0===l||(t.exports=l)}("undefined"!=typeof window?window:this,(function(t){var e,s,o=t.document,i={top:0,bottom:0,bottomEnd:0,innerTop:0,innerSticker:null,stickyClass:"sticky",stickTo:null,followScroll:!0,responsive:null,mobileFirst:!1,onStart:null,onStop:null,onBeforeResize:null,onResize:null,resizeDebounce:100,disable:!1},l=function(t,e,s){n.warn("%cHC Sticky:%c "+s+"%c '"+t+"'%c is now deprecated and will be removed. Use%c '"+e+"'%c instead.","color: #fa253b","color: default","color: #5595c6","color: default","color: #5595c6","color: default")},a=function(e,s){var n=this;if(s=s||{},!(e="string"==typeof e?o.querySelector(e):e))return!1;s.queries&&l("queries","responsive","option"),s.queryFlow&&l("queryFlow","mobileFirst","option");var r={},c=a.Helpers,p=e.parentNode;function d(t){c.isEmptyObject(t=t||{})&&!c.isEmptyObject(r)||(r=Object.assign({},i,r,t))}function u(){return r.disable}function _(){var e,o=r.responsive||r.queries;if(o){var l=t.innerWidth;if(e=s,(r=Object.assign({},i,e||{})).mobileFirst)for(var n in o)n<=l&&!c.isEmptyObject(o[n])&&d(o[n]);else{var a,p=[];for(a in o){var u={};u[a]=o[a],p.push(u)}for(var _=p.length-1;0<=_;_--){var f=p[_],v=Object.keys(f)[0];l<=v&&!c.isEmptyObject(f[v])&&d(f[v])}}}}function f(){var s,i,l,n;q.css=(s=e,i=c.getCascadedStyle(s),l=c.getStyle(s),n={height:s.offsetHeight+"px",left:i.left,right:i.right,top:i.top,bottom:i.bottom,position:l.position,display:l.display,verticalAlign:l.verticalAlign,boxSizing:l.boxSizing,marginLeft:i.marginLeft,marginRight:i.marginRight,marginTop:i.marginTop,marginBottom:i.marginBottom,paddingLeft:i.paddingLeft,paddingRight:i.paddingRight},i.float&&(n.float=i.float||"none"),i.cssFloat&&(n.cssFloat=i.cssFloat||"none"),l.MozBoxSizing&&(n.MozBoxSizing=l.MozBoxSizing),n.width="auto"!==i.width?i.width:"border-box"===n.boxSizing||"border-box"===n.MozBoxSizing?s.offsetWidth+"px":l.width,n),M.init(),b=!(!r.stickTo||!("document"===r.stickTo||r.stickTo.nodeType&&9===r.stickTo.nodeType||"object"==typeof r.stickTo&&r.stickTo instanceof("undefined"!=typeof HTMLDocument?HTMLDocument:Document))),S=r.stickTo?b?o:c.getElement(r.stickTo):p,R=(N=function(){var t=e.offsetHeight+(parseInt(q.css.marginTop)||0)+(parseInt(q.css.marginBottom)||0),s=(R||0)-t;return-1<=s&&s<=1?R:t})(),O=(U=function(){return b?Math.max(o.documentElement.clientHeight,o.body.scrollHeight,o.documentElement.scrollHeight,o.body.offsetHeight,o.documentElement.offsetHeight):S.offsetHeight})(),T=b?0:c.offset(S).top,z=r.stickTo?b?0:c.offset(p).top:T,E=t.innerHeight,$=e.offsetTop-(parseInt(q.css.marginTop)||0),k=c.getElement(r.innerSticker),P=isNaN(r.top)&&-1<r.top.indexOf("%")?parseFloat(r.top)/100*E:r.top,x=isNaN(r.bottom)&&-1<r.bottom.indexOf("%")?parseFloat(r.bottom)/100*E:r.bottom,j=k?k.offsetTop:r.innerTop||0,L=isNaN(r.bottomEnd)&&-1<r.bottomEnd.indexOf("%")?parseFloat(r.bottomEnd)/100*E:r.bottomEnd,D=T-P+j+$}function v(){R=N(),O=U(),A=T+O-P-L,C=E<R;var s,i=t.pageYOffset||o.documentElement.scrollTop,l=c.offset(e).top,n=l-i;H=i<F?"up":"down",I=i-F,D<(F=i)?A+P+(C?x:0)-(r.followScroll&&C?0:P)<=i+R-j-(E-(D-j)<R-j&&r.followScroll&&0<(s=R-E-j)?s:0)?q.release({position:"absolute",bottom:z+p.offsetHeight-A-P}):C&&r.followScroll?"down"==H?n+R+x<=E+.9?q.stick({bottom:x}):"fixed"===q.position&&q.release({position:"absolute",top:l-P-D-I+j}):Math.ceil(n+j)<0&&"fixed"===q.position?q.release({position:"absolute",top:l-P-D+j-I}):i+P-j<=l&&q.stick({top:P-j}):q.stick({top:P-j}):q.release({stop:!0})}function g(){B&&(t.removeEventListener("scroll",v,c.supportsPassive),B=!1)}function m(){null!==e.offsetParent&&"none"!==c.getStyle(e,"display")?(f(),O<R?g():(v(),B||(t.addEventListener("scroll",v,c.supportsPassive),B=!0))):g()}function w(){e.style.position="",e.style.left="",e.style.top="",e.style.bottom="",e.style.width="",e.classList?e.classList.remove(r.stickyClass):e.className=e.className.replace(new RegExp("(^|\\b)"+r.stickyClass.split(" ").join("|")+"(\\b|$)","gi")," "),q.css={},!(q.position=null)===M.isAttached&&M.detach()}function y(){w(),_(),(u()?g:m)()}function h(){W&&(t.removeEventListener("resize",Y,c.supportsPassive),W=!1),g()}"static"===c.getStyle(p,"position")&&(p.style.position="relative");var b,S,k,O,T,z,E,P,x,j,L,D,A,C,R,$,U,N,I,H,q={css:{},position:null,stick:function(t){t=t||{},c.hasClass(e,r.stickyClass)||(!1===M.isAttached&&M.attach(),q.position="fixed",e.style.position="fixed",e.style.left=M.offsetLeft+"px",e.style.width=M.width,void 0===t.bottom?e.style.bottom="auto":e.style.bottom=t.bottom+"px",void 0===t.top?e.style.top="auto":e.style.top=t.top+"px",e.classList?e.classList.add(r.stickyClass):e.className+=" "+r.stickyClass,r.onStart&&r.onStart.call(e,Object.assign({},r)))},release:function(t){var s;(t=t||{}).stop=t.stop||!1,!0!==t.stop&&"fixed"!==q.position&&null!==q.position&&(void 0===t.top&&void 0===t.bottom||void 0!==t.top&&(parseInt(c.getStyle(e,"top"))||0)===t.top||void 0!==t.bottom&&(parseInt(c.getStyle(e,"bottom"))||0)===t.bottom)||(!0===t.stop?!0===M.isAttached&&M.detach():!1===M.isAttached&&M.attach(),s=t.position||q.css.position,q.position=s,e.style.position=s,e.style.left=!0===t.stop?q.css.left:M.positionLeft+"px",e.style.width=("absolute"!==s?q.css:M).width,void 0===t.bottom?e.style.bottom=!0===t.stop?"":"auto":e.style.bottom=t.bottom+"px",void 0===t.top?e.style.top=!0===t.stop?"":"auto":e.style.top=t.top+"px",e.classList?e.classList.remove(r.stickyClass):e.className=e.className.replace(new RegExp("(^|\\b)"+r.stickyClass.split(" ").join("|")+"(\\b|$)","gi")," "),r.onStop&&r.onStop.call(e,Object.assign({},r)))}},M={el:o.createElement("div"),offsetLeft:null,positionLeft:null,width:null,isAttached:!1,init:function(){for(var t in M.el.className="sticky-spacer",q.css)M.el.style[t]=q.css[t];M.el.style["z-index"]="-1";var s=c.getStyle(e);M.offsetLeft=c.offset(e).left-(parseInt(s.marginLeft)||0),M.positionLeft=c.position(e).left,M.width=c.getStyle(e,"width")},attach:function(){p.insertBefore(M.el,e),M.isAttached=!0},detach:function(){M.el=p.removeChild(M.el),M.isAttached=!1}},F=t.pageYOffset||o.documentElement.scrollTop,B=!1,W=!1,V=function(){r.onBeforeResize&&r.onBeforeResize.call(e,Object.assign({},r)),y(),r.onResize&&r.onResize.call(e,Object.assign({},r))},Y=r.resizeDebounce?c.debounce(V,r.resizeDebounce):V;V=function(){W||(t.addEventListener("resize",Y,c.supportsPassive),W=!0),_(),(u()?g:m)()};this.options=function(t){return t?r[t]:Object.assign({},r)},this.refresh=y,this.update=function(t){d(t),s=Object.assign({},s,t||{}),y()},this.attach=V,this.detach=h,this.destroy=function(){h(),w()},this.triggerMethod=function(t,e){"function"==typeof n[t]&&n[t](e)},this.reinit=function(){l("reinit","refresh","method"),y()},d(s),V(),t.addEventListener("load",y)};return void 0!==t.jQuery&&(e=t.jQuery,s="hcSticky",e.fn.extend({hcSticky:function(t,o){return this.length?"options"===t?e.data(this.get(0),s).options():this.each((function(){var i=e.data(this,s);i?i.triggerMethod(t,o):(i=new a(this,t),e.data(this,s,i))})):this}})),t.hcSticky=t.hcSticky||a,a})),function(t){var e=t.hcSticky,s=t.document;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var s=Object(t),o=1;o<arguments.length;o++){var i=arguments[o];if(null!=i)for(var l in i)Object.prototype.hasOwnProperty.call(i,l)&&(s[l]=i[l])}return s},writable:!0,configurable:!0}),Array.prototype.forEach||(Array.prototype.forEach=function(t){var e,s;if(null==this)throw new TypeError("this is null or not defined");var o,i=Object(this),l=i.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(1<arguments.length&&(e=arguments[1]),s=0;s<l;)s in i&&(o=i[s],t.call(e,o,s,i)),s++});var o=!1;try{var i=Object.defineProperty({},"passive",{get:function(){o={passive:!1}}});t.addEventListener("testPassive",null,i),t.removeEventListener("testPassive",null,i)}catch(e){}function l(e,o){return t.getComputedStyle?o?s.defaultView.getComputedStyle(e,null).getPropertyValue(o):s.defaultView.getComputedStyle(e,null):e.currentStyle?o?e.currentStyle[o.replace(/-\w/g,(function(t){return t.toUpperCase().replace("-","")}))]:e.currentStyle:void 0}function n(e){var o=e.getBoundingClientRect(),i=t.pageYOffset||s.documentElement.scrollTop;e=t.pageXOffset||s.documentElement.scrollLeft;return{top:o.top+i,left:o.left+e}}e.Helpers={supportsPassive:o,isEmptyObject:function(t){for(var e in t)return!1;return!0},debounce:function(t,e,s){var o;return function(){var i=this,l=arguments,n=s&&!o;clearTimeout(o),o=setTimeout((function(){o=null,s||t.apply(i,l)}),e),n&&t.apply(i,l)}},hasClass:function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)},offset:n,position:function(t){var e=t.offsetParent,s=n(e),o=n(t);e=l(e),t=l(t);return s.top+=parseInt(e.borderTopWidth)||0,s.left+=parseInt(e.borderLeftWidth)||0,{top:o.top-s.top-(parseInt(t.marginTop)||0),left:o.left-s.left-(parseInt(t.marginLeft)||0)}},getElement:function(e){var o=null;return"string"==typeof e?o=s.querySelector(e):t.jQuery&&e instanceof t.jQuery&&e.length?o=e[0]:e instanceof Element&&(o=e),o},getStyle:l,getCascadedStyle:function(e){var o,i=e.cloneNode(!0);i.style.display="none",Array.prototype.slice.call(i.querySelectorAll('input[type="radio"]')).forEach((function(t){t.removeAttribute("name")})),e.parentNode.insertBefore(i,e.nextSibling),i.currentStyle?o=i.currentStyle:t.getComputedStyle&&(o=s.defaultView.getComputedStyle(i,null));var l,n,a,r={};for(l in o)!isNaN(l)||"string"!=typeof o[l]&&"number"!=typeof o[l]||(r[l]=o[l]);if(Object.keys(r).length<3)for(var c in r={},o)isNaN(c)||(r[o[c].replace(/-\w/g,(function(t){return t.toUpperCase().replace("-","")}))]=o.getPropertyValue(o[c]));return r.margin||"auto"!==r.marginLeft?r.margin||r.marginLeft!==r.marginRight||r.marginLeft!==r.marginTop||r.marginLeft!==r.marginBottom||(r.margin=r.marginLeft):r.margin="auto",r.margin||"0px"!==r.marginLeft||"0px"!==r.marginRight||(a=(n=e.offsetLeft-e.parentNode.offsetLeft)-(parseInt(r.left)||0)-(parseInt(r.right)||0),0!=(a=e.parentNode.offsetWidth-e.offsetWidth-n-(parseInt(r.right)||0)+(parseInt(r.left)||0)-a)&&1!=a||(r.margin="auto")),i.parentNode.removeChild(i),i=null,r}}}(window)},98184:function(t,e,s){s.d(e,{Z:function(){return S}});var o=s(73396),i=s(49242),l=s(87139),n=s(44870),a=s(27795),r=s(34776);const c=t=>((0,o.dD)("data-v-66229f8e"),t=t(),(0,o.Cn)(),t),p=a+"#ic_arr_down",d={class:"networks"},u=["onClick"],_=c((()=>(0,o._)("svg",{class:"arr"},[(0,o._)("use",{"xlink:href":p})],-1))),f={class:"list"},v={class:"network active"},g=c((()=>(0,o._)("div",{class:"logo"},[(0,o._)("img",{src:"/cosmoshub_logo.png",alt:""})],-1))),m={class:"name"},w={class:"token"};var y={__name:"Networks",setup(t){const e=(0,r.s)();function s(t){t.target.classList.toggle("active")}return(t,a)=>((0,o.wg)(),(0,o.iD)("section",d,[(0,o._)("div",{class:"title",onClick:(0,i.iM)(s,["prevent"])},[(0,o._)("span",null,(0,l.zw)(t.$t("message.account_networks_title")),1),_],8,u),(0,o._)("div",f,[(0,o._)("button",v,[g,(0,o._)("div",null,[(0,o._)("div",m,(0,l.zw)((0,n.SU)(e).networks.cosmoshub.name),1),(0,o._)("div",w,(0,l.zw)((0,n.SU)(e).networks.cosmoshub.token_name),1)])])])]))}},h=s(40089);const b=(0,h.Z)(y,[["__scopeId","data-v-66229f8e"]]);var S=b},78954:function(t,e,s){s.r(e),s.d(e,{default:function(){return ce}});var o=s(73396),i=s(44870),l=s(87139),n=s(49242),a=s(27795),r=s.p+"img/empty_proposals.40cc1f50.svg",c=s(34776),p=s(37368),d=s.n(p),u=s(90466),_=s(98184);const f=t=>((0,o.dD)("data-v-18e219e4"),t=t(),(0,o.Cn)(),t),v=a+"#ic_status_deposite",g=a+"#ic_status_voting",m=a+"#ic_status_passed",w=a+"#ic_status_rejected",y={class:"network_logo"},h=["src"],b={class:"status"},S={key:0,class:"violet"},k=f((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":v})],-1))),O={key:1,class:"blue"},T=f((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":g})],-1))),z={key:2,class:"green"},E=f((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":m})],-1))),P={key:3,class:"red"},x=f((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":w})],-1))),j={key:0,class:"date"},L={key:1,class:"date"},D={key:2,class:"date"},A={class:"name"},C={class:"desc"},R={key:3,class:"progress"},$={class:"bar"},U={class:"funds"},N={class:"label"},I={class:"val"},H={class:"label"},q={class:"val"},M={key:4,class:"progress"},F={class:"bar"},B={class:"exp"},W={class:"yes green"},V={class:"label"},Y={class:"val"},Z={class:"no orange"},G={class:"label"},J={class:"val"},Q={class:"nwv red"},K={class:"label"},X={class:"val"},tt={key:5,class:"progress"},et={class:"bar"},st={class:"exp"},ot={class:"yes green"},it={class:"label"},lt={class:"val"},nt={class:"no orange"},at={class:"label"},rt={class:"val"},ct={class:"nwv red"},pt={class:"label"},dt={class:"val"},ut={class:"abstain grey"},_t={class:"label"},ft={class:"val"};var vt={__name:"ProposalsItem",props:["proposal"],setup(t){const e=t,s=(0,c.s)(),n=(new Date).getTimezoneOffset()/60*-1,a=(0,u.BKj)(r(e.proposal.voting_end_time));function r(t){let e=new Date(t);return new Date(e.setHours(e.getHours()+n))}function p(t){let s=e.proposal.tally_no+e.proposal.tally_no_with_veto+e.proposal.tally_yes;return(t/s*100).toFixed(2)}function d(t){let s=e.proposal.tally_abstain+e.proposal.tally_no+e.proposal.tally_no_with_veto+e.proposal.tally_yes;return(t/s*100).toFixed(2)}return(n,c)=>{const u=(0,o.up)("vue-countdown"),_=(0,o.up)("router-link");return(0,o.wg)(),(0,o.j4)(_,{to:`/${(0,i.SU)(s).currentNetwork}/proposal/${e.proposal.id}`,class:"proposal"},{default:(0,o.w5)((()=>[(0,o._)("div",y,[(0,o._)("img",{src:`/${(0,i.SU)(s).currentNetwork}_logo.png`,alt:""},null,8,h)]),(0,o._)("div",b,["PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",S,[k,(0,o._)("span",null,(0,l.zw)(n.$t("message.account_proposals_status_deposite")),1)])):(0,o.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",O,[T,(0,o._)("span",null,(0,l.zw)(n.$t("message.account_proposals_status_voting")),1)])):(0,o.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",z,[E,(0,o._)("span",null,(0,l.zw)(n.$t("message.account_proposals_status_passed")),1)])):(0,o.kq)("",!0),"PROPOSAL_STATUS_REJECTED"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",P,[x,(0,o._)("span",null,(0,l.zw)(n.$t("message.account_proposals_status_rejected")),1)])):(0,o.kq)("",!0)]),"PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",j,[(0,o.Wm)(u,{time:r(t.proposal.deposit_end_time)-new Date},{default:(0,o.w5)((({days:t,hours:e,minutes:s,seconds:i})=>[(0,o.Uk)((0,l.zw)(t)+"D : "+(0,l.zw)(e)+"H : "+(0,l.zw)(s)+"M : "+(0,l.zw)(i)+"S ",1)])),_:1},8,["time"])])):(0,o.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",L,[(0,o.Wm)(u,{time:r(t.proposal.voting_end_time)-new Date},{default:(0,o.w5)((({days:t,hours:e,minutes:s,seconds:i})=>[(0,o.Uk)((0,l.zw)(t)+"D : "+(0,l.zw)(e)+"H : "+(0,l.zw)(s)+"M : "+(0,l.zw)(i)+"S ",1)])),_:1},8,["time"])])):(0,o.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status||"PROPOSAL_STATUS_REJECTED"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",D,[(0,o._)("div",null,(0,l.zw)(n.$t("message.proposal_date_label_default")),1),(0,o._)("div",null,(0,l.zw)((0,i.SU)(a)),1)])):(0,o.kq)("",!0),(0,o._)("div",A,"#"+(0,l.zw)(e.proposal.id)+" "+(0,l.zw)(e.proposal.title),1),(0,o._)("div",C,(0,l.zw)(e.proposal.description),1),"PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",R,[(0,o._)("div",$,[(0,o._)("div",{class:"violet",style:(0,l.j5)(`width: ${n.$filters.toFixed(e.proposal.deposit/Math.pow(10,(0,i.SU)(s).networks[(0,i.SU)(s).currentNetwork].exponent)/(0,i.SU)(s).networks[(0,i.SU)(s).currentNetwork].proposal_need*100,2)}%;`)},null,4)]),(0,o._)("div",U,[(0,o._)("div",null,[(0,o._)("div",N,(0,l.zw)(n.$t("message.proposal_deposite_label_collected")),1),(0,o._)("div",I,(0,l.zw)(n.$filters.toFixed(e.proposal.deposit/Math.pow(10,(0,i.SU)(s).networks[(0,i.SU)(s).currentNetwork].exponent),0))+" "+(0,l.zw)((0,i.SU)(s).networks[(0,i.SU)(s).currentNetwork].token_name),1)]),(0,o._)("div",null,[(0,o._)("div",H,(0,l.zw)(n.$t("message.proposal_deposite_label_necessary")),1),(0,o._)("div",q,(0,l.zw)((0,i.SU)(s).networks[(0,i.SU)(s).currentNetwork].proposal_need)+" "+(0,l.zw)((0,i.SU)(s).networks[(0,i.SU)(s).currentNetwork].token_name),1)])])])):(0,o.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",M,[(0,o._)("div",F,[(0,o._)("div",{class:"yes green",style:(0,l.j5)(`width: ${p(e.proposal.tally_yes)}%;`)},null,4),(0,o._)("div",{class:"no orange",style:(0,l.j5)(`width: ${p(e.proposal.tally_no)}%;`)},null,4),(0,o._)("div",{class:"nwv red",style:(0,l.j5)(`width: ${p(e.proposal.tally_no_with_veto)}%;`)},null,4)]),(0,o._)("div",B,[(0,o._)("div",W,[(0,o._)("div",V,(0,l.zw)(n.$t("message.proposal_voting_label_yes")),1),(0,o._)("div",Y,(0,l.zw)(p(e.proposal.tally_yes))+"%",1)]),(0,o._)("div",Z,[(0,o._)("div",G,(0,l.zw)(n.$t("message.proposal_voting_label_no")),1),(0,o._)("div",J,(0,l.zw)(p(e.proposal.tally_no))+"%",1)]),(0,o._)("div",Q,[(0,o._)("div",K,(0,l.zw)(n.$t("message.proposal_voting_label_nwv")),1),(0,o._)("div",X,(0,l.zw)(p(e.proposal.tally_no_with_veto))+"%",1)])])])):(0,o.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status||"PROPOSAL_STATUS_REJECTED"==t.proposal.status?((0,o.wg)(),(0,o.iD)("div",tt,[(0,o._)("div",et,[(0,o._)("div",{class:"yes green",style:(0,l.j5)(`width: ${d(e.proposal.tally_yes)}%;`)},null,4),(0,o._)("div",{class:"no orange",style:(0,l.j5)(`width: ${d(e.proposal.tally_no)}%;`)},null,4),(0,o._)("div",{class:"nwv red",style:(0,l.j5)(`width: ${d(e.proposal.tally_no_with_veto)}%;`)},null,4)]),(0,o._)("div",st,[(0,o._)("div",ot,[(0,o._)("div",it,(0,l.zw)(n.$t("message.proposal_voting_label_yes")),1),(0,o._)("div",lt,(0,l.zw)(d(e.proposal.tally_yes))+"%",1)]),(0,o._)("div",nt,[(0,o._)("div",at,(0,l.zw)(n.$t("message.proposal_voting_label_no")),1),(0,o._)("div",rt,(0,l.zw)(d(e.proposal.tally_no))+"%",1)]),(0,o._)("div",ct,[(0,o._)("div",pt,(0,l.zw)(n.$t("message.proposal_voting_label_nwv")),1),(0,o._)("div",dt,(0,l.zw)(d(e.proposal.tally_no_with_veto))+"%",1)]),(0,o._)("div",ut,[(0,o._)("div",_t,(0,l.zw)(n.$t("message.proposal_voting_label_abstain")),1),(0,o._)("div",ft,(0,l.zw)(d(e.proposal.tally_abstain))+"%",1)])])])):(0,o.kq)("",!0)])),_:1},8,["to"])}}},gt=s(40089);const mt=(0,gt.Z)(vt,[["__scopeId","data-v-18e219e4"]]);var wt=mt;const yt=a+"#ic_arrow_ver",ht=(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":yt})],-1),bt=[ht];var St={__name:"ButtonUp",setup(t){const e=(0,i.iH)("none");function s(){window.scrollTo({top:0,behavior:"smooth"})}return(0,o.bv)((()=>{window.addEventListener("scroll",(()=>{let t=window.pageYOffset,s=document.documentElement.clientHeight;e.value=t>s?"flex":"none"}))})),(t,i)=>((0,o.wg)(),(0,o.iD)("button",{class:"btn_up",onClick:i[0]||(i[0]=t=>s()),style:(0,l.j5)({display:e.value})},bt,4))}};const kt=St;var Ot=kt,Tt=s(15941);const zt=t=>((0,o.dD)("data-v-3e884bfc"),t=t(),(0,o.Cn)(),t),Et=a+"#ic_arrow_hor",Pt=a+"#ic_arr_down",xt=a+"#ic_check",jt={class:"proposals_page"},Lt={class:"cont middle"},Dt={class:"back_btn"},At=zt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":Et})],-1))),Ct=zt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":Et})],-1))),Rt={class:"grid row"},$t={class:"col"},Ut={class:"col_main"},Nt={class:"head sticky"},It={class:"title"},Ht={key:0,class:"loader_wrap"},qt=zt((()=>(0,o._)("div",{class:"loader"},[(0,o._)("span")],-1))),Mt=[qt],Ft={key:1,class:"proposals"},Bt={key:2,class:"empty"},Wt=zt((()=>(0,o._)("img",{src:r,alt:""},null,-1))),Vt={class:"title"},Yt={key:0,class:"loader_wrap"},Zt=zt((()=>(0,o._)("div",{class:"loader"},[(0,o._)("span")],-1))),Gt=[Zt],Jt=zt((()=>(0,o._)("div",{class:"load_more_area"},null,-1))),Qt={class:"col"},Kt={class:"filter sticky"},Xt=["onClick"],te=zt((()=>(0,o._)("svg",{class:"arr"},[(0,o._)("use",{"xlink:href":Pt})],-1))),ee=["onClick"],se=zt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":xt})],-1))),oe=zt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":xt})],-1))),ie=zt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":xt})],-1))),le=zt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":xt})],-1))),ne=zt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":xt})],-1)));var ae={__name:"Proposals",setup(t){const e=(0,c.s)(),s=(0,o.f3)("i18n"),a=(0,i.iH)(!1),r=(0,i.iH)(!1),p=(0,u.ltg)("history"),f=(0,i.qj)({loading:!1,allReceived:!1,showButtonUp:!1,filter_deposit:!1,filter_voting:!1,filter_passed:!1,filter_rejected:!1,filter:""});async function v(){f.loading=!0,f.offset=f.offset+f.limit,await w(!0)}async function g(t){let e="",s=t.split("-");for(t of s)"deposit"==t&&(f.filter_deposit=!f.filter_deposit),"voting"==t&&(f.filter_voting=!f.filter_voting),"passed"==t&&(f.filter_passed=!f.filter_passed),"rejected"==t&&(f.filter_rejected=!f.filter_rejected);f.filter="",f.filter_deposit&&(e.length&&(e+="-"),e+="deposit",f.filter+=",PROPOSAL_STATUS_DEPOSIT_PERIOD"),f.filter_voting&&(e.length&&(e+="-"),e+="voting",f.filter+=",PROPOSAL_STATUS_VOTING_PERIOD"),f.filter_passed&&(e.length&&(e+="-"),e+="passed",f.filter+=",PROPOSAL_STATUS_PASSED"),f.filter_rejected&&(e.length&&(e+="-"),e+="rejected",f.filter+=",PROPOSAL_STATUS_REJECTED"),p.filter=e,f.allReceived=!1,await w()}async function m(){f.allReceived=!1,f.filter_deposit=!1,f.filter_voting=!1,f.filter_passed=!1,f.filter_rejected=!1,f.filter="",await w()}async function w(t=!1){r.value=!0;let e="";t||(a.value=!1,f.proposals=[],f.offset=0,f.limit=10),e=f.filter.length?`https://rpc.bronbro.io/gov/proposals?limit=${f.limit}&offset=${f.offset}&status__in=${f.filter.substring(1)}`:`https://rpc.bronbro.io/gov/proposals?limit=${f.limit}&offset=${f.offset}`,await fetch(e).then((t=>t.json())).then((e=>{e.proposals.length?f.proposals=f.proposals.concat(e.proposals):f.allReceived=!0,e.proposals.length<f.limit&&(f.allReceived=!0),t?f.loading=!1:a.value=!0,r.value=!1})),h.observe(document.querySelector(".load_more_area"))}function y(t){for(const e of t)e.intersectionRatio>=1&&!f.loading&&!f.allReceived&&v()}(0,o.wF)((async()=>{e.tooltip=s.global.t("message.notice_default_proposals_page");try{e.proposalsFilter?await g(e.proposalsFilter):await w()}catch(t){Tt.error(t)}if(window.innerWidth>1279){let t=document.querySelectorAll(".sticky");t.forEach((t=>new(d())(t,{top:118})))}}));var h=new IntersectionObserver(y,{threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]});function b(t){t.target.classList.toggle("active")}return(t,s)=>{const c=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("section",jt,[(0,o._)("div",Lt,[(0,o._)("div",Dt,[(0,i.SU)(e).demo?((0,o.wg)(),(0,o.j4)(c,{key:0,to:"/account/cosmoshub?demo=true",class:"btn"},{default:(0,o.w5)((()=>[At])),_:1})):((0,o.wg)(),(0,o.j4)(c,{key:1,to:"/account/cosmoshub",class:"btn"},{default:(0,o.w5)((()=>[Ct])),_:1}))]),(0,o._)("div",Rt,[(0,o._)("section",$t,[(0,o.Wm)(_.Z,{class:"sticky"})]),(0,o._)("section",Ut,[(0,o._)("div",Nt,[(0,o._)("div",It,(0,l.zw)(t.$t("message.account_proposals_title")),1)]),a.value?((0,o.wg)(),(0,o.iD)("div",Ft,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(f.proposals,((t,e)=>((0,o.wg)(),(0,o.j4)(wt,{key:e,proposal:t},null,8,["proposal"])))),128))])):((0,o.wg)(),(0,o.iD)("div",Ht,Mt)),a.value&&!f.proposals.length?((0,o.wg)(),(0,o.iD)("div",Bt,[Wt,(0,o._)("div",Vt,(0,l.zw)(t.$t("message.proposals_empty_title")),1)])):(0,o.kq)("",!0),f.proposals.length?((0,o.wg)(),(0,o.iD)(o.HY,{key:3},[f.loading?((0,o.wg)(),(0,o.iD)("div",Yt,Gt)):(0,o.kq)("",!0),Jt],64)):(0,o.kq)("",!0)]),(0,o._)("section",Qt,[(0,o._)("div",Kt,[(0,o._)("div",{class:"title",onClick:(0,n.iM)(b,["prevent"])},[(0,o._)("span",null,(0,l.zw)(t.$t("message.filter_title")),1),te],8,Xt),(0,o._)("div",{class:(0,l.C_)(["items",{lock:r.value}])},[(0,o._)("button",{class:(0,l.C_)(["btn",{active:!f.filter.length}]),onClick:(0,n.iM)(m,["prevent"])},[(0,o._)("span",null,(0,l.zw)(t.$t("message.account_proposals_status_all")),1),se],10,ee),(0,o._)("button",{class:(0,l.C_)(["btn",{active:f.filter_deposit}]),onClick:s[0]||(s[0]=(0,n.iM)((t=>g("deposit")),["prevent"]))},[(0,o._)("span",null,(0,l.zw)(t.$t("message.account_proposals_status_deposite")),1),oe],2),(0,o._)("button",{class:(0,l.C_)(["btn",{active:f.filter_passed}]),onClick:s[1]||(s[1]=(0,n.iM)((t=>g("passed")),["prevent"]))},[(0,o._)("span",null,(0,l.zw)(t.$t("message.account_proposals_status_passed")),1),ie],2),(0,o._)("button",{class:(0,l.C_)(["btn",{active:f.filter_rejected}]),onClick:s[2]||(s[2]=(0,n.iM)((t=>g("rejected")),["prevent"]))},[(0,o._)("span",null,(0,l.zw)(t.$t("message.account_proposals_status_rejected")),1),le],2),(0,o._)("button",{class:(0,l.C_)(["btn",{active:f.filter_voting}]),onClick:s[3]||(s[3]=(0,n.iM)((t=>g("voting")),["prevent"]))},[(0,o._)("span",null,(0,l.zw)(t.$t("message.account_proposals_status_voting")),1),ne],2)],2)]),(0,o.Wm)(Ot)])])])])}}};const re=(0,gt.Z)(ae,[["__scopeId","data-v-3e884bfc"]]);var ce=re}}]);
//# sourceMappingURL=535.572a8cf9.js.map