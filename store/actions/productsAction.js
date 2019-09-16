import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCTS
 } from './types';
 import Product from '../../models/product';

export const fetchProducts = () => async (dispatch) => {
    const response = await fetch('https://shopinroom-65e62.firebaseio.com/products.json');
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
    console.log('Loaded Product is ', loadedProducts);

    dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts
    });
};

export const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId
});

/* Using redux thunk here, we now instead of returning an object or action,
we return a function which receive dispatch as argument, inside of this function,
we dispatch action object */
export const createProduct = (
 title,
 imageUrl,
 description,
 price
) =>
    /* Using async await syntax for readability.
    In background, it translate to fetch().then() syntax */
    async (dispatch) => {
    // Any async code here
    const response = await fetch('https://shopinroom-65e62.firebaseio.com/products.json', {
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

    console.log(responseData);

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
   ) => ({
    type: UPDATE_PRODUCT,
    payload: {
        id,
        title,
        imageUrl,
        description
    }
});
