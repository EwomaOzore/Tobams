import React, { useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen = ({ cart }) => {
    const [itemQuantities, setItemQuantities] = useState({});

    const handleIncrement = (itemId) => {
        setItemQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: (prevQuantities[itemId] || 0) + 1,
        }));
    };

    const handleDecrement = (itemId) => {
        if (itemQuantities[itemId] > 0) {
            setItemQuantities((prevQuantities) => ({
                ...prevQuantities,
                [itemId]: prevQuantities[itemId] - 1,
            }));
        }
    };

    const renderItem = ({ item }) => (
        <View className="flex-row items-center justify-between p-6 bg-[#F9F9F9] border-b border-gray-300">
            <Image source={item.itemImage} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
            <View className="flex-row items-center">
                <View className="ml-4">
                    <Text className="font-bold text-xl mb-2">{item.itemName}</Text>
                    <Text className="mb-2 font-bold text-[#DB3C25] text-xl">£{item.itemPrice}</Text>
                    <TouchableOpacity>
                        <Icon name="trash-bin" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-col items-center ml-4">
                <TouchableOpacity onPress={() => handleDecrement(item.itemId)}>
                    <Text className="bg-white text-2xl p-2"> - </Text>
                </TouchableOpacity>
                <Text className="text-xl p-2">{itemQuantities[item.itemId] || 0}</Text>
                <TouchableOpacity onPress={() => handleIncrement(item.itemId)}>
                    <Text className="bg-white text-2xl p-2"> + </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className="flex-1 p-4 bg-white">
            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.itemId.toString()}
                        renderItem={renderItem}
                    />

                    <View className="mt-4">
                        <View className="flex flex-row justify-between">
                            <Text className="font-bold text-lg">Total ({calculateTotalQuantity(itemQuantities)} Items)</Text>
                            <Text className="font-bold text-lg">£{calculateTotal(cart, itemQuantities)}</Text>
                        </View>
                        <TouchableOpacity className="bg-[#DB3C25] p-4 mt-2 rounded-full">
                            <Text className="text-white text-center font-bold">
                                Checkout - £{calculateTotal(cart, itemQuantities)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text>Your cart is empty</Text>
            )}
        </View>
    );
};

const calculateTotal = (cart, itemQuantities) => {
    return cart.reduce((total, item) => total + (itemQuantities[item.itemId] || 0) * item.itemPrice, 0).toFixed(2);
};

const calculateTotalQuantity = (itemQuantities) => {
    return Object.values(itemQuantities).reduce((total, quantity) => total + quantity, 0);
};

export default CartScreen;