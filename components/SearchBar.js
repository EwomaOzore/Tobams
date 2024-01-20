import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <View className="flex-row items-center bg-white p-2 rounded-md shadow-md mb-4">
            <TextInput
                style={{ flex: 1, marginLeft: 8 }}
                placeholder="Search..."
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Icon name="search" size={20} color="#DB3C25" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;