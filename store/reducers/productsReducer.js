import PRODUCTS from '../../data/dummy-data.js';
import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT
 } from '../actions/types';
import Product from '../../models/product';

const INITIAL_STATE = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1')
};

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_PRODUCT: {
            const {
                title,
                imageUrl,
                description,
                price
            } = action.payload;
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                title,
                imageUrl,
                description,
                parseFloat(price)
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };
        }

        case UPDATE_PRODUCT: {
            const {
            id,
            title,
            imageUrl,
            description
            } = action.payload;

            const productIndex = state.userProducts.findIndex((product) => product.id === id);
            const updatedProduct = new Product(
                id,
                state.userProducts[productIndex].ownerId,
                title,
                imageUrl,
                description,
                // Since we are not changin price, we will keep it the same
                parseFloat(state.userProducts[productIndex].price)
            );
            const updatedUserProduct = [...state.userProducts];
            /* Updating the product located at index(that we found for the edited product)
            with the list of updated fields  */
            updatedUserProduct[productIndex] = updatedProduct;

            /* Doing the same thing for available Products array */
            const availableProductsIndex = state.availableProducts.findIndex(
                (product) => product.id === id
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductsIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProduct
            };
        }

        case DELETE_PRODUCT: {
            return ({
                ...state,
                userProducts: state.userProducts.filter(
                    (product) => product.id !== action.payload
                    ),
                availableProducts: state.availableProducts.filter(
                    (product) => product.id !== action.payload
                    )
            });
        }

        default:
            return state;
    }
};

export default productsReducer;
