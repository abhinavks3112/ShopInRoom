import Order from '../../models/order';
import { ADD_ORDER, SET_ORDERS } from '../actions/types';

const INITIAL_STATE = {
    orders: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            };
        }
        case ADD_ORDER: {
            const newOrUpdatedOrder = new Order(
                action.payload.orderId,
                action.payload.items,
                action.payload.amount,
                action.payload.date
            );
            return {
                ...state,
                /* Adds the new item to the item and return a new array,
                so the old array remains untouched, so original remains immutable */
                orders: state.orders.concat(newOrUpdatedOrder)
            };
        }
        default:
            return state;
    }
};
