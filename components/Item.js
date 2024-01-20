import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = ({ itemName, itemImage, itemPrice, itemId, handleAddToCart, isInCart }) => {
    const navigation = useNavigation();
    const [isLiked, setIsLiked] = useState(false);

    const handleItemPress = () => {
        navigation.navigate('ItemDetails', { itemId });
    };

    const handleLikePress = () => {
        setIsLiked(!isLiked);
        console.log(`Item ${itemId} is ${isLiked ? 'liked' : 'unliked'}`);
    };

    const handleAddToCartPress = () => {
        handleAddToCart();
        console.log(`Item ${itemId} is ${isInCart ? 'removed from' : 'added to'} the cart`);
    };

    return (
        <TouchableOpacity onPress={handleItemPress} className="mb-4" style={{ width: '48%' }}>
            <View className="bg-white p-4 items-center rounded-lg shadow-md relative">
                <Image source={itemImage} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />

                <TouchableOpacity onPress={handleLikePress} className="absolute top-2 right-2">
                    <Icon name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? 'red' : 'gray'} />
                </TouchableOpacity>

                <Text className="text-[#151515] font-semibold mt-2">{itemName}</Text>
                <Text className="text-[#DB3C25] mt-1">£{itemPrice}</Text>

                <TouchableOpacity
                    onPress={handleAddToCartPress}
                    style={{ backgroundColor: '#DB3C25', marginTop: 10, padding: 10, paddingHorizontal: 25, borderRadius: 50 }}
                >
                    <View className="flex-row items-center">
                        <Icon name={isInCart ? 'checkmark-done' : 'bag-add'} size={20} color="white" />
                        <Text className="ml-1 text-white">{isInCart ? 'Added to Cart' : 'Add to Cart'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default Item;
