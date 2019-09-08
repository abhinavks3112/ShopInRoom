import React, { useState } from 'react';
import {
    View,
    Button,
    StyleSheet,
    FlatList
} from 'react-native';

import BodyText from './BodyText';
import TitleText from './TitleText';
import Colors from '../constants/Colors';
import CartItem from './CartItems';

const OrderItem = (props) => {
    const {
    orderId,
    orderDate,
    orderItems,
    totalAmount
    } = props;

    const [showDetails, setShowDetails] = useState(false);
    const renderItemList = () => {
        if (showDetails) {
            return (
                <View>
                    <FlatList
                    data={orderItems}
                    renderItem={(itemData) => (
                            <CartItem
                            title={itemData.item.productTitle}
                            quantity={itemData.item.quantity}
                            sum={itemData.item.sum}
                            onDelete={() => {}}
                            />
                        )}
                    keyExtractor={(item) => item.productId}
                    />
                </View>
            );
        }
    };

    return (
        <View style={styles.content}>
            <TitleText style={styles.title}>{orderId}</TitleText>
            <View style={styles.orderSummary}>
                <BodyText style={styles.date}>{orderDate}</BodyText>
                <TitleText style={styles.amount}>{totalAmount.toFixed(2)}</TitleText>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                title="Show Details"
                color={Colors.Primary}
                onPress={() => setShowDetails(!showDetails)}
                />
            </View>
            {renderItemList()}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        margin: 10,
        padding: 10,

        // border
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,

        // shadow
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 10,
        shadowOpacity: 0.3
    },
    orderSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        backgroundColor: Colors.Accent,
        color: 'white',
        borderRadius: 10,
        padding: 10
    },
    date: {
        color: '#888'
    },
    amount: {
        color: Colors.Primary,
        marginLeft: 18
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }
});

export default OrderItem;
