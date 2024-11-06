// import "workbox-sw";
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js'
// );

registerRoute(
  ({url}) => url.hostname.match('esm.sh'),
  new StaleWhileRevalidate()
);
