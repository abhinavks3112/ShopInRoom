import {
 ADD_TO_CART,
 REMOVE_FROM_CART,
 ADD_ORDER,
 DELETE_PRODUCT
} from '../actions/types';
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

        case REMOVE_FROM_CART: {
            /* Copying everthing from action.payload except the property name
            that is specified in first argument(should be same name inside object
            that we do not want to copy), into a second argument */
            const { productId, ...prodDetails } = action.payload;

            if (action.payload.quantity > 1) {
                prodDetails.quantity -= 1;
                prodDetails.sum -= prodDetails.productPrice;
                return {
                    ...state,
                    items: { ...state.items, [productId]: prodDetails },
                    totalAmount: state.totalAmount - prodDetails.productPrice
                };
            }

            /* If item quantity is zero, delete it from the list of items in cart */
            const itemsLeft = { ...state.items };
            delete itemsLeft[productId];
            return {
                ...state,
                items: itemsLeft,
                totalAmount: state.totalAmount - prodDetails.productPrice
            };
        }
        /* Since same action is received in every reducer, using that we will clear the cart
        in cart reducer, and add the order in ordersReducer, as soon as an order is made */
        case ADD_ORDER: {
            return INITIAL_STATE;
        }

        /* If a product item has been deleted by the owner then that product should also
        not be present in cart */
        case DELETE_PRODUCT: {
            if (!state.items[action.payload]) {
                return state;
            }
            const updatedItems = { ...state.items };
            const itemTotal = state.items[action.payload].sum;
            delete updatedItems[action.payload];
            return ({
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            });
        }

        default: return state;
    }
};
