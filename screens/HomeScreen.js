import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Item from '../components/Item';
import SearchBar from '../components/SearchBar';
import CartScreen from './CartScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [allItems, setAllItems] = useState([
        { itemName: "Chicken Stew", itemImage: require('../assets/product1.png'), itemPrice: 30, itemId: 1 },
        { itemName: "Asaro (Yam Porridge)", itemImage: require('../assets/product2.png'), itemPrice: 30, itemId: 2 },
        { itemName: "Efo Riro", itemImage: require('../assets/product3.png'), itemPrice: 30, itemId: 3 },
        { itemName: "Moi Moi (Bean Cake)", itemImage: require('../assets/product5.png'), itemPrice: 30, itemId: 5 },
        { itemName: "African Donut Mix (Puff Puff)", itemImage: require('../assets/product4.png'), itemPrice: 30, itemId: 4 },
    ]);
    const [cart, setCart] = useState([]);

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === "") {
            setFilteredItems([]);
            return;
        }

        const filtered = allItems.filter(item =>
            item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredItems(filtered);
    };

    const handleAddToCart = (item) => {
        const isItemInCart = cart.some(cartItem => cartItem.itemId === item.itemId);

        if (!isItemInCart) {
            setCart(prevCart => [...prevCart, item]);
        }
    };

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#DB3C25',
                inactiveTintColor: 'gray',
                showLabel: false,
                style: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: 'gray',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={() => (
                    <HomeContent
                        items={filteredItems.length > 0 ? filteredItems : allItems}
                        handleSearch={handleSearch}
                        handleAddToCart={handleAddToCart}
                        cart={cart}
                    />
                )}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Menu"
                component={MenuContent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="menu" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Cart"
                component={() => <CartContent cart={cart} />}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cart" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileContent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const HomeContent = ({ items, handleSearch, handleAddToCart, cart }) => (
    <ScrollView className="flex-1 bg-gray-100 p-4">
        <SearchBar onSearch={handleSearch} />
        <View className="flex flex-row flex-wrap justify-between">
            {items.map(item => (
                <Item
                    key={item.itemId}
                    itemName={item.itemName}
                    itemPrice={item.itemPrice}
                    itemImage={item.itemImage}
                    itemId={item.itemId}
                    handleAddToCart={() => handleAddToCart(item)}
                    isInCart={cart.some(cartItem => cartItem.itemId === item.itemId)}
                />
            ))}
        </View>
    </ScrollView>
);

const MenuContent = () => (
    <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-slate-800 font-extrabold text-3xl">Menu Screen 🍔</Text>
    </View>
);

const CartContent = ({ cart }) => (
    <View className="flex-1">
        <CartScreen cart={cart} />
    </View>
);

const ProfileContent = () => (
    <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-slate-800 font-extrabold text-3xl">Profile Screen 👤</Text>
    </View>
);

export default HomeScreen;