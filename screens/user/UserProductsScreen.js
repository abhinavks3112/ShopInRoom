import React from 'react';
import {
 Button,
 View,
 StyleSheet,
 FlatList
} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import ProductCard from '../../components/ProductCard';
import CustomHeaderButton from '../../components/HeaderButton';

const UserProductScreen = () => {
    const userProducts = useSelector((state) => state.products.userProducts);

    return (
        <View style={styles.screen}>
            <FlatList
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                    <ProductCard
                    id={itemData.item.id}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    imageUrl={itemData.item.imageUrl}
                    onSelect={() => {}}
                    >
                        <View style={styles.actions}>
                                <Button
                                title="Edit"
                                onPress={() => {}}
                                color={Colors.Primary}
                                style={styles.button}
                                />
                                <Button
                                title="Delete"
                                onPress={() => {}}
                                color={Colors.Accent}
                                style={styles.button}
                                />
                        </View>
                    </ProductCard>
                )}
            />
        </View>
    );
};

UserProductScreen.navigationOptions = (navData) => ({
        headerTitle: 'Your Products',
        headerLeft: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
            title="Menu"
            iconName="menu"
            onPress={navData.navigation.toggleDrawer}
            />
        </HeaderButtons>
        )
});

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 2
    },
    button: {
        borderRadius: 10
    }
});

export default UserProductScreen;
