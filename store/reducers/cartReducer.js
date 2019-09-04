import { ADD_TO_CART } from '../actions/types';
import CartItem from '../../models/cart-item';

const INITIAL_STATE = {
    items: {},
    totalAmount: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const addedProduct = action.payload;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;
            if (state.items[addedProduct.id]) {
                // Item is already in our list of items
                    updatedOrNewCartItem = new CartItem(
                    prodTitle,
                    prodPrice,
                    state.items[addedProduct.id].quantity + 1,
                    state.items[addedProduct.id].sum + prodPrice
                );
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                    totalAmount: state.totalAmount + prodPrice
                };
            }

            updatedOrNewCartItem = new CartItem(prodTitle, prodPrice, 1, prodPrice);
            return {
                ...state,
                /* Adding a dynamic property to items object with key and value
                 being Product id and newCartItem respectively */
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            };
        }
        default: return state;
    }
};
