import {registerRoute, Route} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

self.__WB_DISABLE_DEV_LOGS = true;

registerRoute(
  (route: Route) => route.url.hostname.match('esm.sh'),
  new StaleWhileRevalidate()
);
