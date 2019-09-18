import { ADD_ORDER, SET_ORDERS } from './types';
import Order from '../../models/order';

export const fetchOrders = () => async (dispatch) => {
    const response = await fetch('https://shopinroom-65e62.firebaseio.com/orders/u1.json');
    if (!response.ok) {
        throw new Error('Something went wrong!! Please Try Again!!!');
    }
    const responseData = await response.json();
    console.log('Orders Data is ', responseData);
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
export const addOrder = (cartItems, totalAmount) => async (dispatch) => {
    const date = new Date().toISOString();
    const response = await fetch('https://shopinroom-65e62.firebaseio.com/orders/u1.json', {
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
