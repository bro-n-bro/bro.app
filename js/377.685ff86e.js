"use strict";(self["webpackChunkbro_app"]=self["webpackChunkbro_app"]||[]).push([[377],{94377:function(t,e,a){a.r(e),a.d(e,{default:function(){return _t}});var o=a(73396),s=a(44870),i=a(87139),l=a(49242),n=a(27795),r=a(21030),c=a(16006),u=a(62287),_=a(22483),d=a(21037),p=a(39521),g=a(10996),f=a.n(g),v=a(42325),m=a(15941),b=a(15361)["Buffer"];const y=n+"#ic_arrow_hor",h=n+"#ic_check",w=n+"#ic_close",k={class:"create_passport"},x={class:"cont"},C={class:"back_btn"},S=(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":y})],-1),z=(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":y})],-1),D={class:"data_wrap"},H={class:"data_hide",id:"completed_passport"},L={class:"data active"},P={class:"avatar"},M={for:"avatar",class:"box hide"},U={key:0,class:"loader_wrap"},j=(0,o._)("div",{class:"loader"},[(0,o._)("span")],-1),T=[j],$={key:1,class:"image"},q={key:0,src:"/demo_avatar.jpg",alt:""},O=["src"],E=(0,o.uE)('<div class="logo"><img src="'+r+'" alt=""><div class="corner corner_top_left"></div><div class="corner corner_top_right"></div><div class="corner corner_bottom_left"></div><div class="corner corner_bottom_right"></div></div>',1),I={class:"info"},A={class:"line"},B={class:"field"},F={class:"label"},N=["value"],R={class:"field"},X={class:"label"},V={key:0,class:"exp"},Y=["readonly"],G=(0,o._)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},[(0,o._)("path",{d:"M9.57716 3.76801L10.5638 2.78134C10.6876 2.65747 10.8347 2.55921 10.9965 2.49217C11.1583 2.42513 11.3317 2.39062 11.5068 2.39062C11.682 2.39062 11.8554 2.42513 12.0172 2.49217C12.179 2.55921 12.326 2.65747 12.4498 2.78134L13.3925 3.72401C13.6425 3.97404 13.7829 4.31312 13.7829 4.66667C13.7829 5.02023 13.6425 5.3593 13.3925 5.60934L12.4058 6.59601M9.57716 3.76801L3.16649 10.178C2.94515 10.3994 2.80874 10.6915 2.78116 11.0033L2.61983 12.83C2.61116 12.9271 2.6239 13.0249 2.65714 13.1166C2.69039 13.2082 2.74333 13.2915 2.81223 13.3604C2.88114 13.4294 2.96433 13.4824 3.05595 13.5158C3.14757 13.5491 3.24538 13.5619 3.34249 13.5533L5.16916 13.392C5.48144 13.3647 5.77413 13.2283 5.99583 13.0067L12.4058 6.59601M9.57716 3.76801L12.4058 6.59601",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round",fill:"none"})],-1),J=[G],K=(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":h})],-1),Q=[K],W=(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":w})],-1),Z=[W],tt={class:"line citizenship"},et={class:"field"},at={class:"label"},ot=["innerHTML"],st=(0,o._)("img",{src:c,alt:"",class:"img"},null,-1),it=(0,o.uE)('<div class="bg_line"><div class="corner corner_top_left"></div><div class="corner corner_top_right"></div><div class="corner corner_bottom_left"></div><div class="corner corner_bottom_right"></div></div><div class="bg_left"></div><div class="bg_right"></div><div class="bg_bottom"></div>',4),lt={key:0,class:"bottom_btns"},nt={key:0,for:"avatar",class:"btn change_image_btn"},rt=["href"];var ct={__name:"Passport",setup(t){const e=(0,u.s)(),a=(0,o.f3)("i18n"),n=(0,d.lm)(),r=(0,_.tv)(),c=(0,s.iH)(null),g=(0,s.qj)({src:"",buffer:"",status:!1}),y=e.account.moonPassportOwnerAddress,h=(0,s.iH)(e.account.moonPassportOwner.extension.nickname),w=(0,s.iH)(!1),j=(0,s.iH)(""),G=(0,s.iH)(!1),K=e.demo?(0,s.iH)(!0):(0,s.iH)(!1),W=(0,s.iH)(!1),ct=(0,s.iH)("");function ut(){let t=event.target.closest(".line").querySelector(".input");W.value=!0,setTimeout((()=>t.focus()))}function _t(){W.value=!1,h.value=e.account.moonPassportOwner.extension.nickname}function dt(){let t=new FormData;if(g.status=!1,c.value.files[0].size/1024/1024<=5){t.append("avatar",c.value.files[0]);let e=new FileReader;e.onload=async()=>{g.buffer=b(e.result),g.src=e.result,g.status=!0},e.readAsDataURL(c.value.files[0])}else n.notify({group:"default",durartion:5e3,title:a.global.t("message.notification_error_file_size_title"),text:a.global.t("message.notification_error_file_size_text",{size:"5mb"}),type:"error"})}async function pt(){n.notify({group:"default",duration:-100,title:a.global.t("message.notification_passport_update_process")}),G.value=!0;try{if(e.demo)o={code:0};else{let a=await e.IPFSNode.add(c.value.files[0]);var t=await(0,v.r0)({update_avatar:{new_avatar:a.path,nickname:h.value}}),o=await(0,v.pi)(t)}0===o.code&&(e.lastTXS=o.transactionHash,n.notify({group:"default",clean:!0}),n.notify({group:"default",title:a.global.t("message.notification_success_update_passport_title"),type:"success",data:{chain:"bostrom",tx_type:a.global.t("message.notification_action_update_passport")}}),g.buffer="",p.hi(document.getElementById("completed_passport"),{quality:1}).then((t=>j.value=t)).catch((t=>m.error(t))),e.demo||(await e.getMoonPassport(),await e.getOwnerMoonPassport()),e.account.avatar=g.src),o.code&&(n.notify({group:"default",clean:!0}),n.notify({duration:-100,group:"default",title:a.global.t("message.notification_failed_title"),text:o?.rawLog.toString(),type:"error",data:{chain:"bostrom",tx_type:a.global.t("message.notification_action_update_passport")}}))}catch(s){m.log(s),n.notify({group:"default",clean:!0}),n.notify({group:"default",title:a.global.t("message.notification_failed_title"),text:a.global.t("message.notification_tx_error_rejected"),type:"error",data:{chain:"bostrom",tx_type:a.global.t("message.notification_action_update_passport")}})}G.value=!1}function gt(t){let e=/^([a-z0-9-]*)$/g.test(t.target.value);t.target.value.length<8||t.target.value.length>16||!e?w.value=!0:w.value=!1}async function ft(){try{let t=await e.jsCyber.queryContractSmart(e.CONTRACT_ADDRESS_PASSPORT,{passport_by_nickname:{nickname:h.value}});return t}catch(t){return m.log(t),null}}async function vt(){if(w.value)n.notify({group:"default",clean:!0}),n.notify({durartion:5e3,group:"default",title:a.global.t("message.passport_error_nickname_title"),text:a.global.t("message.passport_name_exp"),type:"error",data:{chain:"bostrom",tx_type:a.global.t("message.notification_action_update_passport")}});else if(null==await ft()){n.notify({group:"default",duration:-100,title:a.global.t("message.notification_passport_update_process")}),G.value=!0,W.value=!1;try{if(e.demo)o={code:0};else var t=await(0,v.r0)({update_name:{new_nickname:h.value,old_nickname:e.account.moonPassportOwner.extension.nickname}}),o=await(0,v.pi)(t);0===o.code&&(e.lastTXS=o.transactionHash,n.notify({group:"default",clean:!0}),n.notify({group:"default",title:a.global.t("message.notification_success_update_passport_title"),type:"success",data:{chain:"bostrom",tx_type:a.global.t("message.notification_action_update_passport")}}),ct.value=f()(h.value),p.hi(document.getElementById("completed_passport"),{quality:1}).then((t=>j.value=t)).catch((t=>m.error(t))),e.demo||(await e.getMoonPassport(),await e.getOwnerMoonPassport())),o.code&&(n.notify({group:"default",clean:!0}),n.notify({duration:-100,group:"default",title:a.global.t("message.notification_failed_title"),text:o?.rawLog.toString(),type:"error",data:{chain:"bostrom",tx_type:a.global.t("message.notification_action_update_passport")}}))}catch(s){m.log(s),n.notify({group:"default",clean:!0}),n.notify({group:"default",title:a.global.t("message.notification_failed_title"),text:a.global.t("message.notification_tx_error_rejected"),type:"error",data:{chain:"bostrom",tx_type:a.global.t("message.notification_action_update_passport")}})}G.value=!1}else n.notify({group:"default",durartion:5e3,title:a.global.t("message.notification_error_nickName_title"),text:a.global.t("message.notification_error_nickName_desc"),type:"error"}),w.value=!0}return(0,o.wF)((()=>{e.tooltip=a.global.t("message.notice_default_account_passport"),ct.value=f()(h.value)})),(0,o.m0)((()=>{if(e.IPFSNode){let t=0;e.account.avatar||(t=5100),setTimeout((()=>{g.src=e.account.avatar,g.status=!0,p.hi(document.getElementById("completed_passport"),{quality:1}).then((t=>{j.value=t,K.value=!0})).catch((t=>m.error(t)))}),t)}})),(t,a)=>{const n=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("section",k,[(0,o._)("div",x,[(0,o._)("div",C,[(0,s.SU)(e).demo?((0,o.wg)(),(0,o.j4)(n,{key:0,to:(0,s.SU)(r).options.history.state.back?(0,s.SU)(r).options.history.state.back:"/account/cosmoshub?demo=true",class:"btn"},{default:(0,o.w5)((()=>[S])),_:1},8,["to"])):((0,o.wg)(),(0,o.j4)(n,{key:1,to:(0,s.SU)(r).options.history.state.back?(0,s.SU)(r).options.history.state.back:"/account/cosmoshub",class:"btn"},{default:(0,o.w5)((()=>[z])),_:1},8,["to"]))]),(0,o._)("div",D,[(0,o._)("div",H,[(0,o._)("div",L,[(0,o._)("div",P,[(0,o._)("input",{type:"file",id:"avatar",ref_key:"avatar",ref:c,accept:"image/png, image/jpeg",onChange:dt},null,544),(0,o._)("label",M,[g.status||(0,s.SU)(e).demo?((0,o.wg)(),(0,o.iD)("div",$,[(0,o._)("div",null,[(0,s.SU)(e).demo?((0,o.wg)(),(0,o.iD)("img",q)):((0,o.wg)(),(0,o.iD)("img",{key:1,src:g.src,alt:""},null,8,O))])])):((0,o.wg)(),(0,o.iD)("div",U,T))]),E]),(0,o._)("form",I,[(0,o._)("div",A,[(0,o._)("div",B,[(0,o._)("div",F,(0,i.zw)(t.$t("message.passport_address_exp")),1),(0,o._)("input",{type:"text",value:(0,s.SU)(y).slice(0,13)+"..."+(0,s.SU)(y).slice(-6),class:"input",readonly:""},null,8,N)])]),(0,o._)("div",{class:(0,i.C_)(["line",{error:w.value}])},[(0,o._)("div",R,[(0,o._)("div",X,(0,i.zw)(t.$t("message.passport_name_label")),1),W.value&&!G.value?((0,o.wg)(),(0,o.iD)("div",V,(0,i.zw)(t.$t("message.passport_name_exp")),1)):(0,o.kq)("",!0),(0,o.wy)((0,o._)("input",{class:"input",type:"text",name:"name",maxlength:"16","onUpdate:modelValue":a[0]||(a[0]=t=>h.value=t),onInput:gt,readonly:!W.value},null,40,Y),[[l.nr,h.value]]),W.value||G.value?((0,o.wg)(),(0,o.iD)(o.HY,{key:2},[(0,o._)("button",{type:"submit",class:"submit_btn",onClick:a[2]||(a[2]=(0,l.iM)((t=>vt()),["prevent"]))},Q),(0,o._)("button",{type:"button",class:"cancel_btn",onClick:a[3]||(a[3]=(0,l.iM)((t=>_t()),["prevent"]))},Z)],64)):((0,o.wg)(),(0,o.iD)("button",{key:1,type:"button",class:"edit_btn",onClick:a[1]||(a[1]=t=>ut())},J))])],2),(0,o._)("div",tt,[(0,o._)("div",et,[(0,o._)("div",at,(0,i.zw)(t.$t("message.passport_citizenship_label")),1),(0,o._)("div",{class:"text",innerHTML:t.$t("message.passport_citizenship_text")},null,8,ot),st])])]),it,(0,o._)("div",{class:"gradient",style:(0,i.j5)({background:ct.value})},null,4)])])]),(0,s.SU)(K)?((0,o.wg)(),(0,o.iD)("div",lt,[!g.buffer.length||G.value?((0,o.wg)(),(0,o.iD)("label",nt,(0,i.zw)(t.$t("message.btn_change_image")),1)):((0,o.wg)(),(0,o.iD)("button",{key:1,class:"btn update_btn",onClick:a[4]||(a[4]=(0,l.iM)((t=>pt()),["prevent"]))},(0,i.zw)(t.$t("message.btn_update")),1)),(0,o._)("a",{href:j.value,download:"my_passport.png",class:"btn download_btn"},(0,i.zw)(t.$t("message.btn_download_png")),9,rt)])):(0,o.kq)("",!0)])])}}};const ut=ct;var _t=ut}}]);
//# sourceMappingURL=377.685ff86e.js.map