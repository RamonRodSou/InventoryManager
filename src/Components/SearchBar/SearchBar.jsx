import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { cssColors } from '../../Variavel/Css';

const SearchBar = ({searchTerm, setSearchTerm}) => {    

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisar produto..."
                    placeholderTextColor={cssColors.placeholder}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    autoCapitalize="none"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: cssColors.backgroundProduct,
        borderColor: cssColors.blue,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderRadius: 20,
    },
    searchBar: {
        paddingHorizontal: 5,
        paddingVertical: 5,

    },
    input: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        color: cssColors.text,
        backgroundColor: cssColors.backgroundProduct,
    },
});

export default SearchBar;
