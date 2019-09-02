import PRODUCTS from '../../data/dummy-data.js';

const INITIAL_STATE = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1')
};

const productsReducer = (state = INITIAL_STATE, action) => {
    return state;
};

export default productsReducer;
