import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = (props) => {
    const { children } = props;
    return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto'
    }
});

export default BodyText;
