import { DELETE_PRODUCT } from './types';

export const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId
});
