import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ItemDetailsScreen = ({ route }) => {
    const { itemId } = route.params;

    const itemDetails = {
        itemName: 'Chicken Stew',
        itemPrice: 30,
        itemImage: require('../assets/image1.png'),
        description: 'Rare Eat Puff Puff Mix can be made into a deep-fried dough. They are made from yeast dough, shaped into balls and deep-fried until golden brown. It has a doughnut-like texture but slightly o....Read more',
        ingredients: ['Chicken', 'Spices', 'Vegetables'],
        nutritionalInfo: '...',
        dietaryInfo: '...',
        storageInfo: '...',
        extraInfo: '...',
    };

    const [quantity, setQuantity] = useState(1);
    const [showIngredients, setShowIngredients] = useState(false);
    const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);
    const [showDietaryInfo, setShowDietaryInfo] = useState(false);
    const [showStorageInfo, setShowStorageInfo] = useState(false);
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        console.log(`Item ${itemId} added to cart with quantity ${quantity}`);
    };

    const handleSubscribeToPlan = () => {
    };

    return (
        <ScrollView className="flex-1 bg-[#F9F9F9] p-4 pt-20">
            <Image source={itemDetails.itemImage} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />

            <View className="mt-4">
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-2xl font-bold">{itemDetails.itemName}</Text>
                    <Text className="text-lg mt-2 text-[#DB3C25]">£{itemDetails.itemPrice}</Text>
                </View>
                <Text className="text-md mt-2 mb-14 text-base">{itemDetails.description}</Text>
            </View>

            {renderDropdown('Ingredients', itemDetails.ingredients, showIngredients, setShowIngredients)}

            {renderDropdown('Nutritional Information', [itemDetails.nutritionalInfo], showNutritionalInfo, setShowNutritionalInfo)}

            {renderDropdown('Dietary Information', [itemDetails.dietaryInfo], showDietaryInfo, setShowDietaryInfo)}

            {renderDropdown('Storage Information', [itemDetails.storageInfo], showStorageInfo, setShowStorageInfo)}

            {renderDropdown('Extra', [itemDetails.extraInfo], showExtraInfo, setShowExtraInfo)}

            <View className="flex-row items-center mt-4 justify-between">
                <TouchableOpacity onPress={handleDecrement}>
                    <Text className="bg-white text-black text-2xl p-2"> - </Text>
                </TouchableOpacity>
                <Text className="text-xl p-2">{quantity}</Text>
                <TouchableOpacity onPress={handleIncrement}>
                    <Text className="bg-white text-black text-2xl p-2"> + </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleAddToCart}
                style={{ backgroundColor: '#DB3C25', marginTop: 10, padding: 13, borderRadius: 50, alignItems: 'center' }}
            >
                <View className="flex-row items-center">
                    <Text className="text-white  font-bold text-base">Add to Cart</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSubscribeToPlan}
                style={{ marginTop: 10, padding: 13, borderRadius: 50, alignItems: 'center', borderColor: '#DB3C25', marginBottom: 10 }}
            >
                <View className="flex-row items-center">
                    <Text className="text-[#DB3C25] font-bold text-base">Subscribe to Plan</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const renderDropdown = (title, content, show, setShow) => (
    <View className="py-5 mt border-t border-gray-300">
        <TouchableOpacity onPress={() => setShow(!show)} className="flex-row items-center justify-between">
            <Text className="text-lg">{title}</Text>
            <Icon name={show ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
        </TouchableOpacity>
        {show && (
            <View className="mt-2">
                {content.map((item, index) => (
                    <Text key={index} className="mt-2">{item}</Text>
                ))}
            </View>
        )}
    </View>
);

export default ItemDetailsScreen;
