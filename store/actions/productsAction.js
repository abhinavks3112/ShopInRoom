import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT
 } from './types';

export const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId
});

export const createProduct = (
 title,
 imageUrl,
 description,
 price
) => ({
    type: CREATE_PRODUCT,
    payload: {
        title,
        imageUrl,
        description,
        price
    }
});

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
