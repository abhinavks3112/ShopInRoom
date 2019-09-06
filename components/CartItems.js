import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import BodyText from './BodyText';
import Colors from '../constants/Colors';

const CartItem = (props) => {
    const {
    title,
    quantity,
    sum,
    onDelete
    } = props;
    return (
        <View style={styles.item}>
            <BodyText style={styles.title}>{title}</BodyText>
            <View style={styles.itemList}>
                <View style={styles.content}>
                    <BodyText style={styles.quantity}>
                    x
                    {quantity}
                    </BodyText>
                </View>
                <View style={styles.content}>
                    <BodyText style={styles.sum}>
                    {sum.toFixed(2)}
                    $
                    </BodyText>
                    <TouchableNativeFeedback onPress={onDelete}>
                        <MaterialIcons
                        name="delete"
                        size={24}
                        color="red"
                        />
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        margin: 10
    },
    itemList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'roboto-bold',
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Primary
    },
    quantity: {
        color: '#888'
    },
    sum: {
        marginRight: 20
    }
});

export default CartItem;
