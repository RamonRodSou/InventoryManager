import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/product';
import { fireBasePostCategory } from '../../FireBaseDB/FireBaseDbCategory';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Category from './Category';
import { cssColors } from '../../Variavel/Css';
import Btn from '../Btn/Btn';

const CategoryPage = () => {

    const { setFormSubmitted, newCategory, setNewCategory } = useContext(ProductContext);


        
    const handleNewCategory = (text) => {
        const formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        setNewCategory(formattedText);
    }
    const handleSubmitNewCategory = async () => {
        setFormSubmitted(true);
        if (!newCategory) {
            Alert.alert('O campos é obrigatório para add nova categoria.');
            return;
        }

        fireBasePostCategory( 
            newCategory
        )
        setNewCategory('')
    }


    return (
        <View style={styles.container}>
            <Category/>
            <View style={styles.newCategoryContainer}>
                <Text style={styles.newCategoryText}>New Category</Text>
                <View style={styles.newCategoryInputButton}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nova Categoria"
                        placeholderTextColor={cssColors.placeholder}
                        value={newCategory}
                        onChangeText={handleNewCategory}
                        autoCapitalize="none"
                    />
                    <Btn name={'Add'} OnP={handleSubmitNewCategory}/>
                </View>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        justifyContent:"space-between",
        backgroundColor: cssColors.backgroundProduct,
        paddingVertical:10,
        paddingHorizontal:20,
    },  
    newCategoryContainer: {
        marginTop: 25,
        alignItems:'center',
    
    },
    newCategoryText: {
        fontSize: 16,
        color: cssColors.orange,
    },
    newCategoryInputButton: {
        width: '100%',
        gap:10,
    },
    input: {
        height: 40,
        borderColor: cssColors.orange,
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
        color: cssColors.text
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