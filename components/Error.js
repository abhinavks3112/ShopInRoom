import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import BodyText from './BodyText';

const Error = (props) => {
    const { errorText, onReloadDoThis, buttonColor } = props;
    return (
        <View style={styles.error}>
            <BodyText>{errorText}</BodyText>
            <View style={styles.tryAgain}>
                <Button
                title="Try Again"
                onPress={onReloadDoThis}
                color={buttonColor}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tryAgain: {
        marginVertical: 10
    }
});

export default Error;
