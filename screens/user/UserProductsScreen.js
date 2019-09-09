import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
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
                    onViewDetails={() => {}}
                    onAddToCart={() => {}}
                    />
                )}
            />
        </View>
    );
};

UserProductScreen.navigationOptions = () => ({
        headerTitle: 'Your Products',
        headerLeft: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
            title="Menu"
            iconName="menu"
            color="white"
            />
        </HeaderButtons>
        )
});

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductScreen;
