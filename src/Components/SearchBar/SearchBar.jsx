import React, { useContext } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { cssColors } from '../../Variavel/Css'
import { ProductContext } from '../../contexts/product'

const SearchBar = ({ searchTerm, searchSet }) => {

    const { isSearchVisible, setIsSearchVisible, setSearchTerm } = useContext(ProductContext)
    
    const  handleClose = () => {
        setIsSearchVisible(false)
        setSearchTerm('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisar produto..."
                    placeholderTextColor={cssColors.placeholder}
                    value={searchTerm}
                    onChangeText={searchSet}
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: cssColors.backgroundProduct,
        paddingHorizontal: 10,

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
    closeButton: {
        position: "absolute",
        top: 10,
        right: 5,
        backgroundColor: cssColors.backgroundCicle ,
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
})

export default SearchBar
