import React, { useEffect } from 'react'
import { Text } from 'react-native'
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomeScreen');
        }, 3000);
    }, []);

    return (
        <Animatable.View className="flex-1 items-center justify-center bg-[#DB3C25]" duration={3000} animation="fadeOut">
            <Text className="text-black font-extrabold text-3xl">TOBAMS 🎉</Text>
        </Animatable.View>
    )
}

export default SplashScreen