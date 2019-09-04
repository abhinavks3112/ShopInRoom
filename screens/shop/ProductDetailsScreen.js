import React from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import BodyText from '../../components/BodyText';
import TitleText from '../../components/TitleText';

const ProductDetailsScreen = (props) => {
    const { navigation } = props;
    const prodId = navigation.getParam('productId');
    const selectedProduct = useSelector(
        (state) => state.products.availableProducts.find((product) => product.id === prodId)
    );
    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                    source={{ uri: selectedProduct.imageUrl }}
                    style={styles.image}
                    />
                </View>
                <View>
                    <TitleText style={styles.subHeading}>Price:</TitleText>
                    <BodyText style={styles.price}>{selectedProduct.price.toFixed(2)}</BodyText>
                    <TitleText style={styles.subHeading}>Description:</TitleText>
                    <BodyText style={styles.description}>{selectedProduct.description}</BodyText>
                </View>
            </ScrollView>
        </View>
    );
};

ProductDetailsScreen.navigationOptions = (navData) => {
    const prodTitle = navData.navigation.getParam('productTitle');
    return ({
        headerTitle: prodTitle
    });
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    imageContainer: {
        overflow: 'hidden',
        height: Dimensions.get('window').height > 300 ? 400 : 300,
        width: Dimensions.get('window').width > 300 ? Dimensions.get('window').width : 300
    },
    image: {
        height: '100%',
        width: '100%'
    },
    subHeading: {
        fontSize: 18,
        marginVertical: 5
    },
    price: {
        color: '#888',
        fontSize: 16,
        padding: 5
    },
    description: {
        fontSize: 16,
        padding: 5
    }
});

export default ProductDetailsScreen;
