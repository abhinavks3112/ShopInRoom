import { ADD_ORDER, SET_ORDERS } from './types';
import Order from '../../models/order';

export const fetchOrders = () => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await fetch(`https://shopinroom-65e62.firebaseio.com/orders/${userId}.json`);
    if (!response.ok) {
        throw new Error('Something went wrong!! Please Try Again!!!');
    }
    const responseData = await response.json();

    const loadedOrders = [];
    for (const key in responseData) {
        loadedOrders.push(new Order(
            key,
            responseData[key].items,
            responseData[key].totalAmount,
            new Date(responseData[key].date)
        ));
    }
    dispatch({
        type: SET_ORDERS,
        orders: loadedOrders
    });
};

// eslint-disable-next-line import/prefer-default-export
export const addOrder = (cartItems, totalAmount) => async (dispatch, getState) => {
     // Thunk provides access to app state as second argument
    const { token } = getState().auth;
    const { userId } = getState().auth;
    const date = new Date().toISOString();
    const response = await fetch(`https://shopinroom-65e62.firebaseio.com/orders/${userId}.json?auth=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: cartItems,
            totalAmount,
            // ISO format date string YYYY-MM-DDTHH:mm:ss.sssZ
            date
        })
    });

    if (!response.ok) {
        throw new Error('Something went wrong!!! Please Try Again!!');
    }

    const responseData = await response.json();

    dispatch({
            type: ADD_ORDER,
            payload: {
                orderId: responseData.name,
                items: cartItems,
                amount: totalAmount,
                date
            }
    });
};
