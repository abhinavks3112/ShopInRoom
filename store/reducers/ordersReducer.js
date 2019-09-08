import Order from '../../models/order';
import { ADD_ORDER } from '../actions/types';

const INITIAL_STATE = {
    orders: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ORDER: {
            const newOrUpdatedOrder = new Order(
                new Date().toString(),
                action.payload.items,
                action.payload.amount,
                new Date().toDateString()
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
