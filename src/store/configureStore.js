import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../core/reducers';

export default (initialState = {}) => {
  let middleware = applyMiddleware(thunk);

  if (process.env.NODE_ENV !== 'production') {
    // configure redux-devtools-extension
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducers, initialState, middleware);

  if (module.hot) {
    module.hot.accept('../core/reducers', () => {
      store.replaceReducer(require('../core/reducers').default);
    });
  }

  return store;
};
