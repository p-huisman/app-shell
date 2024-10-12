var Gt=Object.freeze({__proto__:null,get start(){return Ie},get ensureJQuerySupport(){return gt},get setBootstrapMaxTime(){return Xt},get setMountMaxTime(){return Kt},get setUnmountMaxTime(){return Vt},get setUnloadMaxTime(){return Qt},get registerApplication(){return Ce},get unregisterApplication(){return wt},get getMountedApps(){return ue},get getAppStatus(){return yt},get unloadApplication(){return Et},get checkActivityFunctions(){return le},get getAppNames(){return ce},get pathToActiveWhen(){return pe},get navigateToUrl(){return se},get patchHistoryApi(){return mt},get triggerAppChange(){return bt},get addErrorHandler(){return Ne},get removeErrorHandler(){return Me},get mountRootParcel(){return ie},get NOT_LOADED(){return x},get LOADING_SOURCE_CODE(){return re},get NOT_BOOTSTRAPPED(){return k},get BOOTSTRAPPING(){return at},get NOT_MOUNTED(){return D},get MOUNTING(){return it},get UPDATING(){return st},get LOAD_ERROR(){return G},get MOUNTED(){return C},get UNLOADING(){return Ee},get UNMOUNTING(){return ut},get SKIP_BECAUSE_BROKEN(){return N}}),He=(typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{}).CustomEvent,we=function(){try{var e=new He("cat",{detail:{foo:"bar"}});return e.type==="cat"&&e.detail.foo==="bar"}catch{}return!1}()?He:typeof document<"u"&&typeof document.createEvent=="function"?function(e,t){var n=document.createEvent("CustomEvent");return t?n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail):n.initCustomEvent(e,!1,!1,void 0),n}:function(e,t){var n=document.createEventObject();return n.type=e,t?(n.bubbles=!!t.bubbles,n.cancelable=!!t.cancelable,n.detail=t.detail):(n.bubbles=!1,n.cancelable=!1,n.detail=void 0),n},X=[];function U(e,t,n){let r=B(e,t,n);X.length?X.forEach(o=>o(r)):setTimeout(()=>{throw r})}function Ne(e){if(typeof e!="function")throw Error(g(28,!1));X.push(e)}function Me(e){if(typeof e!="function")throw Error(g(29,!1));let t=!1;return X=X.filter(n=>{let r=n===e;return t=t||r,!r}),t}function g(e,t,...n){return`single-spa minified message #${e}: ${t?t+" ":""}See https://single-spa.js.org/error/?code=${e}${n.length?`&arg=${n.join("&arg=")}`:""}`}function B(e,t,n){let r=`${oe(t)} '${P(t)}' died in status ${t.status}: `,o;if(e instanceof Error){try{e.message=r+e.message}catch{}o=e}else{console.warn(g(30,!1,t.status,P(t)));try{o=Error(r+JSON.stringify(e))}catch{o=e}}return o.appOrParcelName=P(t),t.status=n,o}var x="NOT_LOADED",re="LOADING_SOURCE_CODE",k="NOT_BOOTSTRAPPED",at="BOOTSTRAPPING",D="NOT_MOUNTED",it="MOUNTING",C="MOUNTED",st="UPDATING",ut="UNMOUNTING",Ee="UNLOADING",G="LOAD_ERROR",N="SKIP_BECAUSE_BROKEN";function Ht(e){return e.status===C}function be(e){try{return e.activeWhen(window.location)}catch(t){return U(t,e,N),!1}}function P(e){return e.name}function ct(e){return!!e.unmountThisParcel}function oe(e){return ct(e)?"parcel":"application"}function K(){for(let e=arguments.length-1;e>0;e--)for(let t in arguments[e])t!=="__proto__"&&(arguments[e-1][t]=arguments[e][t]);return arguments[0]}function V(e,t){for(let n=0;n<e.length;n++)if(t(e[n]))return e[n];return null}function W(e){return e&&(typeof e=="function"||(t=e,Array.isArray(t)&&!V(t,n=>typeof n!="function")));var t}function j(e,t){let n=e[t]||[];n=Array.isArray(n)?n:[n],n.length===0&&(n=[()=>Promise.resolve()]);let r=oe(e),o=P(e);return function(a){return n.reduce((c,i,v)=>c.then(()=>{let s=i(a);return lt(s)?s:Promise.reject(g(15,!1,r,o,t,v))}),Promise.resolve())}}function lt(e){return e&&typeof e.then=="function"&&typeof e.catch=="function"}var qt=[];function Le(e,t){return Promise.resolve().then(()=>e.status!==k?e:(e.status=at,e.bootstrap?Q(e,"bootstrap").then(n).catch(r=>{if(t)throw B(r,e,N);return U(r,e,N),e}):Promise.resolve().then(n)));function n(){return e.status=D,e}}function ae(e,t){return Promise.resolve().then(()=>{if(e.status!==C)return e;e.status=ut;let n=Object.keys(e.parcels).map(o=>e.parcels[o].unmountThisParcel());return Promise.all(n).then(r,o=>r().then(()=>{let a=Error(o.message);if(t)throw B(a,e,N);U(a,e,N)})).then(()=>e);function r(){return Q(e,"unmount").then(()=>{e.status=D},o=>{if(t)throw B(o,e,N);U(o,e,N)})}})}var qe=!1,Fe=!1;function Ae(e,t){return Promise.resolve().then(()=>e.status!==D?e:(qe||(window.dispatchEvent(new we("single-spa:before-first-mount")),qe=!0),e.status=it,Q(e,"mount").then(()=>(e.status=C,Fe||(window.dispatchEvent(new we("single-spa:first-mount")),Fe=!0),e)).catch(n=>{return e.status=C,ae(e,!0).then(r,r);function r(){if(t)throw B(n,e,N);return U(n,e,N),e}})))}var Ft=0,Jt={parcels:{}};function ie(){return pt.apply(Jt,arguments)}function pt(e,t){let n=this;if(!e||typeof e!="object"&&typeof e!="function")throw Error(g(2,!1));if(e.name&&typeof e.name!="string")throw Error(g(3,!1,typeof e.name));let r=Ft++,o=e.name||`parcel-${r}`;if(typeof t!="object")throw Error(g(4,!1,o,typeof t));if(!t.domElement)throw Error(g(5,!1,o));let a=typeof e=="function",c=a?e:()=>Promise.resolve(e),i={id:r,parcels:{},status:a?re:k,customProps:t,parentName:P(n),unmountThisParcel:()=>u.then(()=>{if(i.status!==C)throw Error(g(6,!1,o,i.status));return ae(i,!0)}).then(p=>(i.parentName&&delete n.parcels[i.id],p)).then(p=>(y(p),p)).catch(p=>{throw i.status=N,d(p),p})},v;n.parcels[r]=i;let s=c();if(!s||typeof s.then!="function")throw Error(g(7,!1));s=s.then(p=>{if(!p)throw Error(g(8,!1));if(o=p.name||`parcel-${r}`,Object.prototype.hasOwnProperty.call(p,"bootstrap")&&!W(p.bootstrap))throw Error(g(9,!1,o));if(!W(p.mount))throw Error(g(10,!1,o));if(!W(p.unmount))throw Error(g(11,!1,o));if(p.update&&!W(p.update))throw Error(g(12,!1,o));let f=j(p,"bootstrap"),m=j(p,"mount"),b=j(p,"unmount");i.status=k,i.name=o,i.bootstrap=f,i.mount=m,i.unmount=b,i.timeouts=ht(p.timeouts),p.update&&(i.update=j(p,"update"),v.update=function(A){return i.customProps=A,R((w=i,Promise.resolve().then(()=>{if(w.status!==C)throw Error(g(32,!1,P(w)));return w.status=st,Q(w,"update").then(()=>(w.status=C,w)).catch(E=>{throw B(E,w,N)})})));var w})});let l=s.then(()=>Le(i,!0)),u=l.then(()=>Ae(i,!0)),y,d,O=new Promise((p,f)=>{y=p,d=f});return v={mount:()=>R(Promise.resolve().then(()=>{if(i.status!==D)throw Error(g(13,!1,o,i.status));return n.parcels[r]=i,Ae(i)})),unmount:()=>R(i.unmountThisParcel()),getStatus:()=>i.status,loadPromise:R(s),bootstrapPromise:R(l),mountPromise:R(u),unmountPromise:R(O)},v}function R(e){return e.then(()=>null)}function ft(e){let t=P(e),n=typeof e.customProps=="function"?e.customProps(t,window.location):e.customProps;(typeof n!="object"||n===null||Array.isArray(n))&&(n={},console.warn(g(40,!1),t,n));let r=K({},n,{name:t,mountParcel:pt.bind(e),singleSpa:Gt});return ct(e)&&(r.unmountSelf=e.unmountThisParcel),r}var H={bootstrap:{millis:4e3,dieOnTimeout:!1,warningMillis:1e3},mount:{millis:3e3,dieOnTimeout:!1,warningMillis:1e3},unmount:{millis:3e3,dieOnTimeout:!1,warningMillis:1e3},unload:{millis:3e3,dieOnTimeout:!1,warningMillis:1e3},update:{millis:3e3,dieOnTimeout:!1,warningMillis:1e3}};function Xt(e,t,n){if(typeof e!="number"||e<=0)throw Error(g(16,!1));H.bootstrap={millis:e,dieOnTimeout:t,warningMillis:n||1e3}}function Kt(e,t,n){if(typeof e!="number"||e<=0)throw Error(g(17,!1));H.mount={millis:e,dieOnTimeout:t,warningMillis:n||1e3}}function Vt(e,t,n){if(typeof e!="number"||e<=0)throw Error(g(18,!1));H.unmount={millis:e,dieOnTimeout:t,warningMillis:n||1e3}}function Qt(e,t,n){if(typeof e!="number"||e<=0)throw Error(g(19,!1));H.unload={millis:e,dieOnTimeout:t,warningMillis:n||1e3}}function Q(e,t){let n=e.timeouts[t],r=n.warningMillis,o=oe(e);return new Promise((a,c)=>{let i=!1,v=!1;e[t](ft(e)).then(u=>{i=!0,a(u)}).catch(u=>{i=!0,c(u)}),setTimeout(()=>l(1),r),setTimeout(()=>l(!0),n.millis);let s=g(31,!1,t,o,P(e),n.millis);function l(u){if(!i){if(u===!0)v=!0,n.dieOnTimeout?c(Error(s)):console.error(s);else if(!v){let y=u,d=y*r;console.warn(s),d+r<n.millis&&setTimeout(()=>l(y+1),r)}}}})}function ht(e){let t={};for(let n in H)t[n]=K({},H[n],e&&e[n]||{});return t}function Oe(e){return Promise.resolve().then(()=>{if(e.loadPromise)return e.loadPromise;if(e.status!==x&&e.status!==G)return e;let t,n;return e.status=re,e.loadPromise=Promise.resolve().then(()=>{let r=e.loadApp(ft(e));if(!lt(r))throw n=!0,Error(g(33,!1,P(e)));return r.then(o=>{let a;e.loadErrorTime=null,t=o,typeof t!="object"&&(a=34),Object.prototype.hasOwnProperty.call(t,"bootstrap")&&!W(t.bootstrap)&&(a=35),W(t.mount)||(a=36),W(t.unmount)||(a=37);let c=oe(t);if(a){let i;try{i=JSON.stringify(t)}catch{}return console.error(g(a,!1,c,P(e),i),t),U(void 0,e,N),e}return t.devtools&&t.devtools.overlays&&(e.devtools.overlays=K({},e.devtools.overlays,t.devtools.overlays)),e.status=k,e.bootstrap=j(t,"bootstrap"),e.mount=j(t,"mount"),e.unmount=j(t,"unmount"),e.unload=j(t,"unload"),e.timeouts=ht(t.timeouts),delete e.loadPromise,e})}).catch(r=>{let o;return delete e.loadPromise,n?o=N:(o=G,e.loadErrorTime=new Date().getTime()),U(r,e,o),e})})}var F=typeof window<"u",J={hashchange:[],popstate:[]},ne=["hashchange","popstate"];function se(e){let t;if(typeof e=="string")t=e;else if(this&&this.href)t=this.href;else{if(!(e&&e.currentTarget&&e.currentTarget.href&&e.preventDefault))throw Error(g(14,!1));t=e.currentTarget.href,e.preventDefault()}let n=Qe(window.location.href),r=Qe(t);t.indexOf("#")===0?window.location.hash=r.hash:n.host!==r.host&&r.host?window.location.href=t:r.pathname===n.pathname&&r.search===n.search?window.location.hash=r.hash:window.history.pushState(null,null,t)}function Je(e){if(e){let t=e[0].type;ne.indexOf(t)>=0&&J[t].forEach(n=>{try{n.apply(this,e)}catch(r){setTimeout(()=>{throw r})}})}}var dt;function Xe(){_([],arguments)}function Ke(e,t){return function(){let n=window.location.href,r=e.apply(this,arguments),o=window.location.href;return dt&&n===o||window.dispatchEvent(Yt(window.history.state,t)),r}}function Yt(e,t){let n;try{n=new PopStateEvent("popstate",{state:e})}catch{n=document.createEvent("PopStateEvent"),n.initPopStateEvent("popstate",!1,!1,e)}return n.singleSpa=!0,n.singleSpaTrigger=t,n}var Pe=null,Ve=!1;function mt(e){if(Ve)throw Error(g(43,!1));dt=!e||!e.hasOwnProperty("urlRerouteOnly")||e.urlRerouteOnly,Ve=!0,Pe=window.history.replaceState,window.addEventListener("hashchange",Xe),window.addEventListener("popstate",Xe);let t=window.addEventListener,n=window.removeEventListener;window.addEventListener=function(r,o){if(!(typeof o=="function"&&ne.indexOf(r)>=0)||V(J[r],a=>a===o))return t.apply(this,arguments);J[r].push(o)},window.removeEventListener=function(r,o){return typeof o=="function"&&ne.indexOf(r)>=0&&(J[r]=J[r].filter(a=>a!==o)),n.apply(this,arguments)},window.history.pushState=Ke(window.history.pushState,"pushState"),window.history.replaceState=Ke(Pe,"replaceState")}function Qe(e){let t=document.createElement("a");return t.href=e,t}F&&(window.singleSpaNavigate?console.warn(g(41,!1)):window.singleSpaNavigate=se);var Ye=!1;function gt(e=window.jQuery){if(e||window.$&&window.$.fn&&window.$.fn.jquery&&(e=window.$),e&&!Ye){let t=e.fn.on,n=e.fn.off;e.fn.on=function(r,o){return ze.call(this,t,window.addEventListener,r,o,arguments)},e.fn.off=function(r,o){return ze.call(this,n,window.removeEventListener,r,o,arguments)},Ye=!0}}function ze(e,t,n,r,o){return typeof n!="string"?e.apply(this,o):(n.split(/\s+/).forEach(a=>{ne.indexOf(a)>=0&&(t(a,r),n=n.replace(a,""))}),n.trim()===""?this:e.apply(this,o))}var q={};function Se(e){return Promise.resolve().then(()=>{let t=q[P(e)];if(!t)return e;if(e.status===x)return Ze(e,t),e;if(e.status===Ee)return t.promise.then(()=>e);if(e.status!==D&&e.status!==G)return e;let n=e.status===G?Promise.resolve():Q(e,"unload");return e.status=Ee,n.then(()=>(Ze(e,t),e)).catch(r=>(function(o,a,c){delete q[P(o)],delete o.bootstrap,delete o.mount,delete o.unmount,delete o.unload,U(c,o,N),a.reject(c)}(e,t,r),e))})}function Ze(e,t){delete q[P(e)],delete e.bootstrap,delete e.mount,delete e.unmount,delete e.unload,e.status=x,t.resolve()}function et(e,t,n,r){q[P(e)]={app:e,resolve:n,reject:r},Object.defineProperty(q[P(e)],"promise",{get:t})}function vt(e){return q[e]}var I=[];function ue(){return I.filter(Ht).map(P)}function ce(){return I.map(P)}function yt(e){let t=V(I,n=>P(n)===e);return t?t.status:null}var tt=!1;function Ce(e,t,n,r){let o=function(a,c,i,v){let s={name:null,loadApp:null,activeWhen:null,customProps:null};return typeof a=="object"?(function(u){if(Array.isArray(u)||u===null)throw Error(g(39,!1));let y=["name","app","activeWhen","customProps"],d=Object.keys(u).reduce((p,f)=>y.indexOf(f)>=0?p:p.concat(f),[]);if(d.length!==0)throw Error(g(38,!1,y.join(", "),d.join(", ")));if(typeof u.name!="string"||u.name.length===0||typeof u.app!="object"&&typeof u.app!="function")throw Error(g(20,!1));let O=p=>typeof p=="string"||typeof p=="function";if(!(O(u.activeWhen)||Array.isArray(u.activeWhen)&&u.activeWhen.every(O)))throw Error(g(24,!1));if(!rt(u.customProps))throw Error(g(22,!1))}(a),s.name=a.name,s.loadApp=a.app,s.activeWhen=a.activeWhen,s.customProps=a.customProps):(function(u,y,d,O){if(typeof u!="string"||u.length===0)throw Error(g(20,!1));if(!y)throw Error(g(23,!1));if(typeof d!="function")throw Error(g(24,!1));if(!rt(O))throw Error(g(22,!1))}(a,c,i,v),s.name=a,s.loadApp=c,s.activeWhen=i,s.customProps=v),s.loadApp=typeof(l=s.loadApp)!="function"?()=>Promise.resolve(l):l,s.customProps=function(u){return u||{}}(s.customProps),s.activeWhen=function(u){let y=Array.isArray(u)?u:[u];return y=y.map(d=>typeof d=="function"?d:pe(d)),d=>y.some(O=>O(d))}(s.activeWhen),s;var l}(e,t,n,r);if(Te()||tt||(tt=!0,setTimeout(()=>{Te()||console.warn(g(1,!1))},5e3)),ce().indexOf(o.name)!==-1)throw Error(g(21,!1,o.name));I.push(K({loadErrorTime:null,status:x,parcels:{},devtools:{overlays:{options:{},selectors:[]}}},o)),F&&(gt(),_())}function le(e=window.location){return I.filter(t=>t.activeWhen(e)).map(P)}function wt(e){if(I.filter(t=>P(t)===e).length===0)throw Error(g(25,!1,e));return(F?Et(e,{waitForUnmount:!1}):Promise.resolve()).then(()=>{let t=I.map(P).indexOf(e);I.splice(t,1)})}function Et(e,t={waitForUnmount:!1}){if(typeof e!="string")throw Error(g(26,!1));let n=V(I,o=>P(o)===e);if(!n)throw Error(g(27,!1,e));let r=vt(P(n));if(t&&t.waitForUnmount){if(r)return r.promise;{let o=new Promise((a,c)=>{et(n,()=>o,a,c)});return o}}{let o;return r?(o=r.promise,nt(n,r.resolve,r.reject)):o=new Promise((a,c)=>{et(n,()=>o,a,c),nt(n,a,c)}),o}}function nt(e,t,n){Promise.resolve().then(()=>{if(V(le(),r=>r===P(e)))return bt()}).then(()=>ae(e).then(Se).then(()=>{t(),setTimeout(()=>{_()})})).catch(n)}function rt(e){return!e||typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)}function pe(e,t){let n=function(r,o){let a=0,c=!1,i="^";r[0]!=="/"&&(r="/"+r);for(let s=0;s<r.length;s++){let l=r[s];(!c&&l===":"||c&&l==="/")&&v(s)}return v(r.length),new RegExp(i,"i");function v(s){let l=r.slice(a,s).replace(/[|\\{}()[\]^$+*?.]/g,"\\$&");if(i+=c?"[^/]+/?":l,s===r.length)if(c)o&&(i+="$");else{let u=o?"":".*";i=i.charAt(i.length-1)==="/"?`${i}${u}$`:`${i}(/${u})?(#.*)?$`}c=!c,a=s}}(e,t);return r=>{let o=r.origin;o||(o=`${r.protocol}//${r.host}`);let a=r.href.replace(o,"").replace(r.search,"").split("?")[0];return n.test(a)}}var ee=!1,te=[],ye=F&&window.location.href;function bt(){return _()}function _(e=[],t,n=!1){if(ee)return new Promise((f,m)=>{te.push({resolve:f,reject:m,eventArguments:t})});let{appsToUnload:r,appsToUnmount:o,appsToLoad:a,appsToMount:c}=function(){let f=[],m=[],b=[],A=[],w=new Date().getTime();return I.forEach(E=>{let h=E.status!==N&&be(E);switch(E.status){case G:h&&w-E.loadErrorTime>=200&&b.push(E);break;case x:case re:h&&b.push(E);break;case k:case D:!h&&vt(P(E))?f.push(E):h&&A.push(E);break;case C:h||m.push(E)}}),{appsToUnload:f,appsToUnmount:m,appsToLoad:b,appsToMount:A}}(),i,v=[],s=ye,l=ye=window.location.href;return Te()?(ee=!0,i=r.concat(a,o,c),Promise.resolve().then(()=>(p(i.length===0?"before-no-app-change":"before-app-change",O(!0)),p("before-routing-event",O(!0,{cancelNavigation:u})),Promise.all(v).then(f=>{if(f.some(h=>h))return Pe.call(window.history,history.state,"",s.substring(location.origin.length)),ye=location.href,ee=!1,_(e,t,!0);let m=r.map(Se),b=o.map(ae).map(h=>h.then(Se)).concat(m),A=Promise.all(b);A.then(()=>{p("before-mount-routing-event",O(!0))},h=>{throw h});let w=a.map(h=>Oe(h).then(S=>ot(S,A))),E=c.filter(h=>a.indexOf(h)<0).map(h=>ot(h,A));return A.catch(h=>{throw d(),h}).then(()=>(d(),Promise.all(w.concat(E)).catch(h=>{throw e.forEach(S=>S.reject(h)),h}).then(y).then(()=>{},h=>{throw h})))})))):(i=a,Promise.resolve().then(()=>{let f=a.map(Oe);return Promise.all(f).then(d).then(()=>[]).catch(m=>{throw d(),m}).finally(()=>{})}));function u(f=!0){let m=typeof f?.then=="function"?f:Promise.resolve(f);v.push(m.catch(b=>(console.warn(Error(g(42,!1))),console.warn(b),!1)))}function y(){let f=ue();e.forEach(m=>m.resolve(f));try{p(i.length===0?"no-app-change":"app-change",O()),p("routing-event",O())}catch(m){setTimeout(()=>{throw m})}if(ee=!1,te.length>0){let m=te;te=[],_(m)}return f}function d(){n||(e.forEach(f=>{Je(f.eventArguments)}),Je(t))}function O(f=!1,m){let b={},A={[C]:[],[D]:[],[x]:[],[N]:[]};f?(a.concat(c).forEach((h,S)=>{E(h,C)}),r.forEach(h=>{E(h,x)}),o.forEach(h=>{E(h,D)})):i.forEach(h=>{E(h)});let w={detail:{newAppStatuses:b,appsByNewStatus:A,totalAppChanges:i.length,originalEvent:t?.[0],oldUrl:s,newUrl:l}};return m&&K(w.detail,m),w;function E(h,S){let T=P(h);S=S||yt(T),b[T]=S,(A[S]=A[S]||[]).push(T)}}function p(f,m){n||window.dispatchEvent(new we(`single-spa:${f}`,m))}}function ot(e,t){return be(e)?Le(e).then(n=>t.then(()=>be(n)?Ae(n):n)):t.then(()=>e)}var At=!1;function Ie(e){At=!0,F&&(mt(e),_())}function Te(){return At}var zt={getRawAppData:function(){return[...I]},reroute:_,NOT_LOADED:x,toLoadPromise:Oe,toBootstrapPromise:Le,unregisterApplication:wt,getProfilerData:function(){return qt}};F&&window.__SINGLE_SPA_DEVTOOLS__&&(window.__SINGLE_SPA_DEVTOOLS__.exposedMethods=zt);function Ot(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function Pt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ot(Object(n),!0).forEach(function(r){Zt(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ot(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function $(e){return($=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function Zt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function he(e){return function(t){if(Array.isArray(t))return je(t)}(e)||function(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}(e)||Dt(e)||function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function Dt(e,t){if(e){if(typeof e=="string")return je(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?je(e,t):void 0}}function je(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var L=typeof window<"u";function fe(e,t){if($(t)!=="object"||Array.isArray(t)||t===null)throw Error("Invalid ".concat(e,": received ").concat(Array.isArray(t)?"array":t," but expected a plain object"))}function St(e,t){if(typeof t!="boolean")throw Error("Invalid ".concat(e,": received ").concat($(t),", but expected a boolean"))}function xe(e,t,n,r){if(!r){var o=Object.keys(t),a=[];o.forEach(function(c){n.indexOf(c)<0&&a.push(c)}),a.length>0&&console.warn(Error("Invalid ".concat(e,": received invalid properties '").concat(a.join(", "),"', but valid properties are ").concat(n.join(", "))))}}function Y(e,t){var n=!(arguments.length>2&&arguments[2]!==void 0)||arguments[2];if(typeof t!="string"||n&&t.trim()==="")throw Error("Invalid ".concat(e,": received '").concat(t,"', but expected a").concat(n?" non-blank":""," string"))}function Tt(e,t){if(Y(e,t),t.indexOf("/")<0)throw Error("Invalid ".concat(e,": received '").concat(t,"', but expected an absolute path that starts with /"))}function De(e,t,n){if(!Array.isArray(t)&&($($(t))!=="object"||t.length!=="number"))throw Error("Invalid ".concat(e,": received '").concat(t,"', but expected an array"));for(var r=arguments.length,o=new Array(r>3?r-3:0),a=3;a<r;a++)o[a-3]=arguments[a];for(var c=0;c<t.length;c++)n.apply(void 0,[t[c],"".concat(e,"[").concat(c,"]")].concat(o))}function Ue(e,t){var n;return(n=e.substr(-1)==="/"?t[0]==="/"?e+t.slice(1):e+t:t[0]==="/"?e+t:e+"/"+t).substr(-1)==="/"&&n.length>1&&(n=n.slice(0,n.length-1)),n}function _e(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return e[n];return null}var en=typeof Symbol<"u"?Symbol():"@";function jt(e,t){if(e&&e.nodeName||typeof e=="string"){if(L&&!t&&window.singleSpaLayoutData&&(t=window.singleSpaLayoutData),typeof e=="string"){if(!L)throw Error("calling constructRoutes with a string on the server is not yet supported");if(!(e=new DOMParser().parseFromString(e,"text/html").documentElement.querySelector("single-spa-router")))throw Error("constructRoutes should be called with a string HTML document that contains a <single-spa-router> element.")}e=function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(n.nodeName.toLowerCase()==="template"&&(n=(n.content||n).querySelector("single-spa-router")),n.nodeName.toLowerCase()!=="single-spa-router")throw Error("single-spa-layout: The HTMLElement passed to constructRoutes must be <single-spa-router> or a <template> containing the router. Received ".concat(n.nodeName));L&&n.isConnected&&n.parentNode.removeChild(n);var o={routes:[],redirects:{}};M(n,"mode")&&(o.mode=M(n,"mode")),M(n,"base")&&(o.base=M(n,"base")),M(n,"containerEl")&&(o.containerEl=M(n,"containerEl"));for(var a=0;a<n.childNodes.length;a++){var c;(c=o.routes).push.apply(c,he(de(n.childNodes[a],r,o)))}return o}(e,t)}else if(t)throw Error("constructRoutes should be called either with an HTMLElement and layoutData, or a single json object.");return function(n){fe("routesConfig",n);var r,o=n.disableWarnings;if(xe("routesConfig",n,["mode","base","containerEl","routes","disableWarnings","redirects"],o),n.hasOwnProperty("containerEl")?function(s,l){if(typeof l=="string"?l.trim()==="":!(L&&l instanceof HTMLElement))throw Error("Invalid ".concat("routesConfig.containerEl",": received ").concat(l," but expected either non-blank string or HTMLElement"))}(0,n.containerEl):n.containerEl="body",n.hasOwnProperty("mode")||(n.mode="history"),function(s,l,u){if(u.indexOf(l)<0)throw Error("Invalid ".concat("routesConfig.mode",": received '").concat(l,"' but expected ").concat(u.join(", ")))}(0,n.mode,["history","hash"]),n.hasOwnProperty("base")?(Y("routesConfig.base",n.base),n.base=((r=n.base).indexOf("/")!==0&&(r="/"+r),r[r.length-1]!=="/"&&(r+="/"),r)):n.base="/",n.hasOwnProperty("redirects"))for(var a in fe("routesConfig.redirects",n.redirects),n.redirects){var c=n.redirects[a];Tt("routesConfig.redirects key",a),Tt("routesConfig.redirects['".concat(a,"']"),c)}var i=L?window.location.pathname:"/",v=n.mode==="hash"?i+"#":"";De("routesConfig.routes",n.routes,function s(l,u,y){var d=y.parentPath,O=y.siblingActiveWhens,p=y.parentActiveWhen;if(fe(u,l),l.type==="application")xe(u,l,["type","name","props","loader","error","className"],o),l.props&&fe("".concat(u,".props"),l.props),Y("".concat(u,".name"),l.name);else if(l.type==="route"){xe(u,l,["type","path","routes","props","default","exact"],o),l.hasOwnProperty("exact")&&St("".concat(u,".exact"),l.exact);var f,m=l.hasOwnProperty("path"),b=l.hasOwnProperty("default");if(m)Y("".concat(u,".path"),l.path),f=Ue(d,l.path),l.activeWhen=pe(f,l.exact),O.push(l.activeWhen);else{if(!b)throw Error("Invalid ".concat(u,": routes must have either a path or default property."));St("".concat(u,".default"),l.default),f=d,l.activeWhen=function(w,E){return function(h){return E(h)&&!w.some(function(S){return S(h)})}}(O,p)}if(m&&b&&l.default)throw Error("Invalid ".concat(u,": cannot have both path and set default to true."));l.routes&&De("".concat(u,".routes"),l.routes,s,{parentPath:f,siblingActiveWhens:[],parentActiveWhen:l.activeWhen})}else{if(!(typeof Node<"u"&&l instanceof Node))for(var A in l)A!=="routes"&&A!=="attrs"&&Y("".concat(u,"['").concat(A,"']"),l[A],!1);l.routes&&De("".concat(u,".routes"),l.routes,s,{parentPath:d,siblingActiveWhens:O,parentActiveWhen:p})}},{parentPath:v+n.base,parentActiveWhen:function(){return!0},siblingActiveWhens:[]}),delete n.disableWarnings}(e),e}function M(e,t){if(L)return e.getAttribute(t);var n=_e(e.attrs,function(r){return r.name===t.toLowerCase()});return n?n.value:null}function Nt(e,t){return L?e.hasAttribute(t):e.attrs.some(function(n){return n.name===t})}function de(e,t,n){if(e.nodeName.toLowerCase()==="application"){if(e.childNodes.length>0)throw Error("<application> elements must not have childNodes. You must put in a closing </application> - self closing is not allowed");var r={type:"application",name:M(e,"name")},o=M(e,"loader");if(o){if(t.loaders&&t.loaders.hasOwnProperty(o))r.loader=t.loaders[o];else if(L)throw Error("Application loader '".concat(o,"' was not defined in the htmlLayoutData"))}var a=M(e,"error");if(a){if(t.errors&&t.errors.hasOwnProperty(a))r.error=t.errors[a];else if(L)throw Error("Application error handler '".concat(o,"' was not defined in the htmlLayoutData"))}var c=M(e,"class");return c&&(r.className=c),Mt(e,r,t),[r]}if(e.nodeName.toLowerCase()==="route"){var i={type:"route",routes:[]},v=M(e,"path");v&&(i.path=v),Nt(e,"default")&&(i.default=!0),Nt(e,"exact")&&(i.exact=!0),Mt(e,i,t);for(var s=0;s<e.childNodes.length;s++){var l;(l=i.routes).push.apply(l,he(de(e.childNodes[s],t,n)))}return[i]}if(e.nodeName.toLowerCase()==="redirect")return n.redirects[Ue("/",M(e,"from"))]=Ue("/",M(e,"to")),[];if(typeof Node<"u"&&e instanceof Node){if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()==="")return[];if(e.childNodes&&e.childNodes.length>0){e.routes=[];for(var u=0;u<e.childNodes.length;u++){var y;(y=e.routes).push.apply(y,he(de(e.childNodes[u],t,n)))}}return[e]}if(e.childNodes){for(var d={type:e.nodeName.toLowerCase(),routes:[],attrs:e.attrs},O=0;O<e.childNodes.length;O++){var p;(p=d.routes).push.apply(p,he(de(e.childNodes[O],t,n)))}return[d]}return e.nodeName==="#comment"?[{type:"#comment",value:e.data}]:e.nodeName==="#text"?[{type:"#text",value:e.value}]:void 0}function Mt(e,t,n){for(var r=(M(e,"props")||"").split(","),o=0;o<r.length;o++){var a=r[o].trim();if(a.length!==0)if(t.props||(t.props={}),n.props&&n.props.hasOwnProperty(a))t.props[a]=n.props[a];else{if(L)throw Error("Prop '".concat(a,"' was not defined in the htmlLayoutData. Either remove this attribute from the HTML element or provide the prop's value"));t.props[a]=en}}}function Ut(e){return{bootstrap:function(){return Promise.resolve()},mount:function(t){return Promise.resolve().then(function(){t.domElement.innerHTML=e})},unmount:function(t){return Promise.resolve().then(function(){t.domElement.innerHTML=""})}}}function _t(e){var t=e.routes;e.applications;var n=e.active,r=n===void 0||n,o=!1,a={},c=L&&!!window.singleSpaLayoutData;if(!t)throw Error("single-spa-layout constructLayoutEngine(opts): opts.routes must be provided. Value was ".concat($(t)));var i=t.base.slice(0,t.base.length-1),v={isActive:function(){return o},activate:function(){o||(o=!0,L&&(window.addEventListener("single-spa:before-routing-event",l),window.addEventListener("single-spa:before-mount-routing-event",u),window.addEventListener("single-spa:routing-event",y),Ne(s),c&&d(O(),t.routes),u()))},deactivate:function(){o&&(o=!1,L&&(window.removeEventListener("single-spa:before-routing-event",l),window.removeEventListener("single-spa:before-mount-routing-event",u),window.removeEventListener("single-spa:routing-event",y),Me(s)))}};return r&&v.activate(),v;function s(p){var f=We({applicationName:p.appOrParcelName,location:window.location,routes:t.routes});if(f&&f.error){var m=document.getElementById(z(f.name)),b=typeof f.error=="string"?Ut(f.error):f.error;a[f.name]=ie(b,{domElement:m,error:p})}setTimeout(function(){throw p})}function l(p){var f=p.detail,m=f.cancelNavigation,b=f.newUrl,A=Ct(t,Wt(b)),w=function(T){var Z=t.redirects[T];if(T===A){if(!m)throw Error("single-spa-layout: <redirect> requires single-spa@>=6.0.0");return m(),setTimeout(function(){se(Z)}),{v:void 0}}};for(var E in t.redirects){var h=w(E);if($(h)==="object")return h.v}var S=[];It(b).forEach(function(T){a[T]&&(S.push(a[T].unmount()),delete a[T])}),S.length>0&&m(Promise.all(S).then(function(){return!1}))}function u(){if(Ct(t).indexOf(i)===0){var p=ue().reduce(function(f,m){return f[m]=document.getElementById(z(m)),f},{});Re({location:window.location,routes:t.routes,parentContainer:O(),shouldMount:!0,applicationContainers:p})}}function y(p){var f=p.detail,m=f.navigationIsCanceled,b=f.newUrl;m||It(b).forEach(function(A){var w=document.getElementById(z(A));w&&w.isConnected&&w.parentNode.removeChild(w)})}function d(p,f){if(p&&p.childNodes&&f)for(var m={nextSibling:p.childNodes[0]},b=0;b<f.length;b++){var A,w=f[b];if(w.type!=="route"){for(var E=(A=m)===null||A===void 0?void 0:A.nextSibling;((h=E)===null||h===void 0?void 0:h.nodeType)===Node.TEXT_NODE&&E.textContent.trim()==="";){var h;E=E.nextSibling}m=E,tn(w)&&nn(E,w)&&(w.connectedNode=E),w.routes&&d(E,w.routes)}else d(p,w.routes)}}function O(){return typeof t.containerEl=="string"?document.querySelector(t.containerEl):t.containerEl}}function tn(e){return t=["application","route","fragment","assets","redirect"],n=e.type,!t.some(function(r){return r===n});var t,n}function nn(e,t){var n,r;return!!e&&(r=t instanceof Node?t:function(o){switch(o.type){case"#text":return document.createTextNode(o.value);case"#comment":return document.createComment(o.value);default:var a=document.createElement(o.type);return o.attrs.forEach(function(c){a.setAttribute(c.name,c.value)}),a}}(t),(n=e).nodeType===r.nodeType&&n.nodeName===r.nodeName&&function(o,a){var c=o.getAttributeNames?o.getAttributeNames().sort():[],i=o.getAttributeNames?o.getAttributeNames().sort():[];return c.length===i.length&&!c.some(function(v){return o.getAttribute(v)!==a.getAttribute(v)})}(n,r))}function Re(e){var t=e.location,n=e.routes,r=e.parentContainer,o=e.previousSibling,a=e.shouldMount,c=e.applicationContainers;return n.forEach(function(i,v){if(i.type==="application"){if(a){var s,l=z(i.name);c[i.name]?s=c[i.name]:document.getElementById(l)?s=document.getElementById(l):(s=document.createElement("div")).id=l,typeof i.className=="string"?s.className=i.className:typeof i.className!="string"&&typeof s.className=="string"&&s.removeAttribute("class"),Lt(s,r,o),o=s}}else if(i.type==="route")o=Re({location:t,routes:i.routes,parentContainer:r,previousSibling:o,shouldMount:a&&i.activeWhen(t),applicationContainers:c});else if(i instanceof Node||typeof i.type=="string")if(a){if(!i.connectedNode){var u=i instanceof Node?i.cloneNode(!1):Rt(i);i.connectedNode=u}Lt(i.connectedNode,r,o),i.routes&&Re({location:t,routes:i.routes,parentContainer:i.connectedNode,previousSibling:null,shouldMount:a,applicationContainers:c}),o=i.connectedNode}else(y=i.connectedNode)&&(y.remove?y.remove():y.parentNode.removeChild(y)),delete i.connectedNode;var y}),o}function We(e){for(var t=e.applicationName,n=e.location,r=e.routes,o=0;o<r.length;o++){var a=r[o];if(a.type==="application"){if(a.name===t)return a}else if(a.type==="route"){if(a.activeWhen(n)){var c=We({applicationName:t,location:n,routes:a.routes});if(c)return c}}else if(a.routes){var i=We({applicationName:t,location:n,routes:a.routes});if(i)return i}}}function Lt(e,t,n){var r=n?n.nextSibling:t.firstChild;r!==e&&t.insertBefore(e,r)}function z(e){return"single-spa-application:".concat(e)}function Rt(e){if(e.type.toLowerCase()==="#text")return document.createTextNode(e.value);if(e.type.toLowerCase()==="#comment")return document.createComment(e.value);var t=document.createElement(e.type);return(e.attrs||[]).forEach(function(n){t.setAttribute(n.name,n.value)}),t.routes&&t.routes.forEach(function(n){t.appendChild(Rt(n))}),t}function Ct(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:location;return t[e.mode==="hash"?"hash":"pathname"]}function Wt(e){try{return new URL(e)}catch{var t=document.createElement("a");return t.href=e,t}}function It(e){var t=[],n=le(e?Wt(e):location);return ce().forEach(function(r){n.indexOf(r)<0&&t.push(r)}),t}function $t(e){var t=e.routes,n=e.loadApp,r={};return $e(r,rn,{},t.routes),Object.keys(r).map(function(o){var a=r[o];return{name:o,customProps:function(c,i){var v=_e(a,function(s){return s.activeWhen(i)});return v?v.props:{}},activeWhen:a.map(function(c){return c.activeWhen}),app:function(){var c;L&&(c=_e(a,function(v){return v.activeWhen(window.location)}));var i=n({name:o});return c&&c.loader?function(v,s,l){return Promise.resolve().then(function(){var u,y=z(v),d=document.getElementById(y);d||((d=document.createElement("div")).id=y,d.style.display="none",document.body.appendChild(d),u=function(){d.style.removeProperty("display"),d.getAttribute("style")===""&&d.removeAttribute("style"),window.removeEventListener("single-spa:before-mount-routing-event",u)},window.addEventListener("single-spa:before-mount-routing-event",u));var O=typeof s.loader=="string"?Ut(s.loader):s.loader,p=ie(O,{name:"application-loader:".concat(v),domElement:d});function f(){return p.unmount().then(function(){u&&u()})}return Promise.all([p.mountPromise,l]).then(function(m){var b,A,w=(A=2,function(h){if(Array.isArray(h))return h}(b=m)||function(h,S){var T=h==null?null:typeof Symbol<"u"&&h[Symbol.iterator]||h["@@iterator"];if(T!=null){var Z,ke,ge=[],ve=!0,Ge=!1;try{for(T=T.call(h);!(ve=(Z=T.next()).done)&&(ge.push(Z.value),!S||ge.length!==S);ve=!0);}catch(kt){Ge=!0,ke=kt}finally{try{ve||T.return==null||T.return()}finally{if(Ge)throw ke}}return ge}}(b,A)||Dt(b,A)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());w[0];var E=w[1];return f().then(function(){return E})},function(m){return f().then(function(){throw m})})})}(o,c,i):i}}})}function $e(e,t,n,r){r.forEach(function(o){o.type==="application"?(e[o.name]||(e[o.name]=[]),e[o.name].push({activeWhen:t,props:xt(n,o.props),loader:o.loader})):o.type==="route"?$e(e,o.activeWhen,xt(n,o.props),o.routes):o.routes&&$e(e,t,n,o.routes)})}function xt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Pt(Pt({},e),t)}function rn(){return!0}var Be,me=class e{constructor(t){this.configUrl=t;this._menu=[];this.theme="light";this.messages=[];this.configLoaded=!1;this.loadConfig()}dispatchStateChangeEvent(){window.dispatchEvent(new CustomEvent("appShellStateChange",{detail:this}))}static getInstance(t){return Be||(Be=new e(t)),Be}setTheme(t){this.theme=t,this.dispatchStateChangeEvent()}getAppModule(t){return this.apps.find(n=>n.name===t),new URL(this.data.imports[t],document.querySelector("base").href)}get currentTheme(){return this.theme==="dark"?this.darkTheme:this.lightTheme}async loadConfig(){let t=await fetch(this.configUrl);if(this.data=await t.json().catch(n=>n),this.data instanceof Error||!t.ok)return this.messages.push(this.data.message),Promise.reject(this.data);this.data.apps.forEach(n=>{this._menu.push({app:n})}),this.configLoaded=!0,this.dispatchStateChangeEvent()}get appShellModule(){return this.data.appShell}get apps(){return this.data.apps}addMenuItem(t,n,r,o){let a=this._menu.find(i=>i.app.name===t),c=this.apps.find(i=>i.name===t);a&&(a.menu={name:t,title:n,href:c.href,subItems:r,icon:o},this.dispatchStateChangeEvent()),console.log(this.menu,this.apps)}get menu(){let t=[];return this._menu.forEach(n=>{t.push(n.menu)}),t}get importMap(){return JSON.stringify({imports:this.data.imports})}addMessage(t,n){let r=Math.random().toString(36).substring(7);return this.messages.push({id:r,body:t,intent:n}),this.dispatchStateChangeEvent(),r}removeMessage(t){this.messages=this.messages.filter(n=>n.id!==t),this.dispatchStateChangeEvent()}};function Bt(e){let t=document.createElement("script");return t.type=e,t}function on(e){let t=Bt("importmap");t.textContent=e.importMap,document.head.appendChild(t)}function an(e){let t=Bt("module");t.src=e.appShellModule,document.head.appendChild(t)}function sn(e){let t=document.querySelector("base").href||"/",r=new URL(t).pathname,o=`
    <route default><application name="@app-shell-app/index"></application></route>
    <route path="${r}oauth"><application name="@app-shell-app/oauth"></application></route>
    <route path="${r}msal"><application name="@app-shell-app/msal"></application></route>`;e.apps.forEach(s=>{o+=`<route path="${r}${s.href}"><application name="${s.name}"></application></route>`});let a=`<single-spa-router containerEl="#AppArea">${o}</single-spa-router>`,c=jt(a),i=$t({routes:c,loadApp({name:s}){return import(s).catch(u=>{e.addMessage(u.message,"error")})}}),v=_t({routes:c,applications:i});i.forEach(s=>{s.name==="@app-shell-app/index"&&(s.customProps={appShellState:e});let l=e.apps.find(u=>u.name===s.name);if(l)if(l.initOnStart){let u=e.getAppModule(s.name);if(u){let y=u.pathname.substring(0,u.pathname.lastIndexOf("/")+1)+"init.js";u.pathname=y,import(u.href).then(d=>{d.init(s,e)}).catch(d=>{e.addMessage(d.message,"error")})}}else e.addMenuItem(s.name,l.title,l.subItems,l.icon);s.customProps={appShellState:e}}),i.forEach(Ce),v.activate(),Ie()}async function un(){if(document.body.style.margin="0",document.body.style.padding="0",sessionStorage.getItem("redirect")){let n=sessionStorage.getItem("redirect");sessionStorage.removeItem("redirect"),history.replaceState(null,"",n)}let e=!1;window.addEventListener("appShellStateChange",()=>{!e&&t.configLoaded&&(e=!0,on(t),an(t))});let t=me.getInstance("./app-shell.json");window.addEventListener("appShellReady",()=>{window.dispatchEvent(new CustomEvent("initApps",{detail:t})),requestAnimationFrame(()=>{sn(t)})},{once:!0})}un();
