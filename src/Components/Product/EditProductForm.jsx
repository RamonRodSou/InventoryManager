import React, { useContext, useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Text} from 'react-native';
import CategoryList from '../NewProduct/CategoryList';
import { fireBaseGet } from '../../FireBaseDB/FireBaseDbProduct';
import { ProductContext } from '../../contexts/product'; 
import { set } from 'mongoose';

const EditProductForm = () => {

    const { name, value, qtd, setName, setValue, setQtd } = useContext(ProductContext);

    const [product, setProduct] = useState([])


    const handleNameChange = (text) => {
        setName(text)
    }

    const handleValueChange = (text) => {
        setValue(text)
    }

    const handleQtdChange = (text) => {
        setQtd(text)
    }


    useEffect(() => {
        fireBaseGet(setProduct)        
    }, []);

    return (
        <View style={styles.container}>
            
            <View style={styles.container_Input} >
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do produto"
                    value={name}
                    onChangeText={handleNameChange}
                    keyboardType="text"
                />
            </View>

            <View style={styles.container_Input}>
                <Text style={styles.label}>Valor:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Coloque o preço"
                    value={value}
                    onChangeText={handleValueChange}
                    keyboardType="numeric"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.container_Input}>
                <Text style={styles.label}>Quantidade:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Coloque a quantidade"
                    value={qtd}
                    onChangeText={handleQtdChange}
                    autoCapitalize="none"
                    keyboardType="numeric"
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fefefe',

    },
    container_Input: {
        width: '100%',

    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#f77d48'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        width: '100%',
        borderRadius: 5,
        color: '#40cfff'

    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        width: '100%',

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    modalContent: {
        width: 300,
        height: 450,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    close: {
        position: 'absolute',
        width: 30,
        height: 30,
        padding: 1
    },
    categoryItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 8,
    },

    imageButton: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 5,
    },
    imageButtonText: {
        color: '#40cfff',
        fontSize: 16,
    },

})

export default EditProductForm