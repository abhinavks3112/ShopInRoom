import React from 'react';
import {
 View, Image, StyleSheet, Dimensions, TouchableNativeFeedback
} from 'react-native';

import BodyText from './BodyText';
import TitleText from './TitleText';
import Card from './Card';

const ProductCard = (props) => {
    const {
        title, price, imageUrl, onSelect, children
    } = props;
    return (
        <Card style={styles.card}>
            <View style={styles.touchable}>
                <TouchableNativeFeedback
                onPress={onSelect}
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
                        {children}
                    </View>
                </TouchableNativeFeedback>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        // layout
        height: Dimensions.get('window').height > 300 ? Dimensions.get('window').height * 0.4 : 300,
        width: Dimensions.get('window').width > 300 ? Dimensions.get('window').width * 0.9 : 300,
        minWidth: 250,
        margin: 10,
        paddingBottom: 10
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
    }
});

export default ProductCard;
