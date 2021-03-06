// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import { ViewerQueries } from './relay/queries';
import { requireAuth } from 'containers/Viewer/lib';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { /* injectReducer, */ injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        System.import('containers/HomePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        System.import('containers/Login')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/login/callback',
      name: 'loginCallback',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LoginCallback/sagas'),
          System.import('containers/LoginCallback'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/discover',
      name: 'discover',
      getComponent(nextState, cb) {
        System.import('containers/DiscoverPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      queries: ViewerQueries,
    }, {
      path: '/:slug',
      name: 'profile',
      getComponent(nextState, cb) {
        System.import('containers/ProfilePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      queries: ViewerQueries,
    }, {
      path: '/track/:trackId',
      name: 'track',
      getComponent(nextState, cb) {
        System.import('containers/TrackPlayer')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      queries: ViewerQueries,
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('components/NotFound')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
