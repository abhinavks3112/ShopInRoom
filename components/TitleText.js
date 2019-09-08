import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = (props) => {
    const { children, style } = props;
    return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto-bold',
        fontSize: 18
    }
});

export default TitleText;
