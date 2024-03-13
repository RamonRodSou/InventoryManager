import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/product'
import { fireBasePostCategory } from '../../FireBaseDB/FireBaseDbCategory'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Category from './Category'
import { cssColors } from '../../Variavel/Css'
import Btn from '../Btn/Btn'
import { LinearGradient } from 'expo-linear-gradient'

const CategoryPage = () => {

    const { setFormSubmitted, newCategory, setNewCategory } = useContext(ProductContext)



    const handleNewCategory = (text) => {
        const formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        setNewCategory(formattedText)
    }
    const handleSubmitNewCategory = async () => {
        setFormSubmitted(true)
        if (!newCategory) {
            Alert.alert('O campos é obrigatório para add nova categoria.')
            return
        }

        fireBasePostCategory(
            newCategory
        )
        setNewCategory('')
    }


    return (

        <LinearGradient
            colors={cssColors.gradientColors}
            style={[styles.container, styles.transparentBackground]}>
                <Category />

            <View style={styles.newCategoryContainer}>
                <Text style={styles.newCategoryText}>Nova Category</Text>
                <View style={styles.newCategoryInputButton}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nova Categoria"
                        placeholderTextColor={cssColors.placeholder}
                        value={newCategory}
                        onChangeText={handleNewCategory}
                        autoCapitalize="none"
                    />
                    <Btn name={'Add'} OnP={handleSubmitNewCategory} />
                </View>
            </View>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: cssColors.backgroundProduct,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    transparentBackground: {
        backgroundColor: 'transparent',
    },
    newCategoryContainer: {
        marginTop: 25,
        alignItems: 'center',

    },
    newCategoryText: {
        fontSize: 16,
        color: cssColors.orange,
        shadowColor: '#000',
        textShadowRadius: 10,
        shadowOffset: { width: -1, height: 9 },
        elevation: 8,
    },
    newCategoryInputButton: {
        width: '100%',
        gap: 10,
    },
    input: {
        height: 40,
        borderColor: cssColors.input,
        borderWidth: 1,
        marginBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        width: '100%',
        borderRadius: 5,
        color: cssColors.text,
        backgroundColor: cssColors.backgroundProduct,

    },
    button: {
        backgroundColor: cssColors.orange,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
})

export default CategoryPage