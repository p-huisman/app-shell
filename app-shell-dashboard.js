var S=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(t,n)=>(typeof require!="undefined"?require:t)[n]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});import R from"react";import N from"react-dom";function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,o)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?v(Object(n),!0).forEach(function(o){D(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function C(e){return(C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e){return(y=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function E(e,t){var n;if(typeof(n=t.domElement?function(){return t.domElement}:t.domElementGetter?t.domElementGetter:e.domElementGetter?e.domElementGetter:function(o){var a=o.appName||o.name;if(!a)throw Error("single-spa's dom-element-getter-helpers was not given an application name as a prop, so it can't make a unique dom element container for the react application");var r="single-spa-application:".concat(a);return function(){var c=document.getElementById(r);return c||((c=document.createElement("div")).id=r,document.body.appendChild(c)),c}}(t))!="function")throw Error("single-spa's dom-element-getter-helpers was given an invalid domElementGetter for application or parcel '".concat(t.name,"'. Expected a function, received ").concat(y(n)));return function(){var o=n(t);if(!(o instanceof HTMLElement))throw Error("single-spa's dom-element-getter-helpers: domElementGetter returned an invalid dom element for application or parcel '".concat(t.name,"'. Expected HTMLElement, received ").concat(y(o)));return o}}var p=null;try{p=S("react").createContext()}catch(e){}var B={React:null,ReactDOM:null,ReactDOMClient:null,rootComponent:null,loadRootComponent:null,errorBoundary:null,errorBoundaryClass:null,domElementGetter:null,parcelCanUpdate:!0,suppressComponentDidCatchWarning:!1,domElements:{},renderResults:{},updateResolves:{},unmountResolves:{}};function O(e){if(C(e)!=="object")throw new Error("single-spa-react requires a configuration object");var t,n=m(m({},B),e);if(!n.React)throw new Error("single-spa-react must be passed opts.React");if(!n.ReactDOM&&!n.ReactDOMClient)throw new Error("single-spa-react must be passed opts.ReactDOM or opts.ReactDOMClient");if(n.renderType||((t=n.ReactDOMClient)!==null&&t!==void 0&&t.createRoot?n.renderType="createRoot":n.renderType="render"),!n.rootComponent&&!n.loadRootComponent)throw new Error("single-spa-react must be passed opts.rootComponent or opts.loadRootComponent");if(n.errorBoundary&&typeof n.errorBoundary!="function")throw Error("The errorBoundary opt for single-spa-react must either be omitted or be a function that returns React elements");!p&&n.React.createContext&&(p=n.React.createContext()),n.SingleSpaRoot=function(a){function r(c){r.displayName="SingleSpaRoot(".concat(c.name,")")}return r.prototype=Object.create(a.React.Component.prototype),r.prototype.componentDidMount=function(){setTimeout(this.props.mountFinished)},r.prototype.componentWillUnmount=function(){setTimeout(this.props.unmountFinished)},r.prototype.render=function(){return setTimeout(this.props.updateFinished),this.props.children},r}(n);var o={bootstrap:T.bind(null,n),mount:j.bind(null,n),unmount:P.bind(null,n)};return n.parcelCanUpdate&&(o.update=x.bind(null,n)),o}function T(e,t){return e.rootComponent?Promise.resolve():e.loadRootComponent(t).then(function(n){e.rootComponent=n})}function j(e,t){return new Promise(function(n,o){e.suppressComponentDidCatchWarning||!function(u){if(!(u&&typeof u.version=="string"&&u.version.indexOf(".")>=0))return!1;var i=u.version.slice(0,u.version.indexOf("."));try{return Number(i)>=16}catch(s){return!1}}(e.React)||e.errorBoundary||e.errorBoundaryClass||(e.rootComponent.prototype?e.rootComponent.prototype.componentDidCatch||console.warn("single-spa-react: ".concat(t.name||t.appName||t.childAppName,"'s rootComponent should implement componentDidCatch to avoid accidentally unmounting the entire single-spa application.")):console.warn("single-spa-react: ".concat(t.name||t.appName||t.childAppName,"'s rootComponent does not implement an error boundary.  If using a functional component, consider providing an opts.errorBoundary to singleSpaReact(opts).")));var a=w(e,t,function(){n(this)}),r=E(e,t)(),c=function(u){var i=u.reactDom,s=u.renderType,d=u.elementToRender,f=u.domElement,l=i[s];if(typeof l!="function")throw new Error('renderType "'.concat(s,'" did not return a function.'));switch(s){case"createRoot":case"unstable_createRoot":case"createBlockingRoot":case"unstable_createBlockingRoot":var g=l(f);return g.render(d),g;case"hydrateRoot":return l(f,d);case"hydrate":default:return l(d,f),null}}({elementToRender:a,domElement:r,reactDom:h(e),renderType:M(e)});e.domElements[t.name]=r,e.renderResults[t.name]=c})}function P(e,t){return new Promise(function(n){e.unmountResolves[t.name]=n;var o=e.renderResults[t.name];o&&o.unmount?o.unmount():h(e).unmountComponentAtNode(e.domElements[t.name]),delete e.domElements[t.name],delete e.renderResults[t.name]})}function x(e,t){return new Promise(function(n){e.updateResolves[t.name]||(e.updateResolves[t.name]=[]),e.updateResolves[t.name].push(n);var o=w(e,t,null),a=e.renderResults[t.name];if(a&&a.render)a.render(o);else{var r=E(e,t)();h(e).render(o,r)}})}function h(e){return e.ReactDOMClient||e.ReactDOM}function M(e){return typeof e.renderType=="function"?e.renderType():e.renderType}function w(e,t,n){var o=e.React.createElement(e.rootComponent,t),a=p?e.React.createElement(p.Provider,{value:t},o):o;return(e.errorBoundary||t.errorBoundary||e.errorBoundaryClass||t.errorBoundaryClass)&&(e.errorBoundaryClass=e.errorBoundaryClass||t.errorBoundaryClass||function(r,c){function u(i){r.React.Component.apply(this,arguments),this.state={caughtError:null,caughtErrorInfo:null},u.displayName="SingleSpaReactErrorBoundary(".concat(i.name,")")}return u.prototype=Object.create(r.React.Component.prototype),u.prototype.render=function(){return this.state.caughtError?(r.errorBoundary||c.errorBoundary)(this.state.caughtError,this.state.caughtErrorInfo,this.props):this.props.children},u.prototype.componentDidCatch=function(i,s){this.setState({caughtError:i,caughtErrorInfo:s})},u}(e,t),a=e.React.createElement(e.errorBoundaryClass,t,a)),a=e.React.createElement(e.SingleSpaRoot,m(m({},t),{},{mountFinished:n,updateFinished:function(){e.updateResolves[t.name]&&(e.updateResolves[t.name].forEach(function(r){return r()}),delete e.updateResolves[t.name])},unmountFinished:function(){e.unmountResolves[t.name]&&(e.unmountResolves[t.name](),delete e.unmountResolves[t.name])}}),a)}var F=e=>{let{foo:t}=e;return R.createElement("div",{id:"dashboard"},"App ",new Date().toLocaleTimeString()," ",t)},b=O({React:R,ReactDOM:N,rootComponent:F,errorBoundary(e){return R.createElement("div",null,"Fatal error $",e.message," ")}}),L=b.bootstrap,U=b.mount,W=b.unmount;export{L as bootstrap,b as lifecycles,U as mount,W as unmount};