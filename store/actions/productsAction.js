import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCTS
 } from './types';
 import Product from '../../models/product';

export const fetchProducts = () => async (dispatch) => {
    /* When using async await we use try catch block instead of .then().catch() format */
    try {
        const response = await fetch('https://shopinroom-65e62.firebaseio.com/products.json');

        /* If response is not in 100-200 range then,
        we can raise a new error(forward by throwing it) indicating the same, this
        will be caught in catch block */
        if (!response.ok) {
            throw new Error('Something went wrong!!');
        }
        const responseData = await response.json();

        const loadedProducts = [];
        for (const key in responseData) {
            loadedProducts.push(new Product(
            key,
            'u1',
            responseData[key].title,
            responseData[key].imageUrl,
            responseData[key].description,
            responseData[key].price
            ));
        }

        dispatch({
            type: SET_PRODUCTS,
            products: loadedProducts
        });
    } catch (err) {
        // send to custom analytic server
        /* If we are throwing err from catch block, it means try catch block is not required,
        but if we had a server or path to handler error, we may write some code here.
        Throwing error ultimately forwards it, so if we have code to access
        this action result with try catch block, it will end up there */
        throw err;
    }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
     // Thunk provides access to app state as second argument
    const { token } = getState().auth;
    const response = await fetch(`https://shopinroom-65e62.firebaseio.com/products/${productId}.json?auth=${token}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
     /* If response is not in 100-200 range then,
    we can raise a new error(forward by throwing it) indicating the same,
    this will be caught in catch block */
    if (!response.ok) {
        throw new Error('Something went wrong, please Try Again');
    }
    dispatch({
        type: DELETE_PRODUCT,
        payload: productId
    });
};

/* Using redux thunk here, we now instead of returning an object or action,
we return a function which receive dispatch as argument, inside of this function,
we dispatch action object */
export const createProduct = (
 title,
 imageUrl,
 description,
 price
) => async (dispatch, getState) => {
     // Thunk provides access to app state as second argument
     const { token } = getState().auth;
    /* Using async await syntax for readability.
    In background, it translate to fetch().then() syntax */
    // Any async code here
    const response = await fetch(`https://shopinroom-65e62.firebaseio.com/products.json?auth=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        /* Firbase automatically generate an id for us,
        so no need to send that. */
        body: JSON.stringify({
            title,
            imageUrl,
            description,
            price
        })
    });

    /* We have to put await in on every async promise */
    const responseData = await response.json();

    dispatch({
        type: CREATE_PRODUCT,
        payload: {
            id: responseData.name, // Firebase generated unique id for the record
            title,
            imageUrl,
            description,
            price
        }
    });
};

export const updateProduct = (
    id,
    title,
    imageUrl,
    description
   ) => async (dispatch, getState) => {
    // Thunk provides access to app state as second argument
    const { token } = getState().auth;
    const response = await fetch(`https://shopinroom-65e62.firebaseio.com/products/${id}.json?auth=${token}`, {
        /* PATCH Http method does partial updates in the place where we tell it,
        whereas PUT method replaces the original version entirely */
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            imageUrl,
            description
        })
    });

    /* If response is not in 100-200 range then,
    we can raise a new error(forward by throwing it) indicating the same,
    this will be caught in catch block */
    if (!response.ok) {
        throw new Error('Something went wrong, please Try Again');
    }

    dispatch({
        type: UPDATE_PRODUCT,
        payload: {
            id,
            title,
            imageUrl,
            description
        }
    });
};
