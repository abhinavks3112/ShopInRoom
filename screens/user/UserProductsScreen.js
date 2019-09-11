import React from 'react';
import {
 Button,
 View,
 StyleSheet,
 FlatList,
 Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import ProductCard from '../../components/ProductCard';
import CustomHeaderButton from '../../components/HeaderButton';

import { deleteProduct } from '../../store/actions/productsAction';

const UserProductScreen = (props) => {
    const { navigation } = props;
    const userProducts = useSelector((state) => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (item) => (
        navigation.navigate({
            routeName: 'EditProducts',
            params: {
                id: item.id
            }
        })
    );

    const deleteProductHandler = (prodId) => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this product', [
            {
                text: 'No',
                style: 'default' /* Do nothing, close the confirm box */
            },
            {
                text: 'Yes',
                style: 'destructive', /* Do something, close the confirm box */
                onPress: () => dispatch(deleteProduct(prodId))
            }
        ]);
    };

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
                    onSelect={() => editProductHandler(itemData.item)}
                    >
                        <View style={styles.actions}>
                                <Button
                                title="Edit"
                                onPress={() => editProductHandler(itemData.item)}
                                color={Colors.Primary}
                                style={styles.button}
                                />
                                <Button
                                title="Delete"
                                onPress={() => deleteProductHandler(itemData.item.id)}
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
        ),
        /* For adding new products, no need for any id */
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Add"
                iconName="add-box"
                onPress={() => navData.navigation.navigate('EditProducts')}
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
