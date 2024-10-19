var de=Object.defineProperty;var le=(e,t,r)=>t in e?de(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var he=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(t,r)=>(typeof require!="undefined"?require:t)[r]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var w=(e,t,r)=>le(e,typeof t!="symbol"?t+"":t,r);var h=(e,t,r)=>new Promise((n,a)=>{var o=c=>{try{i(r.next(c))}catch(l){a(l)}},s=c=>{try{i(r.throw(c))}catch(l){a(l)}},i=c=>c.done?n(c.value):Promise.resolve(c.value).then(o,s);i((r=r.apply(e,t)).next())});import D from"react";import rt from"react-dom";function J(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,n)}return r}function R(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?J(Object(r),!0).forEach(function(n){fe(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):J(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function H(e){return(H=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function fe(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function T(e){return(T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function I(e,t){var r;if(typeof(r=t.domElement?function(){return t.domElement}:t.domElementGetter?t.domElementGetter:e.domElementGetter?e.domElementGetter:function(n){var a=n.appName||n.name;if(!a)throw Error("single-spa's dom-element-getter-helpers was not given an application name as a prop, so it can't make a unique dom element container for the react application");var o="single-spa-application:".concat(a);return function(){var s=document.getElementById(o);return s||((s=document.createElement("div")).id=o,document.body.appendChild(s)),s}}(t))!="function")throw Error("single-spa's dom-element-getter-helpers was given an invalid domElementGetter for application or parcel '".concat(t.name,"'. Expected a function, received ").concat(T(r)));return function(){var n=r(t);if(!(n instanceof HTMLElement))throw Error("single-spa's dom-element-getter-helpers: domElementGetter returned an invalid dom element for application or parcel '".concat(t.name,"'. Expected HTMLElement, received ").concat(T(n)));return n}}var b=null;try{b=he("react").createContext()}catch(e){}var me={React:null,ReactDOM:null,ReactDOMClient:null,rootComponent:null,loadRootComponent:null,errorBoundary:null,errorBoundaryClass:null,domElementGetter:null,parcelCanUpdate:!0,suppressComponentDidCatchWarning:!1,domElements:{},renderResults:{},updateResolves:{},unmountResolves:{}};function L(e){if(H(e)!=="object")throw new Error("single-spa-react requires a configuration object");var t,r=R(R({},me),e);if(!r.React)throw new Error("single-spa-react must be passed opts.React");if(!r.ReactDOM&&!r.ReactDOMClient)throw new Error("single-spa-react must be passed opts.ReactDOM or opts.ReactDOMClient");if(r.renderType||((t=r.ReactDOMClient)!==null&&t!==void 0&&t.createRoot?r.renderType="createRoot":r.renderType="render"),!r.rootComponent&&!r.loadRootComponent)throw new Error("single-spa-react must be passed opts.rootComponent or opts.loadRootComponent");if(r.errorBoundary&&typeof r.errorBoundary!="function")throw Error("The errorBoundary opt for single-spa-react must either be omitted or be a function that returns React elements");!b&&r.React.createContext&&(b=r.React.createContext()),r.SingleSpaRoot=function(a){function o(s){o.displayName="SingleSpaRoot(".concat(s.name,")")}return o.prototype=Object.create(a.React.Component.prototype),o.prototype.componentDidMount=function(){setTimeout(this.props.mountFinished)},o.prototype.componentWillUnmount=function(){setTimeout(this.props.unmountFinished)},o.prototype.render=function(){return setTimeout(this.props.updateFinished),this.props.children},o}(r);var n={bootstrap:pe.bind(null,r),mount:ye.bind(null,r),unmount:we.bind(null,r)};return r.parcelCanUpdate&&(n.update=_e.bind(null,r)),n}function pe(e,t){return e.rootComponent?Promise.resolve():e.loadRootComponent(t).then(function(r){e.rootComponent=r})}function ye(e,t){return new Promise(function(r,n){e.suppressComponentDidCatchWarning||!function(i){if(!(i&&typeof i.version=="string"&&i.version.indexOf(".")>=0))return!1;var c=i.version.slice(0,i.version.indexOf("."));try{return Number(c)>=16}catch(l){return!1}}(e.React)||e.errorBoundary||e.errorBoundaryClass||(e.rootComponent.prototype?e.rootComponent.prototype.componentDidCatch||console.warn("single-spa-react: ".concat(t.name||t.appName||t.childAppName,"'s rootComponent should implement componentDidCatch to avoid accidentally unmounting the entire single-spa application.")):console.warn("single-spa-react: ".concat(t.name||t.appName||t.childAppName,"'s rootComponent does not implement an error boundary.  If using a functional component, consider providing an opts.errorBoundary to singleSpaReact(opts).")));var a=W(e,t,function(){r(this)}),o=I(e,t)(),s=function(i){var c=i.reactDom,l=i.renderType,v=i.elementToRender,P=i.domElement,S=c[l];if(typeof S!="function")throw new Error('renderType "'.concat(l,'" did not return a function.'));switch(l){case"createRoot":case"unstable_createRoot":case"createBlockingRoot":case"unstable_createBlockingRoot":var N=S(P);return N.render(v),N;case"hydrateRoot":return S(P,v);case"hydrate":default:return S(v,P),null}}({elementToRender:a,domElement:o,reactDom:A(e),renderType:ge(e)});e.domElements[t.name]=o,e.renderResults[t.name]=s})}function we(e,t){return new Promise(function(r){e.unmountResolves[t.name]=r;var n=e.renderResults[t.name];n&&n.unmount?n.unmount():A(e).unmountComponentAtNode(e.domElements[t.name]),delete e.domElements[t.name],delete e.renderResults[t.name]})}function _e(e,t){return new Promise(function(r){e.updateResolves[t.name]||(e.updateResolves[t.name]=[]),e.updateResolves[t.name].push(r);var n=W(e,t,null),a=e.renderResults[t.name];if(a&&a.render)a.render(n);else{var o=I(e,t)();A(e).render(n,o)}})}function A(e){return e.ReactDOMClient||e.ReactDOM}function ge(e){return typeof e.renderType=="function"?e.renderType():e.renderType}function W(e,t,r){var n=e.React.createElement(e.rootComponent,t),a=b?e.React.createElement(b.Provider,{value:t},n):n;return(e.errorBoundary||t.errorBoundary||e.errorBoundaryClass||t.errorBoundaryClass)&&(e.errorBoundaryClass=e.errorBoundaryClass||t.errorBoundaryClass||function(o,s){function i(c){o.React.Component.apply(this,arguments),this.state={caughtError:null,caughtErrorInfo:null},i.displayName="SingleSpaReactErrorBoundary(".concat(c.name,")")}return i.prototype=Object.create(o.React.Component.prototype),i.prototype.render=function(){return this.state.caughtError?(o.errorBoundary||s.errorBoundary)(this.state.caughtError,this.state.caughtErrorInfo,this.props):this.props.children},i.prototype.componentDidCatch=function(c,l){this.setState({caughtError:c,caughtErrorInfo:l})},i}(e,t),a=e.React.createElement(e.errorBoundaryClass,t,a)),a=e.React.createElement(e.SingleSpaRoot,R(R({},t),{},{mountFinished:r,updateFinished:function(){e.updateResolves[t.name]&&(e.updateResolves[t.name].forEach(function(o){return o()}),delete e.updateResolves[t.name])},unmountFinished:function(){e.unmountResolves[t.name]&&(e.unmountResolves[t.name](),delete e.unmountResolves[t.name])}}),a)}var x,E,M;(typeof navigator=="undefined"||!((M=(E=navigator.userAgent)==null?void 0:E.startsWith)!=null&&M.call(E,"Mozilla/5.0 ")))&&(x="oauth4webapi/v3.0.0");function B(e,t){if(e==null)return!1;try{return e instanceof t||Object.getPrototypeOf(e)[Symbol.toStringTag]===t.prototype[Symbol.toStringTag]}catch(r){return!1}}var m="ERR_INVALID_ARG_VALUE",p="ERR_INVALID_ARG_TYPE";function d(e,t,r){let n=new TypeError(e,{cause:r});return Object.assign(n,{code:t}),n}var q=Symbol(),ft=Symbol(),mt=Symbol(),G=Symbol(),pt=Symbol(),yt=Symbol(),wt=Symbol(),be=new TextEncoder,Se=new TextDecoder;function Re(e){return typeof e=="string"?be.encode(e):Se.decode(e)}var z=32768;function Ee(e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));let t=[];for(let r=0;r<e.byteLength;r+=z)t.push(String.fromCharCode.apply(null,e.subarray(r,r+z)));return btoa(t.join("")).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function ve(e){try{let t=atob(e.replace(/-/g,"+").replace(/_/g,"/").replace(/\s/g,"")),r=new Uint8Array(t.length);for(let n=0;n<t.length;n++)r[n]=t.charCodeAt(n);return r}catch(t){throw d("The input to be decoded is not correctly encoded.",m,t)}}function F(e){return typeof e=="string"?ve(e):Ee(e)}var k=class extends Error{constructor(r,n){var a;super(r,n);w(this,"code");this.name=this.constructor.name,this.code=He,(a=Error.captureStackTrace)==null||a.call(Error,this,this.constructor)}},O=class extends Error{constructor(r,n){var a;super(r,n);w(this,"code");this.name=this.constructor.name,n!=null&&n.code&&(this.code=n==null?void 0:n.code),(a=Error.captureStackTrace)==null||a.call(Error,this,this.constructor)}};function u(e,t,r){return new O(e,{code:t,cause:r})}function Pe(e){return!(e===null||typeof e!="object"||Array.isArray(e))}function V(e){B(e,Headers)&&(e=Object.fromEntries(e.entries()));let t=new Headers(e);if(x&&!t.has("user-agent")&&t.set("user-agent",x),t.has("authorization"))throw d('"options.headers" must not include the "authorization" header name',m);if(t.has("dpop"))throw d('"options.headers" must not include the "dpop" header name',m);return t}function Q(e){if(typeof e=="function"&&(e=e()),!(e instanceof AbortSignal))throw d('"options.signal" must return or be an instance of AbortSignal',p);return e}function Y(e,t){return h(this,null,function*(){if(!(e instanceof URL))throw d('"issuerIdentifier" must be an instance of URL',p);ae(e,(t==null?void 0:t[q])!==!0);let r=new URL(e.href);switch(t==null?void 0:t.algorithm){case void 0:case"oidc":r.pathname=`${r.pathname}/.well-known/openid-configuration`.replace("//","/");break;case"oauth2":r.pathname==="/"?r.pathname=".well-known/oauth-authorization-server":r.pathname=`.well-known/oauth-authorization-server/${r.pathname}`.replace("//","/");break;default:throw d('"options.algorithm" must be "oidc" (default), or "oauth2"',m)}let n=V(t==null?void 0:t.headers);return n.set("accept","application/json"),((t==null?void 0:t[G])||fetch)(r.href,{body:void 0,headers:Object.fromEntries(n.entries()),method:"GET",redirect:"manual",signal:t!=null&&t.signal?Q(t.signal):void 0})})}function y(e,t,r,n){try{if(typeof e!="string")throw d(`${t} must be a string`,p,n);if(e.length===0)throw d(`${t} must not be empty`,m,n)}catch(a){throw r?u(a.message,r,n):a}}function Z(e,t){return h(this,null,function*(){if(!(e instanceof URL)&&e!==K)throw d('"expectedIssuer" must be an instance of URL',p);if(!B(t,Response))throw d('"response" must be an instance of Response',p);if(t.status!==200)throw u('"response" is not a conform Authorization Server Metadata response',ze,t);Ge(t),Te(t);let r;try{r=yield t.json()}catch(n){throw u('failed to parse "response" body as JSON',Le,n)}if(!Pe(r))throw u('"response" body must be a top level object',f,{body:r});if(y(r.issuer,'"response" body "issuer" property',f,{body:r}),new URL(r.issuer).href!==e.href&&e!==K)throw u('"response" body "issuer" property does not match the expected value',Me,{expected:e.href,body:r,attribute:"issuer"});return r})}function Te(e){xe(e,"application/json")}function Ae(e,...t){let r='"response" content-type must be ';if(t.length>2){let n=t.pop();r+=`${t.join(", ")}, or ${n}`}else t.length===2?r+=`${t[0]} or ${t[1]}`:r+=t[0];return u(r,We,e)}function xe(e,t){if(De(e)!==t)throw Ae(e,t)}function ke(){return F(crypto.getRandomValues(new Uint8Array(32)))}function X(){return ke()}function ee(e){return h(this,null,function*(){return y(e,"codeVerifier"),F(yield crypto.subtle.digest("SHA-256",Re(e)))})}function te(e){if(typeof e!="object"||e===null)throw d('"as" must be an object',p);y(e.issuer,'"as.issuer"')}function re(e){if(typeof e!="object"||e===null)throw d('"client" must be an object',p);y(e.client_id,'"client.client_id"')}function ne(e){return y(e,'"clientSecret"'),(t,r,n,a)=>{n.set("client_id",r.client_id),n.set("client_secret",e)}}var Oe=URL.parse?(e,t)=>URL.parse(e,t):(e,t)=>{try{return new URL(e,t)}catch(r){return null}};function ae(e,t){if(t&&e.protocol!=="https:")throw u("only requests to HTTPS are allowed",$e,e);if(e.protocol!=="https:"&&e.protocol!=="http:")throw u("only HTTP and HTTPS requests are allowed",Ke,e)}function $(e,t,r,n){let a;if(typeof e!="string"||!(a=Oe(e)))throw u(`authorization server metadata does not contain a valid ${r?`"as.mtls_endpoint_aliases.${t}"`:`"as.${t}"`}`,e===void 0?Be:qe,{attribute:r?`mtls_endpoint_aliases.${t}`:t});return ae(a,n),a}function Ce(e,t,r,n){return r&&e.mtls_endpoint_aliases&&t in e.mtls_endpoint_aliases?$(e.mtls_endpoint_aliases[t],t,r,n):$(e[t],t,r,n)}var C=class extends Error{constructor(r,n){var a,o;super(r,n);w(this,"cause");w(this,"code");w(this,"error");w(this,"error_description");this.name=this.constructor.name,this.code=Ie,this.cause=n.cause,this.error=n.cause.get("error"),this.error_description=(a=n.cause.get("error_description"))!=null?a:void 0,(o=Error.captureStackTrace)==null||o.call(Error,this,this.constructor)}};function je(e){if(!j.has(e))throw d('"options.DPoP" is not a valid DPoPHandle',m)}var _t=Symbol();function De(e){var t;return(t=e.headers.get("content-type"))==null?void 0:t.split(";")[0]}function Ue(e,t,r,n,a,o,s){return h(this,null,function*(){return yield r(e,t,a,o),o.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),((s==null?void 0:s[G])||fetch)(n.href,{body:a,headers:Object.fromEntries(o.entries()),method:"POST",redirect:"manual",signal:s!=null&&s.signal?Q(s.signal):void 0})})}function Ne(e,t,r,n,a,o){return h(this,null,function*(){var l;let s=Ce(e,"token_endpoint",t.use_mtls_endpoint_aliases,(o==null?void 0:o[q])!==!0);a.set("grant_type",n);let i=V(o==null?void 0:o.headers);i.set("accept","application/json"),(o==null?void 0:o.DPoP)!==void 0&&(je(o.DPoP),yield o.DPoP.addProof(s,i,"POST"));let c=yield Ue(e,t,r,s,a,i,o);return(l=o==null?void 0:o.DPoP)==null||l.cacheNonce(c),c})}var j=new WeakSet;function Je(e){return j.add(e),e}function oe(e,t,r,n,a,o,s){return h(this,null,function*(){if(te(e),re(t),!j.has(n))throw d('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()',m);y(a,'"redirectUri"');let i=_(n,"code");if(!i)throw u('no authorization code in "callbackParameters"',f);let c=new URLSearchParams(s==null?void 0:s.additionalParameters);return c.set("redirect_uri",a),c.set("code",i),o!==Qe&&(y(o,'"codeVerifier"'),c.set("code_verifier",o)),Ne(e,t,r,"authorization_code",c,s)})}var gt=Symbol(),bt=Symbol();var He="OAUTH_UNSUPPORTED_OPERATION",Ie="OAUTH_AUTHORIZATION_RESPONSE_ERROR";var Le="OAUTH_PARSE_ERROR",f="OAUTH_INVALID_RESPONSE";var We="OAUTH_RESPONSE_IS_NOT_JSON",ze="OAUTH_RESPONSE_IS_NOT_CONFORM",$e="OAUTH_HTTP_REQUEST_FORBIDDEN",Ke="OAUTH_REQUEST_PROTOCOL_FORBIDDEN";var Me="OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED";var Be="OAUTH_MISSING_SERVER_METADATA",qe="OAUTH_INVALID_SERVER_METADATA";function Ge(e){if(e.bodyUsed)throw d('"response" body has been used already',m)}var St=Symbol();function _(e,t){let{0:r,length:n}=e.getAll(t);if(n>1)throw u(`"${t}" parameter must be provided only once`,f);return r}var Fe=Symbol(),Ve=Symbol();function se(e,t,r,n){if(te(e),re(t),r instanceof URL&&(r=r.searchParams),!(r instanceof URLSearchParams))throw d('"parameters" must be an instance of URLSearchParams, or URL',p);if(_(r,"response"))throw u('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()',f,{parameters:r});let a=_(r,"iss"),o=_(r,"state");if(!a&&e.authorization_response_iss_parameter_supported)throw u('response parameter "iss" (issuer) missing',f,{parameters:r});if(a&&a!==e.issuer)throw u('unexpected "iss" (issuer) response parameter value',f,{expected:e.issuer,parameters:r});switch(n){case void 0:case Ve:if(o!==void 0)throw u('unexpected "state" response parameter encountered',f,{expected:void 0,parameters:r});break;case Fe:break;default:if(y(n,'"expectedState" argument'),o!==n)throw u(o===void 0?'response parameter "state" missing':'unexpected "state" response parameter value',f,{expected:n,parameters:r})}if(_(r,"error"))throw new C("authorization response from the server is an error",{cause:r});let i=_(r,"id_token"),c=_(r,"token");if(i!==void 0||c!==void 0)throw new k("implicit and hybrid flows are not supported");return Je(new URLSearchParams(r))}var Qe=Symbol(),K=Symbol(),Rt=Symbol();var ie=new URL("https://demo.duendesoftware.com/"),Ze="interactive.public",Xe="secret",et="S256",g,ce="{}",ue=()=>h(void 0,null,function*(){let e=new URL(document.querySelector("base").href||"/"),t=new URL(window.location.href);g||(g=yield Y(ie).then(a=>Z(ie,a)));let r={client_id:Ze},n=e+"oauth/callback";if(t.pathname===e.pathname+"oauth/callback"){let a=se(g,r,t,ce),o=ne(Xe),s=sessionStorage.getItem("code_verifier");sessionStorage.removeItem("code_verifier");let i=yield oe(g,r,o,a,n,s),c=yield i.json().catch(l=>l);!i.ok||c instanceof Error?console.error(c.error):sessionStorage.setItem("token",JSON.stringify(c)),history.replaceState(null,"",e.toString()),window.dispatchEvent(new CustomEvent("oauthDone"))}else if(t.pathname===e.pathname+"oauth/logout"){let a=JSON.parse(sessionStorage.getItem("token")),o=new URL(g.end_session_endpoint);sessionStorage.removeItem("token");let s=tt({id_token_hint:a.id_token,post_logout_redirect_uri:e.toString()},encodeURIComponent,"&");document.location.href=o.toString()+"?"+s}else{let a=X();sessionStorage.setItem("code_verifier",a);let o=yield ee(a),s=new URL(g.authorization_endpoint);s.searchParams.set("client_id",r.client_id),s.searchParams.set("redirect_uri",n),s.searchParams.set("state",ce),s.searchParams.set("response_type","code"),s.searchParams.set("scope","openid email profile offline_access"),s.searchParams.set("code_challenge",o),s.searchParams.set("code_challenge_method",et),document.location.href=s.toString()}});function tt(e,t=encodeURIComponent,r="&"){return Object.keys(e).map(n=>`${n}=${t(e[n])}`).join(r)}var nt=()=>(ue(),D.createElement("div",{id:"oauth"},"Even geduld a.u.b. ...")),U=L({React:D,ReactDOM:rt,rootComponent:nt,errorBoundary(e){return D.createElement("div",null,"Fatal error $",e.message," ")}}),Ct=U.bootstrap,jt=U.mount,Dt=U.unmount;export{Ct as bootstrap,U as lifecycles,jt as mount,Dt as unmount};