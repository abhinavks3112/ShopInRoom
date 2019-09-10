import PRODUCTS from '../../data/dummy-data.js';
import { DELETE_PRODUCT } from '../actions/types';

const INITIAL_STATE = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1')
};

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_PRODUCT: {
            return ({
                ...state,
                userProducts: state.userProducts.filter(
                    (product) => product.id !== action.payload
                    ),
                availableProducts: state.availableProducts.filter(
                    (product) => product.id !== action.payload
                    )
            });
        }
        default:
            return state;
    }
};

export default productsReducer;
