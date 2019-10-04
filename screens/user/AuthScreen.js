import React from 'react';
import {
    ScrollView, View, StyleSheet, KeyboardAvoidingView, Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/Input';
import Card from '../../components/Card';
import Colors from '../../constants/Colors';

const AuthScreen = (props) => {
    const { navigation } = props;
    return (
        <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        style={styles.screen}
        >
            <LinearGradient
            colors={['#F95700FF', '#FFCF75']}
            style={styles.gradient}
            >
                <Card style={styles.card}>
                    <ScrollView>
                        <Input
                        id="email"
                        label="Email"
                        placeholder="abc@gmail.com"
                        errorText="Please enter a valid email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onInputChange={() => {}}
                        email
                        required
                        />
                        <Input
                        id="password"
                        label="Password"
                        placeholder="password"
                        errorText="Please enter a valid password"
                        autoCapitalize="none"
                        secureTextEntry
                        onInputChange={() => {}}
                        required
                        minLength={5}
                        />
                        <View style={styles.buttonsContainer}>
                            <Button
                            title="Login"
                            color={Colors.Primary}
                            onPress={() => navigation.navigate('Shop')}
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Button
                            title="Switch to Sign Up"
                            color={Colors.Accent}
                            onPress={() => {}}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Login'
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        backgroundColor: 'white'
    },
    buttonsContainer: {
        marginTop: 10,
        alignItems: 'center'
    }
});

export default AuthScreen;
