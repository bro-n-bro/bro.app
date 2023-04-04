"use strict";(self["webpackChunkbro_app"]=self["webpackChunkbro_app"]||[]).push([[540],{3540:function(e,t,s){s.r(t),s.d(t,{default:function(){return ke}});var o=s(73396),n=s(44870),r=s(90318),a=s(95473),i=s(87139),k=s(49242);const c=e=>((0,o.dD)("data-v-e4b6f98c"),e=e(),(0,o.Cn)(),e),w={class:"logo"},l=["src"],d={class:"logo"},A=["src"],_={class:"name"},u={class:"logo"},U=["src"],m={class:"name"},S={class:"stats"},v={class:"label"},g={class:"val"},f={class:"label"},p={class:"val"},b=c((()=>(0,o._)("svg",null,[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_lock"})],-1))),h=[b];var D={__name:"Network",props:["network"],setup(e){const t=e,s=(0,r.s)(),a=(0,o.f3)("emitter");return(e,r)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["network",{empty:!(0,n.SU)(s).auth,disabled:!(0,n.SU)(s).networks[t.network].status&&(0,n.SU)(s).auth,default:(0,n.SU)(s).networks[t.network].tokens_sum}])},[(0,n.SU)(s).auth?((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,n.SU)(s).networks[t.network].status?((0,o.wg)(),(0,o.iD)("div",{key:1,class:"head",onMouseover:r[1]||(r[1]=o=>(0,n.SU)(a).emit("setNotification",e.$t("message.network_notice",{health:e.$filters.toFixed((0,n.SU)(s).networks[t.network].health,2),color:(0,n.SU)(s).networks[t.network].health_color})))},[(0,o._)("div",u,[(0,o._)("img",{src:`/${t.network}_logo.png`,alt:""},null,8,U)]),(0,o._)("div",m,(0,i.zw)((0,n.SU)(s).networks[t.network].name),1)],32)):((0,o.wg)(),(0,o.iD)("div",{key:0,class:"head",onMouseover:r[0]||(r[0]=o=>(0,n.SU)(s).networks[t.network].tokens_sum>0?(0,n.SU)(a).emit("setNotification",e.$t("message.network_lock_notice2")):(0,n.SU)(a).emit("setNotification",e.$t("message.network_lock_notice")))},[(0,o._)("div",d,[(0,o._)("img",{src:`/${t.network}_logo.png`,alt:""},null,8,A)]),(0,o._)("div",_,(0,i.zw)((0,n.SU)(s).networks[t.network].name),1)],32)),(0,o.wy)((0,o._)("div",{class:"tokens",onMouseover:r[2]||(r[2]=o=>(0,n.SU)(a).emit("setNotification",e.$t("message.network_sum_notice",{network:(0,n.SU)(s).networks[t.network].name})))},(0,i.zw)(e.$filters.toFixed((0,n.SU)(s).networks[t.network].tokens_sum,2))+" "+(0,i.zw)((0,n.SU)(s).networks[t.network].token_name),545),[[k.F8,(0,n.SU)(s).networks[t.network].status]]),(0,o.wy)((0,o._)("div",{class:"visualization",onMouseover:r[3]||(r[3]=o=>(0,n.SU)(a).emit("setNotification",e.$t("message.network_tokens_notice",{delegations_tokens:e.$filters.toFixed((0,n.SU)(s).networks[t.network].delegations_tokens,6),availabel_tokens:e.$filters.toFixed((0,n.SU)(s).networks[t.network].availabel_tokens,6),rewards_tokens:e.$filters.toFixed((0,n.SU)(s).networks[t.network].rewards_tokens,6),ibc_tokens:e.$filters.toFixed((0,n.SU)(s).networks[t.network].ibc_tokens,6),denom:(0,n.SU)(s).networks[t.network].token_name,network:(0,n.SU)(s).networks[t.network].name})))},[(0,o.wy)((0,o._)("div",{class:"staked",style:(0,i.j5)({width:e.$filters.toFixed((0,n.SU)(s).networks[t.network].delegations_percents,2)+"%"})},null,4),[[k.F8,(0,n.SU)(s).networks[t.network].delegations_tokens]]),(0,o.wy)((0,o._)("div",{class:"liquid",style:(0,i.j5)({width:e.$filters.toFixed((0,n.SU)(s).networks[t.network].availabel_percents,2)+"%"})},null,4),[[k.F8,(0,n.SU)(s).networks[t.network].availabel_tokens]]),(0,o.wy)((0,o._)("div",{class:"rewards",style:(0,i.j5)({width:e.$filters.toFixed((0,n.SU)(s).networks[t.network].rewards_percents,2)+"%"})},null,4),[[k.F8,(0,n.SU)(s).networks[t.network].rewards_tokens]]),(0,o.wy)((0,o._)("div",{class:"IBC",style:(0,i.j5)({width:e.$filters.toFixed((0,n.SU)(s).networks[t.network].ibc_percents,2)+"%"})},null,4),[[k.F8,(0,n.SU)(s).networks[t.network].ibc_tokens]])],544),[[k.F8,(0,n.SU)(s).networks[t.network].status]]),(0,o.wy)((0,o._)("div",S,[(0,o._)("div",{onMouseover:r[4]||(r[4]=t=>(0,n.SU)(a).emit("setNotification",e.$t("message.network_personal_APR_notice")))},[(0,o._)("div",v,(0,i.zw)(e.$t("message.personal_apr")),1),(0,o._)("div",g,(0,i.zw)(e.$filters.toFixed((0,n.SU)(s).networks[t.network].personal_APR,2))+"%",1)],32),(0,o._)("div",{onMouseover:r[5]||(r[5]=o=>(0,n.SU)(a).emit("setNotification",e.$t("message.network_RPDE_notice",{denom:(0,n.SU)(s).networks[t.network].token_name})))},[(0,o._)("div",f,(0,i.zw)(e.$t("message.RPDE")),1),(0,o._)("div",p,(0,i.zw)(e.$filters.toFixed((0,n.SU)(s).networks[t.network].RPDE,2)),1)],32)],512),[[k.F8,(0,n.SU)(s).networks[t.network].status]]),(0,o.wy)((0,o._)("div",{class:"lock",onMouseover:r[6]||(r[6]=o=>(0,n.SU)(s).networks[t.network].tokens_sum>0?(0,n.SU)(a).emit("setNotification",e.$t("message.network_lock_notice2")):(0,n.SU)(a).emit("setNotification",e.$t("message.network_lock_notice")))},h,544),[[k.F8,!(0,n.SU)(s).networks[t.network].status]]),(0,n.SU)(s).networks[t.network].status&&(0,n.SU)(s).auth?((0,o.wg)(),(0,o.iD)("button",{key:2,class:"details_btn",onClick:r[7]||(r[7]=(0,k.iM)((e=>(0,n.SU)(a).emit("openManageModal",{network:t.network})),["prevent"]))},(0,i.zw)(e.$t("message.manage_btn")),1)):((0,o.wg)(),(0,o.iD)("button",{key:3,class:"delegate_btn",onClick:r[8]||(r[8]=(0,k.iM)((e=>(0,n.SU)(a).emit("openManageModal",{network:t.network})),["prevent"]))},(0,i.zw)(e.$t("message.delegate_btn")),1))],64)):((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o._)("div",w,[(0,o._)("img",{src:`/${t.network}_logo.png`,alt:""},null,8,l)]),(0,o._)("div",null,(0,i.zw)((0,n.SU)(s).networks[t.network].name),1)],64)),(0,o._)("div",{class:(0,i.C_)(["shadow",[(0,n.SU)(s).networks[t.network].health_color]]),style:(0,i.j5)({"--speed":(0,n.SU)(s).networks[t.network].speed+"s"})},null,6)],2))}},y=s(40089);const F=(0,y.Z)(D,[["__scopeId","data-v-e4b6f98c"]]);var E=F;const z=e=>((0,o.dD)("data-v-d6879f30"),e=e(),(0,o.Cn)(),e),N={class:"account"},R={class:"user_name"},C={class:"stats"},M={class:"label"},x={class:"val"},T={class:"label"},K={class:"val"},Y=z((()=>(0,o._)("div",{class:"shadow"},null,-1)));var Q={__name:"Account",setup(e){const t=(0,r.s)(),s=(0,o.f3)("emitter");return(e,r)=>{const a=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",N,[(0,o._)("div",R,(0,i.zw)((0,n.SU)(t).userName),1),(0,o._)("div",{class:"balance",onMouseover:r[0]||(r[0]=t=>(0,n.SU)(s).emit("setNotification",e.$t("message.account_balance_notice")))},["USDT"==(0,n.SU)(t).currency?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Uk)((0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.balance_usdt,1)),1)],64)):(0,o.kq)("",!0),"ATOM"==(0,n.SU)(t).currency?((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o.Uk)((0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.balance_atom,2)),1)],64)):(0,o.kq)("",!0),"ETH"==(0,n.SU)(t).currency?((0,o.wg)(),(0,o.iD)(o.HY,{key:2},[(0,o.Uk)((0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.balance_eth,4)),1)],64)):(0,o.kq)("",!0),"BTC"==(0,n.SU)(t).currency?((0,o.wg)(),(0,o.iD)(o.HY,{key:3},[(0,o.Uk)((0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.balance_btc,5)),1)],64)):(0,o.kq)("",!0),(0,o.Uk)(" "+(0,i.zw)((0,n.SU)(t).currency),1)],32),(0,o._)("div",C,[(0,o._)("div",{onMouseover:r[1]||(r[1]=t=>(0,n.SU)(s).emit("setNotification",e.$t("message.account_RPDE_notice")))},[(0,o._)("div",M,(0,i.zw)(e.$t("message.RPDE")),1),(0,o._)("div",x,["USDT"==(0,n.SU)(t).currency?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Uk)((0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.RPDE_usdt,3)),1)],64)):(0,o.kq)("",!0),"ATOM"==(0,n.SU)(t).currency?((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o.Uk)((0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.RPDE_atom,3)),1)],64)):(0,o.kq)("",!0),"ETH"==(0,n.SU)(t).currency?((0,o.wg)(),(0,o.iD)(o.HY,{key:2},[(0,o.Uk)((0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.RPDE_eth,3)),1)],64)):(0,o.kq)("",!0),"BTC"==(0,n.SU)(t).currency?((0,o.wg)(),(0,o.iD)(o.HY,{key:3},[(0,o.Uk)((0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.RPDE_btc,3)),1)],64)):(0,o.kq)("",!0)])],32),(0,o._)("div",{onMouseover:r[2]||(r[2]=t=>(0,n.SU)(s).emit("setNotification",e.$t("message.account_personal_APR_notice")))},[(0,o._)("div",T,(0,i.zw)(e.$t("message.personal_apr")),1),(0,o._)("div",K,(0,i.zw)(e.$filters.toFixed((0,n.SU)(t).account.personal_APR,2))+"%",1)],32)]),(0,o.Wm)(a,{to:"/under_construction",class:"details_btn"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(e.$t("message.details_btn")),1)])),_:1}),Y])}}};const H=(0,y.Z)(Q,[["__scopeId","data-v-d6879f30"]]);var I=H,B="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARISURBVHgBxZVbaBxlFMf/szOz991sdjfbpNkW2zSkqAi2KLGgSI2KSrWo2Cd9ES8oKQXxgi+iCMWgDRYfLIKFig8qpQ95VGgfFClYa01JpLTWGEOuu5NsZnfu83nOzCatNU2TPuiBM5dvZs7vnPOdcwb4D0S6dmHnEaGO6XgkqmCP5SNft7GoKBjSX5OO4yblH5DMoLgnr+JYTwHb7txA91Hgh7+Ak2OA74vzdn3hcbzfehnrlGVIy4B4SHjWiYZhJrd0tGBrDoESEL/PA5+fE7BdTEJqPGy/lR7GOiSAJD8QGx2rcdapjpWgJhDPd6KroKKcAcpZ4LYiULOAT37yQenTIEceM16XflwrJMIH29JfciqXS3CMYNGyPczWgbkGMF4Dzs2QI5S6t3dFUEqJVs/1vy0dEn3rgnj16jOwyaJL7no2hO8Gns/QUoV0cpFA04DhAW/uktGVQ0qz/KHcIbFnzRA0tFsQTRLAARyy7phwPA81myBGqNMU2XmKiCM8cHcEe7tFXPKc4/kBd9+NIAofJOHbQiCOeAtFQxatBXhKHIachtwsDUGapLe3tAL3bQL23SpDs2T1lynx5XifiO3fIR1bNRI5234BOhVOtoNWyJJF+TE02isTDQpukbQjDfTfBfRupFcIbHphiW8vSvKONhz9alS8sCrEj6XfkwrdEJPDiJa2cVOQlYUQZDvY2iLw1HZiu0DVJCilUSdlB/IJoJBApJzGkROjov+6EO+d7JCSzn+BXBnuxK/IdHbTohlAkk4F92+WuHSDPeKCYGUAK6/nYkBbElIhhcPfjIgDK0JYOv3Mi0qqcMqPZmBPjaKt3EWu13BHSYAys+w9Azh9OqlJkdWdEJ6i1JWodtJRDH56Rjy5IuSPdyUzWyo+gWz5tGX7aMxcQrG9jHxxA+YpKI10gZUhVgisE8TxQthiE8Tpy8Xx2Rvfi8y/ICzV/VINhvEoMu1n67qOqKujNREJDFeNcD8YxNDl1NHZcK6kj9JGAwH5uIuXV4QEMripmlHVB6VkcbhS1YKG5NKdt8LGrJhX9mVJq1dFyhKXqTcU9F0fwvk/WK6kUvEHnEh05GKVGpCiiNGHWhOkNSNhMK+xcR5BM81nDhWn72HzqhAW/WD3bEJ2d8/Pa6MXKmGKuDH5zBNgrt5MnRFGN6kDf9bCycCqezBvCGGpf9w7bdrR3TXT/21kLtxcrrTZRmh0Sg+9n2peT5NOUB+PVoLr8SU7EtYgqQHRnlRxKqGi5/a2sCkl+jKt0n6p4Tu+CJoSDXo2U+dJjqe/ezb8m64JwlIcFDRzcJKGQU9rIkydQnmIylieb3zPJU0OnD7zvNS7rkiWpI0icmV8Td7eK8h1hayrTQjPM75OKfiZhu3eS69K60vXtZL7SDxH/7V+1/V3kgVJViI09zGRiuHDuMDRi9xvV8lNQZblsIgVPeSdGI3TVyQN/6f8DdmQElmZjZJhAAAAAElFTkSuQmCC",G="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAT+SURBVHgBxZVrbFRFFMf/c+/u9rZLt91uy6NrqWADEZGCiviAbyAhMRgMiYIQE7AQCZAWTTQk6gcTox8kRoJKovEVSfgAhkdBUYM8wgelIdYSaRGKpS8o2937nvscz21Tg0mBNiZykrMzd3dnfvM/Z865wP9gbLQvu59ddk+Zfb2hOPBmgNsJD6yVT0h+kT5y7i/8V8jZDRtK7rt69p1UaXITZtfHUV0DaAWwY0cQ5G6EZrx4e/mZP9/DOO0fiBCC9S176JjS37NYLk+j6N5pQHUWqK2DnCqDfGgfcKENajrzYfmP5xsZY2KsEGlkcnFp/dtuT/di3TBgFgZh5K6Bk7ud7fDzN+CvfAF4fBHKBge26kse/FIcPx4bK0SOPk6tXp2O9Vz+xlVVRcgSWDwGIZNImkdjaFvDsuctgFRcjKK2c/Vay5m56xu3f7vz6NHgTpAhJWKwY6nG7XKTHjkFgRIN3/PgUz58NQ9fL8Dr7oR3pQP+/CcRrlyDVL5/+cT9Hx/q2b27ZEwQy7JrdTkGO1FEEAluIOD7AXzXR6Cp5IVhUG8XvEsUvhmzEDZsRSpdtKR07wffXXxrS+qOEF0pdnUvgJPJwIpgQQCXAL5LahyXANqQKs9QIVJdiC1sh9SQgdi3GSUHSxdNeebkD4XCwvRtIX5NdYedKoXGHbhVVbBCBtvz4dFz4HgIuIvA1yGtyENZY0CqGqBVl8CYC6asQmJm/NGEGPxJ0x6uvCVk1WcHm1GTbTEpFyaTwSsnwvQEbAJEID8k+FoTwTQdjm4hMDWE7gBC7zIYhVeOryUvmRf3rZ8NY/akUSGRuakJ68KarKHqBnhpKXimEoYbwuYejPkenAr6Dw/h2AQ0neEb5xYg3G4CBYjF10NOZB6QLPfE9c5Zk0eFNHx6sNUpSz/vZ6v9XE8fvMlTYJdnkJd9mAsk2pxyZgu4VqSOw+ekyLUgPFLFr4EFFoFehCxPmpmU+KG2tlmJkb3lm4nNv7VfXPbY3EsUgRVOZxebMKMOdo0GNjVqDAISY5AkmUaqGSbRCQWNNBeMOkYARj+w2DwI49fqpG/ydz/STv1LyYht+vrwHlNJvsQrK0Rv63kk5tTTTUsiio5peDQ6Q+5YFlybw7NNqimVcpQnRTk6gAtJeQLCCRv7v5+UHBUS2bYDJz7nZeUv83S56O1opaROg+sUwzRDmLoLbrkUOp9C5w65YxoEzdN8kEJ4nSBZhCGqDIj6W0IiazxwcjdPV2wx7QT6uv4g0HQ4PAHD8Mlp4yGATwAHnsXhGDpsPQ9bpeKlOvMCma5+OPW2kMiaDp/exa30VkOPo+/qBUpsHb1eYrBMAukOjZxAHNzgsDUT2mAOal6Fni/AtIEgFPyOkMhe3fvLTtsuaTI1gd6r7ZBj00FpgKq6UAsmdNWEoWnQ1MgtCmmAa91XkMtRu3JYV7QHwxht5yt1TXHF2ZFMKajIVNM17oKSEFCKZAJTpw4FdewUlORkFPLUdhz396c2ds8ZFySyT16r2RYw730my1CUEsjMQSwWUm1EO4V0hWW6yjSGQZiMYfnTTf3N44YMgV7PbvBcb4fj+8moLmKkgvam+hmumWSc1MXkzc+9MbBrZI08TgYOn9Zbli+I70kk4sUiDOsCL1AEvRpkwSyKXHNRAutWvZnbf/OacSu52QQd/qvt2QqJOYn7a2tvPLKxxcPdsr8By5qy52zhMN4AAAAASUVORK5CYII=";const O={class:"make_choise"},V={class:"cont"},J={class:"data"},P=(0,o._)("svg",{class:"icon"},[(0,o._)("use",{"xlink:href":"/sprite.svg#ic_lock"})],-1),W={class:"title"},Z={class:"btns"},q=["onClick"],j=(0,o._)("img",{src:B,alt:""},null,-1),X=(0,o._)("img",{src:G,alt:""},null,-1);var $={__name:"MakeChoice",setup(e){const t=(0,r.s)();function s(){t.showMakeChoice=!1}return(e,t)=>{const n=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("section",O,[(0,o._)("div",V,[(0,o._)("div",J,[P,(0,o._)("div",W,(0,i.zw)(e.$t("message.choice_title")),1),(0,o._)("div",Z,[(0,o._)("button",{class:"btn blue",onClick:(0,k.iM)(s,["prevent"])},[(0,o._)("span",null,(0,i.zw)(e.$t("message.no_btn")),1),j],8,q),(0,o.Wm)(n,{to:"/create_passport",class:"btn red"},{default:(0,o.w5)((()=>[(0,o._)("span",null,(0,i.zw)(e.$t("message.yes_btn")),1),X])),_:1})])])])])}}};const L=$;var ee=L;const te={class:"dashboard"},se={class:"cont"},oe={class:"row"},ne={class:"row"},re={class:"row"};var ae={__name:"Dashboard",setup(e){const t=(0,r.s)();return(0,o.wF)((()=>{(0,a.KJ)()})),(e,s)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("section",te,[(0,o._)("div",se,[(0,o._)("div",oe,[(0,o.Wm)(E,{network:"evmos"}),(0,o.Wm)(E,{network:"juno"}),(0,o.Wm)(E,{network:"cosmoshub"}),(0,o.Wm)(E,{network:"bostrom"})]),(0,o._)("div",ne,[(0,o.Wm)(E,{network:"emoney"}),(0,o.Wm)(E,{network:"desmos"}),(0,o.Wm)(I),(0,o.Wm)(E,{network:"osmosis"}),(0,o.Wm)(E,{network:"crescent"})]),(0,o._)("div",re,[(0,o.Wm)(E,{network:"gravity"}),(0,o.Wm)(E,{network:"stargaze"}),(0,o.Wm)(E,{network:"omniflix"}),(0,o.Wm)(E,{network:"stride"})])])]),(0,n.SU)(t).showMakeChoice?((0,o.wg)(),(0,o.j4)(ee,{key:0})):(0,o.kq)("",!0)],64))}};const ie=ae;var ke=ie}}]);
//# sourceMappingURL=540.c2cce37c.js.map