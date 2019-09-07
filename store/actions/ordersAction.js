import { ADD_ORDER } from './types';

export const addOrder = (cartItems, totalAmount) => ({
        type: ADD_ORDER,
        payload: {
            items: cartItems,
            amount: totalAmount
        }
});
