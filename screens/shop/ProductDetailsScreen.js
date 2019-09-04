import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    Button
} from 'react-native';
import { useSelector } from 'react-redux';

import BodyText from '../../components/BodyText';
import TitleText from '../../components/TitleText';
import Colors from '../../constants/Colors';

const ProductDetailsScreen = (props) => {
    const { navigation } = props;
    const prodId = navigation.getParam('productId');
    const selectedProduct = useSelector(
        (state) => state.products.availableProducts.find((product) => product.id === prodId)
    );
    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image
                source={{ uri: selectedProduct.imageUrl }}
                style={styles.image}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                title="Add To Cart"
                color={Colors.Primary}
                onPress={() => {}}
                />
            </View>
            <View>
                <TitleText style={styles.price}>
                    {selectedProduct.price.toFixed(2)}
                    $
                </TitleText>
                <BodyText style={styles.description}>{selectedProduct.description}</BodyText>
            </View>
        </ScrollView>
    );
};

ProductDetailsScreen.navigationOptions = (navData) => {
    const prodTitle = navData.navigation.getParam('productTitle');
    return ({
        headerTitle: prodTitle
    });
};

const styles = StyleSheet.create({
    imageContainer: {
        overflow: 'hidden',
        height: Dimensions.get('window').height > 250 ? 300 : 250,
        width: Dimensions.get('window').width > 300 ? Dimensions.get('window').width : 320
    },
    image: {
        height: '100%',
        width: '100%'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    price: {
        color: '#888',
        fontSize: 18,
        padding: 5,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        padding: 5,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ProductDetailsScreen;
