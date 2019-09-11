import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
    const { children, style } = props;
    return (
        <View style={{ ...styles.card, ...style }}>{children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
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
    }
});

export default Card;
