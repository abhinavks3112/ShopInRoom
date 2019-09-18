import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Spinner = (props) => {
    const { spinnerSize, spinnerColor } = props;
    return (
        <View style={styles.spinner}>
            <ActivityIndicator
            size={spinnerSize}
            color={spinnerColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Spinner;
