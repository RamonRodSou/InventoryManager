import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

const CategoryList = ({onSelectCategory}) => {
    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        axios.get('https://my-json-server.typicode.com/RamonRodSou/GerenteAppBD/Category/')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log('Ocorreu um erro: ', error);
            });
    }, []);

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setModalVisible(false);
        onSelectCategory(category)
    };

    return (
        <View style={styles.container_Input}>
            <Text style={styles.label}>Selecionar Categoria: </Text>
            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                {!selectedCategory ? (
                    <>
                        <Text style={{ color:'#40cfff' }}>Clique para escolher...</Text>
                        <Icon name="chevron-down" size={20} color="#2a2a2a" />
                    </>
                ) : (
                    <Text style={{ color:'#40cfff' }}>{selectedCategory.nameCategory}</Text>
                )}
            </TouchableOpacity>
            <Modal  
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
               <View style={styles.modalContainerFull}>
                   <View style={styles.modalContainer}>
                       <FlatList
                           style={styles.modalContent}
                           data={categories}
                           renderItem={({ item }) => (
                               <TouchableOpacity onPress={() => selectCategory(item)}>
                                   <Text style={styles.modalText}>{item.nameCategory}</Text>
                               </TouchableOpacity>
                           )}
                           keyExtractor={(item) => item.id.toString()}
                       />
                   </View>
               </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container_Input: {
        width:'100%',
        marginTop:10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color:'#f77d48',

    },
    modalContainerFull: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // cor de fundo com transparência
    },
    modalContainer: {
        top:'50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        width:'80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalText: {
        textAlign:'center',
        padding:2,
        fontSize:18,
        color:'#40cfff'
    }

});

export default CategoryList;
