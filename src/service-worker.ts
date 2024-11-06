import {registerRoute, Route} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';


registerRoute(
  (route: Route) => route.url.hostname.match('esm.sh'),
  new StaleWhileRevalidate()
);
