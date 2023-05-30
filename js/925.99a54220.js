"use strict";(self["webpackChunkbro_app"]=self["webpackChunkbro_app"]||[]).push([[925],{37368:function(t,e){var s,o,i;!function(l,a){if("object"==typeof t.exports){if(!l.document)throw new Error("HC-Sticky requires a browser to run.");t.exports=a(l)}else o=[],s=a(l),i="function"===typeof s?s.apply(e,o):s,void 0===i||(t.exports=i)}("undefined"!=typeof window?window:this,(function(t){var e,s,o=t.document,i={top:0,bottom:0,bottomEnd:0,innerTop:0,innerSticker:null,stickyClass:"sticky",stickTo:null,followScroll:!0,responsive:null,mobileFirst:!1,onStart:null,onStop:null,onBeforeResize:null,onResize:null,resizeDebounce:100,disable:!1},l=function(t,e,s){console.warn("%cHC Sticky:%c "+s+"%c '"+t+"'%c is now deprecated and will be removed. Use%c '"+e+"'%c instead.","color: #fa253b","color: default","color: #5595c6","color: default","color: #5595c6","color: default")},a=function(e,s){var n=this;if(s=s||{},!(e="string"==typeof e?o.querySelector(e):e))return!1;s.queries&&l("queries","responsive","option"),s.queryFlow&&l("queryFlow","mobileFirst","option");var r={},c=a.Helpers,p=e.parentNode;function d(t){c.isEmptyObject(t=t||{})&&!c.isEmptyObject(r)||(r=Object.assign({},i,r,t))}function u(){return r.disable}function _(){var e,o=r.responsive||r.queries;if(o){var l=t.innerWidth;if(e=s,(r=Object.assign({},i,e||{})).mobileFirst)for(var a in o)a<=l&&!c.isEmptyObject(o[a])&&d(o[a]);else{var n,p=[];for(n in o){var u={};u[n]=o[n],p.push(u)}for(var _=p.length-1;0<=_;_--){var f=p[_],v=Object.keys(f)[0];l<=v&&!c.isEmptyObject(f[v])&&d(f[v])}}}}function f(){var s,i,l,a;H.css=(s=e,i=c.getCascadedStyle(s),l=c.getStyle(s),a={height:s.offsetHeight+"px",left:i.left,right:i.right,top:i.top,bottom:i.bottom,position:l.position,display:l.display,verticalAlign:l.verticalAlign,boxSizing:l.boxSizing,marginLeft:i.marginLeft,marginRight:i.marginRight,marginTop:i.marginTop,marginBottom:i.marginBottom,paddingLeft:i.paddingLeft,paddingRight:i.paddingRight},i.float&&(a.float=i.float||"none"),i.cssFloat&&(a.cssFloat=i.cssFloat||"none"),l.MozBoxSizing&&(a.MozBoxSizing=l.MozBoxSizing),a.width="auto"!==i.width?i.width:"border-box"===a.boxSizing||"border-box"===a.MozBoxSizing?s.offsetWidth+"px":l.width,a),B.init(),b=!(!r.stickTo||!("document"===r.stickTo||r.stickTo.nodeType&&9===r.stickTo.nodeType||"object"==typeof r.stickTo&&r.stickTo instanceof("undefined"!=typeof HTMLDocument?HTMLDocument:Document))),k=r.stickTo?b?o:c.getElement(r.stickTo):p,C=(I=function(){var t=e.offsetHeight+(parseInt(H.css.marginTop)||0)+(parseInt(H.css.marginBottom)||0),s=(C||0)-t;return-1<=s&&s<=1?C:t})(),T=(U=function(){return b?Math.max(o.documentElement.clientHeight,o.body.scrollHeight,o.documentElement.scrollHeight,o.body.offsetHeight,o.documentElement.offsetHeight):k.offsetHeight})(),O=b?0:c.offset(k).top,E=r.stickTo?b?0:c.offset(p).top:O,z=t.innerHeight,$=e.offsetTop-(parseInt(H.css.marginTop)||0),S=c.getElement(r.innerSticker),P=isNaN(r.top)&&-1<r.top.indexOf("%")?parseFloat(r.top)/100*z:r.top,L=isNaN(r.bottom)&&-1<r.bottom.indexOf("%")?parseFloat(r.bottom)/100*z:r.bottom,x=S?S.offsetTop:r.innerTop||0,j=isNaN(r.bottomEnd)&&-1<r.bottomEnd.indexOf("%")?parseFloat(r.bottomEnd)/100*z:r.bottomEnd,D=O-P+x+$}function v(){C=I(),T=U(),A=O+T-P-j,R=z<C;var s,i=t.pageYOffset||o.documentElement.scrollTop,l=c.offset(e).top,a=l-i;q=i<M?"up":"down",N=i-M,D<(M=i)?A+P+(R?L:0)-(r.followScroll&&R?0:P)<=i+C-x-(z-(D-x)<C-x&&r.followScroll&&0<(s=C-z-x)?s:0)?H.release({position:"absolute",bottom:E+p.offsetHeight-A-P}):R&&r.followScroll?"down"==q?a+C+L<=z+.9?H.stick({bottom:L}):"fixed"===H.position&&H.release({position:"absolute",top:l-P-D-N+x}):Math.ceil(a+x)<0&&"fixed"===H.position?H.release({position:"absolute",top:l-P-D+x-N}):i+P-x<=l&&H.stick({top:P-x}):H.stick({top:P-x}):H.release({stop:!0})}function g(){F&&(t.removeEventListener("scroll",v,c.supportsPassive),F=!1)}function m(){null!==e.offsetParent&&"none"!==c.getStyle(e,"display")?(f(),T<C?g():(v(),F||(t.addEventListener("scroll",v,c.supportsPassive),F=!0))):g()}function y(){e.style.position="",e.style.left="",e.style.top="",e.style.bottom="",e.style.width="",e.classList?e.classList.remove(r.stickyClass):e.className=e.className.replace(new RegExp("(^|\\b)"+r.stickyClass.split(" ").join("|")+"(\\b|$)","gi")," "),H.css={},!(H.position=null)===B.isAttached&&B.detach()}function w(){y(),_(),(u()?g:m)()}function h(){W&&(t.removeEventListener("resize",Z,c.supportsPassive),W=!1),g()}"static"===c.getStyle(p,"position")&&(p.style.position="relative");var b,k,S,T,O,E,z,P,L,x,j,D,A,R,C,$,U,I,N,q,H={css:{},position:null,stick:function(t){t=t||{},c.hasClass(e,r.stickyClass)||(!1===B.isAttached&&B.attach(),H.position="fixed",e.style.position="fixed",e.style.left=B.offsetLeft+"px",e.style.width=B.width,void 0===t.bottom?e.style.bottom="auto":e.style.bottom=t.bottom+"px",void 0===t.top?e.style.top="auto":e.style.top=t.top+"px",e.classList?e.classList.add(r.stickyClass):e.className+=" "+r.stickyClass,r.onStart&&r.onStart.call(e,Object.assign({},r)))},release:function(t){var s;(t=t||{}).stop=t.stop||!1,!0!==t.stop&&"fixed"!==H.position&&null!==H.position&&(void 0===t.top&&void 0===t.bottom||void 0!==t.top&&(parseInt(c.getStyle(e,"top"))||0)===t.top||void 0!==t.bottom&&(parseInt(c.getStyle(e,"bottom"))||0)===t.bottom)||(!0===t.stop?!0===B.isAttached&&B.detach():!1===B.isAttached&&B.attach(),s=t.position||H.css.position,H.position=s,e.style.position=s,e.style.left=!0===t.stop?H.css.left:B.positionLeft+"px",e.style.width=("absolute"!==s?H.css:B).width,void 0===t.bottom?e.style.bottom=!0===t.stop?"":"auto":e.style.bottom=t.bottom+"px",void 0===t.top?e.style.top=!0===t.stop?"":"auto":e.style.top=t.top+"px",e.classList?e.classList.remove(r.stickyClass):e.className=e.className.replace(new RegExp("(^|\\b)"+r.stickyClass.split(" ").join("|")+"(\\b|$)","gi")," "),r.onStop&&r.onStop.call(e,Object.assign({},r)))}},B={el:o.createElement("div"),offsetLeft:null,positionLeft:null,width:null,isAttached:!1,init:function(){for(var t in B.el.className="sticky-spacer",H.css)B.el.style[t]=H.css[t];B.el.style["z-index"]="-1";var s=c.getStyle(e);B.offsetLeft=c.offset(e).left-(parseInt(s.marginLeft)||0),B.positionLeft=c.position(e).left,B.width=c.getStyle(e,"width")},attach:function(){p.insertBefore(B.el,e),B.isAttached=!0},detach:function(){B.el=p.removeChild(B.el),B.isAttached=!1}},M=t.pageYOffset||o.documentElement.scrollTop,F=!1,W=!1,V=function(){r.onBeforeResize&&r.onBeforeResize.call(e,Object.assign({},r)),w(),r.onResize&&r.onResize.call(e,Object.assign({},r))},Z=r.resizeDebounce?c.debounce(V,r.resizeDebounce):V;V=function(){W||(t.addEventListener("resize",Z,c.supportsPassive),W=!0),_(),(u()?g:m)()};this.options=function(t){return t?r[t]:Object.assign({},r)},this.refresh=w,this.update=function(t){d(t),s=Object.assign({},s,t||{}),w()},this.attach=V,this.detach=h,this.destroy=function(){h(),y()},this.triggerMethod=function(t,e){"function"==typeof n[t]&&n[t](e)},this.reinit=function(){l("reinit","refresh","method"),w()},d(s),V(),t.addEventListener("load",w)};return void 0!==t.jQuery&&(e=t.jQuery,s="hcSticky",e.fn.extend({hcSticky:function(t,o){return this.length?"options"===t?e.data(this.get(0),s).options():this.each((function(){var i=e.data(this,s);i?i.triggerMethod(t,o):(i=new a(this,t),e.data(this,s,i))})):this}})),t.hcSticky=t.hcSticky||a,a})),function(t){var e=t.hcSticky,s=t.document;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var s=Object(t),o=1;o<arguments.length;o++){var i=arguments[o];if(null!=i)for(var l in i)Object.prototype.hasOwnProperty.call(i,l)&&(s[l]=i[l])}return s},writable:!0,configurable:!0}),Array.prototype.forEach||(Array.prototype.forEach=function(t){var e,s;if(null==this)throw new TypeError("this is null or not defined");var o,i=Object(this),l=i.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(1<arguments.length&&(e=arguments[1]),s=0;s<l;)s in i&&(o=i[s],t.call(e,o,s,i)),s++});var o=!1;try{var i=Object.defineProperty({},"passive",{get:function(){o={passive:!1}}});t.addEventListener("testPassive",null,i),t.removeEventListener("testPassive",null,i)}catch(e){}function l(e,o){return t.getComputedStyle?o?s.defaultView.getComputedStyle(e,null).getPropertyValue(o):s.defaultView.getComputedStyle(e,null):e.currentStyle?o?e.currentStyle[o.replace(/-\w/g,(function(t){return t.toUpperCase().replace("-","")}))]:e.currentStyle:void 0}function a(e){var o=e.getBoundingClientRect(),i=t.pageYOffset||s.documentElement.scrollTop;e=t.pageXOffset||s.documentElement.scrollLeft;return{top:o.top+i,left:o.left+e}}e.Helpers={supportsPassive:o,isEmptyObject:function(t){for(var e in t)return!1;return!0},debounce:function(t,e,s){var o;return function(){var i=this,l=arguments,a=s&&!o;clearTimeout(o),o=setTimeout((function(){o=null,s||t.apply(i,l)}),e),a&&t.apply(i,l)}},hasClass:function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)},offset:a,position:function(t){var e=t.offsetParent,s=a(e),o=a(t);e=l(e),t=l(t);return s.top+=parseInt(e.borderTopWidth)||0,s.left+=parseInt(e.borderLeftWidth)||0,{top:o.top-s.top-(parseInt(t.marginTop)||0),left:o.left-s.left-(parseInt(t.marginLeft)||0)}},getElement:function(e){var o=null;return"string"==typeof e?o=s.querySelector(e):t.jQuery&&e instanceof t.jQuery&&e.length?o=e[0]:e instanceof Element&&(o=e),o},getStyle:l,getCascadedStyle:function(e){var o,i=e.cloneNode(!0);i.style.display="none",Array.prototype.slice.call(i.querySelectorAll('input[type="radio"]')).forEach((function(t){t.removeAttribute("name")})),e.parentNode.insertBefore(i,e.nextSibling),i.currentStyle?o=i.currentStyle:t.getComputedStyle&&(o=s.defaultView.getComputedStyle(i,null));var l,a,n,r={};for(l in o)!isNaN(l)||"string"!=typeof o[l]&&"number"!=typeof o[l]||(r[l]=o[l]);if(Object.keys(r).length<3)for(var c in r={},o)isNaN(c)||(r[o[c].replace(/-\w/g,(function(t){return t.toUpperCase().replace("-","")}))]=o.getPropertyValue(o[c]));return r.margin||"auto"!==r.marginLeft?r.margin||r.marginLeft!==r.marginRight||r.marginLeft!==r.marginTop||r.marginLeft!==r.marginBottom||(r.margin=r.marginLeft):r.margin="auto",r.margin||"0px"!==r.marginLeft||"0px"!==r.marginRight||(n=(a=e.offsetLeft-e.parentNode.offsetLeft)-(parseInt(r.left)||0)-(parseInt(r.right)||0),0!=(n=e.parentNode.offsetWidth-e.offsetWidth-a-(parseInt(r.right)||0)+(parseInt(r.left)||0)-n)&&1!=n||(r.margin="auto")),i.parentNode.removeChild(i),i=null,r}}}(window)},60956:function(t,e,s){s.d(e,{Z:function(){return y}});var o=s(73396),i=s(87139),l=s(44870),a=s(18278);const n=t=>((0,o.dD)("data-v-4e4222cd"),t=t(),(0,o.Cn)(),t),r={class:"networks"},c={class:"title"},p={class:"list"},d={class:"network active"},u=n((()=>(0,o._)("div",{class:"logo"},[(0,o._)("img",{src:"/cosmoshub_logo.png",alt:""})],-1))),_={class:"name"},f={class:"token"};var v={__name:"Networks",setup(t){const e=(0,a.s)();return(t,s)=>((0,o.wg)(),(0,o.iD)("section",r,[(0,o._)("div",c,(0,i.zw)(t.$t("message.account_networks_title")),1),(0,o._)("div",p,[(0,o._)("button",d,[u,(0,o._)("div",null,[(0,o._)("div",_,(0,i.zw)((0,l.SU)(e).networks.cosmoshub.name),1),(0,o._)("div",f,(0,i.zw)((0,l.SU)(e).networks.cosmoshub.token_name),1)])])])]))}},g=s(40089);const m=(0,g.Z)(v,[["__scopeId","data-v-4e4222cd"]]);var y=m},5925:function(t,e,s){s.r(e),s.d(e,{default:function(){return Zt}});var o=s(73396),i=s(87139),l=s(49242),a=s(44870),n=s(18278),r=s(37368),c=s.n(r),p=s(60956);const d=t=>((0,o.dD)("data-v-1a4f54cb"),t=t(),(0,o.Cn)(),t),u={class:"network_logo"},_=["src"],f={class:"status"},v={key:0,class:"violet"},g=d((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_status_deposite"})],-1))),m={key:1,class:"blue"},y=d((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_status_voting"})],-1))),w={key:2,class:"green"},h=d((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_status_passed"})],-1))),b={key:3,class:"red"},k=d((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_status_rejected"})],-1))),S={key:0,class:"date"},T={key:1,class:"date"},O={key:2,class:"date"},E={class:"name"},z={class:"desc"},P={key:3,class:"progress"},L={class:"bar"},x={class:"funds"},j={class:"label"},D={class:"val"},A={class:"label"},R={class:"val"},C={key:4,class:"progress"},$={class:"bar"},U={class:"exp"},I={class:"yes green"},N={class:"label"},q={class:"val"},H={class:"no orange"},B={class:"label"},M={class:"val"},F={class:"nwv red"},W={class:"label"},V={class:"val"},Z={key:5,class:"progress"},Y={class:"bar"},G={class:"exp"},J={class:"yes green"},Q={class:"label"},K={class:"val"},X={class:"no orange"},tt={class:"label"},et={class:"val"},st={class:"nwv red"},ot={class:"label"},it={class:"val"},lt={class:"abstain grey"},at={class:"label"},nt={class:"val"};var rt={__name:"ProposalsItem",props:["proposal"],setup(t){const e=t,s=(0,n.s)(),l=(0,a.qj)({userTimeZone:(new Date).getTimezoneOffset()/60*-1});function r(t){let e=new Date(t);return new Date(e.setHours(e.getHours()+l.userTimeZone))}function c(t){let s=e.proposal.tally_no+e.proposal.tally_no_with_veto+e.proposal.tally_yes;return(t/s*100).toFixed(2)}function p(t){let s=e.proposal.tally_abstain+e.proposal.tally_no+e.proposal.tally_no_with_veto+e.proposal.tally_yes;return(t/s*100).toFixed(2)}return(l,n)=>{const d=(0,o.up)("vue-countdown"),rt=(0,o.up)("timeago"),ct=(0,o.up)("router-link");return(0,o.wg)(),(0,o.j4)(ct,{to:`/proposal/${e.proposal.id}`,class:"proposal"},{default:(0,o.w5)((()=>[(0,o._)("div",u,[(0,o._)("img",{src:`/${(0,a.SU)(s).currentNetwork}_logo.png`,alt:""},null,8,_)]),(0,o._)("div",f,["PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",v,[g,(0,o._)("span",null,(0,i.zw)(l.$t("message.account_proposals_status_deposite")),1)])):(0,o.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",m,[y,(0,o._)("span",null,(0,i.zw)(l.$t("message.account_proposals_status_voting")),1)])):(0,o.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",w,[h,(0,o._)("span",null,(0,i.zw)(l.$t("message.account_proposals_status_passed")),1)])):(0,o.kq)("",!0),"PROPOSAL_STATUS_REJECTED"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",b,[k,(0,o._)("span",null,(0,i.zw)(l.$t("message.account_proposals_status_rejected")),1)])):(0,o.kq)("",!0)]),"PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",S,[(0,o.Wm)(d,{time:r(t.proposal.deposit_end_time)-new Date},{default:(0,o.w5)((({days:t,hours:e,minutes:s,seconds:l})=>[(0,o.Uk)((0,i.zw)(t)+"D : "+(0,i.zw)(e)+"H : "+(0,i.zw)(s)+"M : "+(0,i.zw)(l)+"S ",1)])),_:1},8,["time"])])):(0,o.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",T,[(0,o.Wm)(d,{time:r(t.proposal.voting_end_time)-new Date},{default:(0,o.w5)((({days:t,hours:e,minutes:s,seconds:l})=>[(0,o.Uk)((0,i.zw)(t)+"D : "+(0,i.zw)(e)+"H : "+(0,i.zw)(s)+"M : "+(0,i.zw)(l)+"S ",1)])),_:1},8,["time"])])):(0,o.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status||"PROPOSAL_STATUS_REJECTED"==t.proposal.status?((0,o.wg)(),(0,o.iD)("div",O,[(0,o._)("div",null,(0,i.zw)(l.$t("message.proposal_date_label_default")),1),(0,o._)("div",null,[(0,o.Wm)(rt,{datetime:r(t.proposal.voting_end_time),autoUpdate:""},null,8,["datetime"])])])):(0,o.kq)("",!0),(0,o._)("div",E,"#"+(0,i.zw)(e.proposal.id)+" "+(0,i.zw)(e.proposal.title),1),(0,o._)("div",z,(0,i.zw)(e.proposal.description),1),"PROPOSAL_STATUS_DEPOSIT_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",P,[(0,o._)("div",L,[(0,o._)("div",{class:"violet",style:(0,i.j5)(`width: ${l.$filters.toFixed(e.proposal.deposit/(0,a.SU)(s).networks[(0,a.SU)(s).currentNetwork].exponent/(0,a.SU)(s).networks[(0,a.SU)(s).currentNetwork].proposal_need*100,2)}%;`)},null,4)]),(0,o._)("div",x,[(0,o._)("div",null,[(0,o._)("div",j,(0,i.zw)(l.$t("message.proposal_deposite_label_collected")),1),(0,o._)("div",D,(0,i.zw)(l.$filters.toFixed(e.proposal.deposit/(0,a.SU)(s).networks[(0,a.SU)(s).currentNetwork].exponent,0))+" "+(0,i.zw)((0,a.SU)(s).networks[(0,a.SU)(s).currentNetwork].token_name),1)]),(0,o._)("div",null,[(0,o._)("div",A,(0,i.zw)(l.$t("message.proposal_deposite_label_necessary")),1),(0,o._)("div",R,(0,i.zw)((0,a.SU)(s).networks[(0,a.SU)(s).currentNetwork].proposal_need)+" "+(0,i.zw)((0,a.SU)(s).networks[(0,a.SU)(s).currentNetwork].token_name),1)])])])):(0,o.kq)("",!0),"PROPOSAL_STATUS_VOTING_PERIOD"==e.proposal.status?((0,o.wg)(),(0,o.iD)("div",C,[(0,o._)("div",$,[(0,o._)("div",{class:"yes green",style:(0,i.j5)(`width: ${c(e.proposal.tally_yes)}%;`)},null,4),(0,o._)("div",{class:"no orange",style:(0,i.j5)(`width: ${c(e.proposal.tally_no)}%;`)},null,4),(0,o._)("div",{class:"nwv red",style:(0,i.j5)(`width: ${c(e.proposal.tally_no_with_veto)}%;`)},null,4)]),(0,o._)("div",U,[(0,o._)("div",I,[(0,o._)("div",N,(0,i.zw)(l.$t("message.proposal_voting_label_yes")),1),(0,o._)("div",q,(0,i.zw)(c(e.proposal.tally_yes))+"%",1)]),(0,o._)("div",H,[(0,o._)("div",B,(0,i.zw)(l.$t("message.proposal_voting_label_no")),1),(0,o._)("div",M,(0,i.zw)(c(e.proposal.tally_no))+"%",1)]),(0,o._)("div",F,[(0,o._)("div",W,(0,i.zw)(l.$t("message.proposal_voting_label_nwv")),1),(0,o._)("div",V,(0,i.zw)(c(e.proposal.tally_no_with_veto))+"%",1)])])])):(0,o.kq)("",!0),"PROPOSAL_STATUS_PASSED"==e.proposal.status||"PROPOSAL_STATUS_REJECTED"==t.proposal.status?((0,o.wg)(),(0,o.iD)("div",Z,[(0,o._)("div",Y,[(0,o._)("div",{class:"yes green",style:(0,i.j5)(`width: ${p(e.proposal.tally_yes)}%;`)},null,4),(0,o._)("div",{class:"no orange",style:(0,i.j5)(`width: ${p(e.proposal.tally_no)}%;`)},null,4),(0,o._)("div",{class:"nwv red",style:(0,i.j5)(`width: ${p(e.proposal.tally_no_with_veto)}%;`)},null,4)]),(0,o._)("div",G,[(0,o._)("div",J,[(0,o._)("div",Q,(0,i.zw)(l.$t("message.proposal_voting_label_yes")),1),(0,o._)("div",K,(0,i.zw)(p(e.proposal.tally_yes))+"%",1)]),(0,o._)("div",X,[(0,o._)("div",tt,(0,i.zw)(l.$t("message.proposal_voting_label_no")),1),(0,o._)("div",et,(0,i.zw)(p(e.proposal.tally_no))+"%",1)]),(0,o._)("div",st,[(0,o._)("div",ot,(0,i.zw)(l.$t("message.proposal_voting_label_nwv")),1),(0,o._)("div",it,(0,i.zw)(p(e.proposal.tally_no_with_veto))+"%",1)]),(0,o._)("div",lt,[(0,o._)("div",at,(0,i.zw)(l.$t("message.proposal_voting_label_abstain")),1),(0,o._)("div",nt,(0,i.zw)(p(e.proposal.tally_abstain))+"%",1)])])])):(0,o.kq)("",!0)])),_:1},8,["to"])}}},ct=s(40089);const pt=(0,ct.Z)(rt,[["__scopeId","data-v-1a4f54cb"]]);var dt=pt;function ut(t,e,s,l,a,n){return(0,o.wg)(),(0,o.iD)("a",{style:(0,i.j5)({display:t.activeBlock}),class:"back_to_top",title:"Наверх"},[(0,o._)("main",null,[(0,o.WI)(t.$slots,"default",{},void 0,!0)])],4)}var _t={name:"ButtonTop",data:()=>({activeBlock:"display"}),methods:{trackScroll(){const t=window.pageYOffset,e=document.documentElement.clientHeight;t>e&&(this.activeBlock="block"),t<e&&(this.activeBlock="none")},backToTop(){window.pageYOffset>0&&window.scrollTo({top:0,behavior:"smooth"})}},mounted(){const t=document.querySelector(".back_to_top");window.addEventListener("scroll",this.trackScroll),t.addEventListener("click",this.backToTop)}};const ft=(0,ct.Z)(_t,[["render",ut],["__scopeId","data-v-23136fe8"]]);var vt=ft,gt=vt;const mt=t=>((0,o.dD)("data-v-c7c03b9e"),t=t(),(0,o.Cn)(),t),yt={class:"proposals_page"},wt={class:"cont middle"},ht={class:"back_btn"},bt=mt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_arrow_hor"})],-1))),kt={class:"grid row"},St={class:"col"},Tt={class:"col_main"},Ot={class:"head sticky"},Et={class:"title"},zt={key:0,class:"loader_wrap"},Pt=mt((()=>(0,o._)("div",{class:"loader"},[(0,o._)("span")],-1))),Lt=[Pt],xt={key:1,class:"proposals"},jt={key:0,class:"loader_wrap"},Dt=mt((()=>(0,o._)("div",{class:"loader"},[(0,o._)("span")],-1))),At=[Dt],Rt=mt((()=>(0,o._)("div",{class:"load_more_area"},null,-1))),Ct={class:"col"},$t={class:"filter sticky"},Ut={class:"title"},It=["onClick"],Nt=mt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_check"})],-1))),qt=mt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_check"})],-1))),Ht=mt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_check"})],-1))),Bt=mt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_check"})],-1))),Mt=mt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_check"})],-1))),Ft=mt((()=>(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_arrow_ver"})],-1)));var Wt={__name:"Proposals",setup(t){const e=(0,n.s)(),s=(0,o.f3)("i18n"),r=(0,a.iH)(!1),d=(0,a.iH)(!1),u=(0,a.qj)({loading:!1,allReceived:!1,showButtonUp:!1,filter_deposit:!1,filter_voting:!1,filter_passed:!1,filter_rejected:!1,filter:""});async function _(){u.loading=!0,u.offset=u.offset+u.limit,await g(!0)}async function f(t){"deposit"==t&&(u.filter_deposit=!u.filter_deposit),"voting"==t&&(u.filter_voting=!u.filter_voting),"passed"==t&&(u.filter_passed=!u.filter_passed),"rejected"==t&&(u.filter_rejected=!u.filter_rejected),u.filter="",u.filter_deposit&&(u.filter+=",PROPOSAL_STATUS_DEPOSIT_PERIOD"),u.filter_voting&&(u.filter+=",PROPOSAL_STATUS_VOTING_PERIOD"),u.filter_passed&&(u.filter+=",PROPOSAL_STATUS_PASSED"),u.filter_rejected&&(u.filter+=",PROPOSAL_STATUS_REJECTED"),u.allReceived=!1,await g()}async function v(){u.allReceived=!1,u.filter_deposit=!1,u.filter_voting=!1,u.filter_passed=!1,u.filter_rejected=!1,u.filter="",await g()}async function g(t=!1){d.value=!0;let e="";t||(r.value=!1,u.proposals=[],u.offset=0,u.limit=10),e=u.filter.length?`https://rpc.bronbro.io/gov/proposals?limit=${u.limit}&offset=${u.offset}&status__in=${u.filter.substring(1)}`:`https://rpc.bronbro.io/gov/proposals?limit=${u.limit}&offset=${u.offset}`,await fetch(e).then((t=>t.json())).then((e=>{e.proposals.length?u.proposals=u.proposals.concat(e.proposals):u.allReceived=!0,t?u.loading=!1:r.value=!0,d.value=!1})),y.observe(document.querySelector(".load_more_area"))}function m(t){for(const e of t)e.intersectionRatio>=1&&!u.loading&&!u.allReceived&&_()}(0,o.wF)((async()=>{e.tooltip=s.global.t("message.notice_default_proposals_page");try{await g()}catch(o){console.log(o)}let t=document.querySelectorAll(".sticky");t.forEach((t=>new(c())(t,{top:118})))}));var y=new IntersectionObserver(m,{threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]});return(t,e)=>{const s=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("section",yt,[(0,o._)("div",wt,[(0,o._)("div",ht,[(0,o.Wm)(s,{to:"/account/cosmoshub",class:"btn"},{default:(0,o.w5)((()=>[bt])),_:1})]),(0,o._)("div",kt,[(0,o._)("section",St,[(0,o.Wm)(p.Z,{class:"sticky"})]),(0,o._)("section",Tt,[(0,o._)("div",Ot,[(0,o._)("div",Et,(0,i.zw)(t.$t("message.account_proposals_title")),1)]),r.value?((0,o.wg)(),(0,o.iD)("div",xt,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(u.proposals,((t,e)=>((0,o.wg)(),(0,o.j4)(dt,{key:e,proposal:t},null,8,["proposal"])))),128))])):((0,o.wg)(),(0,o.iD)("div",zt,Lt)),u.proposals.length?((0,o.wg)(),(0,o.iD)(o.HY,{key:2},[u.loading?((0,o.wg)(),(0,o.iD)("div",jt,At)):(0,o.kq)("",!0),Rt],64)):(0,o.kq)("",!0)]),(0,o._)("section",Ct,[(0,o._)("div",$t,[(0,o._)("div",Ut,(0,i.zw)(t.$t("message.filter_title")),1),(0,o._)("div",{class:(0,i.C_)(["items",{lock:d.value}])},[(0,o._)("button",{class:(0,i.C_)(["btn",{active:!u.filter.length}]),onClick:(0,l.iM)(v,["prevent"])},[(0,o._)("span",null,(0,i.zw)(t.$t("message.account_proposals_status_all")),1),Nt],10,It),(0,o._)("button",{class:(0,i.C_)(["btn",{active:u.filter_deposit}]),onClick:e[0]||(e[0]=(0,l.iM)((t=>f("deposit")),["prevent"]))},[(0,o._)("span",null,(0,i.zw)(t.$t("message.account_proposals_status_deposite")),1),qt],2),(0,o._)("button",{class:(0,i.C_)(["btn",{active:u.filter_passed}]),onClick:e[1]||(e[1]=(0,l.iM)((t=>f("passed")),["prevent"]))},[(0,o._)("span",null,(0,i.zw)(t.$t("message.account_proposals_status_passed")),1),Ht],2),(0,o._)("button",{class:(0,i.C_)(["btn",{active:u.filter_rejected}]),onClick:e[2]||(e[2]=(0,l.iM)((t=>f("rejected")),["prevent"]))},[(0,o._)("span",null,(0,i.zw)(t.$t("message.account_proposals_status_rejected")),1),Bt],2),(0,o._)("button",{class:(0,i.C_)(["btn",{active:u.filter_voting}]),onClick:e[3]||(e[3]=(0,l.iM)((t=>f("voting")),["prevent"]))},[(0,o._)("span",null,(0,i.zw)(t.$t("message.account_proposals_status_voting")),1),Mt],2)],2)]),(0,o.Wm)((0,a.SU)(gt),{class:"btn_up"},{default:(0,o.w5)((()=>[Ft])),_:1})])])])])}}};const Vt=(0,ct.Z)(Wt,[["__scopeId","data-v-c7c03b9e"]]);var Zt=Vt}}]);
//# sourceMappingURL=925.99a54220.js.map