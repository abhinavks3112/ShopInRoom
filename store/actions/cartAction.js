import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
});

export const removeFromCart = (prodToDelete) => ({
    type: REMOVE_FROM_CART,
    payload: prodToDelete
});
