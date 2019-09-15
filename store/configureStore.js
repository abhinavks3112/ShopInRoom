import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './reducers/productsReducer';
import cartReducer from './reducers/cartReducer';
import ordersReducer from './reducers/ordersReducer';

const configureStore = (preLoadedState) => {
    const rootReducer = combineReducers({
        products: productsReducer,
        carts: cartReducer,
        orders: ordersReducer
    });

    const middlewareEnchancer = applyMiddleware(ReduxThunk);

    /* We use compose to compose our new middlewareEnhancer
    and our composeWithDevTools into one function.
    This is needed because we can only pass one enhancer into createStore.
    To use multiple enhancers, we must first compose them into a single
    larger enhancer just as we do with reducers.
    Note: we remove the compose function which we imported from redux,
    and replace it with a new composeWithDevTools function imported
    from redux-devtools-extension. */
    /* composeWithDevTools should be removed when deploying the app since
    this is only useful for debugging with Redux Native Debugger Tool */
    const composeEnhancers = composeWithDevTools(middlewareEnchancer);

    /* we pass this new composedEnhancers function into createStore as its third argument.
    Note: the second argument, which we will ignore, lets us preloaded state into the store. */
    const store = createStore(rootReducer, preLoadedState, composeEnhancers);

    return store;
};

export default configureStore;
