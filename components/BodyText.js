import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = (props) => {
    const { children, style } = props;
    return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto',
        fontSize: 16
    }
});

export default BodyText;
