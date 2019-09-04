import React from 'react';
import {
 View, Image, StyleSheet, Button, Dimensions, TouchableNativeFeedback
} from 'react-native';

import BodyText from './BodyText';
import TitleText from './TitleText';
import Colors from '../constants/Colors';

const ProductCard = (props) => {
    const { navigation } = props;
    const {
        id, title, price, imageUrl, onViewDetails, onAddToCart
    } = props;
    return (
        <View style={styles.card}>
            <View style={styles.touchable}>
                <TouchableNativeFeedback
                onPress={onViewDetails}
                >
                    <View>
                        <View style={styles.imageContainer}>
                            <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                            />
                        </View>
                        <View style={styles.content}>
                            <TitleText style={styles.title}>
                                {title}
                            </TitleText>
                            <BodyText style={styles.price}>
                                {price.toFixed(2)}
                                $
                            </BodyText>
                        </View>
                        <View style={styles.actions}>
                            <Button
                            title="View Details"
                            onPress={onViewDetails}
                            color={Colors.Primary}
                            style={styles.button}
                            />
                            <Button
                            title="Add To Cart"
                            onPress={onAddToCart}
                            color={Colors.Accent}
                            style={styles.button}
                            />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: Dimensions.get('window').height > 300 ? Dimensions.get('window').height * 0.4 : 300,
        width: Dimensions.get('window').width > 300 ? Dimensions.get('window').width * 0.9 : 300,
        minWidth: 250,
        margin: 10,
        paddingBottom: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 10,
        shadowOpacity: 0.3
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    imageContainer: {
        overflow: 'hidden',
        height: '60%'
    },
    image: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    content: {
        height: '15%',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 2
    },
    button: {
        borderRadius: 10
    }
});

export default ProductCard;
