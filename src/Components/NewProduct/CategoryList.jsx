import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, TextInput, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fireBaseDeleteCategory, fireBaseGetCategory, fireBasePostCategory } from '../../FireBaseDB/FireBaseDbCategory';
import { useFocusEffect } from '@react-navigation/native';

const removeCat = '../../../assets/Icone/MiniIcon/removeCat.webp'

const CategoryList = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [newCategory, setNewCategory] = useState('');
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handleNewCategory = (text) => {
        const formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
         setNewCategory(formattedText);
    }
    const handleRemoveCategory = (category) => {
        setCategoryToDelete(category)
        setConfirmDeleteVisible(true)
    }
    const confirmDeleteCategory = () => {
        if (categoryToDelete) {
            fireBaseDeleteCategory(categoryToDelete.id);
            setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
        }
        setConfirmDeleteVisible(false);
    }

    const cancelDeleteCategory = () => {
        setCategoryToDelete(null);
        setConfirmDeleteVisible(false);
    }
    const selectCategory = (category) => {
        setSelectedCategory(category);
        setModalVisible(false);
        onSelectCategory(category)
    };
 

    const resetFields = () => {
        setSelectedCategory(null)
    }

    useFocusEffect(
        React.useCallback(() => {
            resetFields();
        }, []))


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

    useEffect(() => {
        fireBaseGetCategory(setCategories);
    }, []);

    return (
        <View style={styles.container_Input}>
            <View style={styles.categoriesOrNew}>
                <Text style={styles.label}>Selecionar Categoria: </Text>

            </View>
            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                {!selectedCategory ? (
                    <>
                        <Text style={{ color: '#40cfff', marginHorizontal:6 }}>Clique para escolher...</Text>
                        <Feather name="chevron-down" size={20} color="#2a2a2a" />
                    </>
                ) : (
                    <Text style={{ color: '#40cfff', marginHorizontal:6  }}>{selectedCategory.nameCategory}</Text>
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
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <FlatList
                            style={styles.modalContent}
                            data={categories}
                            renderItem={({ item }) => (

                                <View style={styles.selectOrdeleteCategory}>
                                    <TouchableOpacity 
                                        style={styles.selectCategory}
                                        onPress={() => selectCategory(item)} >
                                        <Text style={styles.modalText}>{item.nameCategory}</Text>
                                    </TouchableOpacity> 
                                    <TouchableOpacity
                                        style={styles.touchButton}
                                        onPress={ () => {
                                            setCategoryToDelete(item);
                                            setConfirmDeleteVisible(true);
                                        } }
                                    >
                                        <Image
                                            style={styles.image}
                                            source={require(removeCat)}
                                        />
                                    </TouchableOpacity>
                                </View>

                            )}
                            keyExtractor={(item) => item.id}
                        />
                        <View style={styles.newCategoryContainer}>
                            <Text style={styles.newCategoryText}>New Category</Text>
                            <View style={styles.newCategoryInputButton}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nova Categoria"
                                    value={newCategory}
                                    onChangeText={handleNewCategory}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity style={styles.button} onPress={handleSubmitNewCategory}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmDeleteVisible}
                onRequestClose={() => setConfirmDeleteVisible(false)}
            >
                <View style={styles.confirmDeleteContainer}>
                    <View style={styles.confirmDeleteContent}>
                        <Text style={styles.confirmDeleteText}>Deseja realmente excluir a categoria?</Text>
                        <View style={styles.confirmDeleteButtons}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelDeleteCategory}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmDeleteCategory}>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container_Input: {
        width: '100%',
        marginTop: 10,

    },
    closeButton: {
        position: "absolute",
        top: -10,
        right: -5,
        backgroundColor: '#f77d48',
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
    categoriesOrNew: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingVertical: 8,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#f77d48',

    },

    modalContainerFull: {
        flex: 1,
        alignItems: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        top: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,

    },
    modalContent: {
        width:'100%'
    },
    selectOrdeleteCategory:{
        alignItems:"center",
        justifyContent:'space-between',
        flexDirection: "row",
        width:'100%',
    },
    selectCategory:{
        width:'80%',

    },
    modalText: {
        flex: 1,
        textAlign: 'center',
        paddingVertical:3,
        paddingHorizontal: 20,
        fontSize: 18,
        color: '#40cfff',
        borderColor: '#f77d48',
        borderWidth: .7,
        margin: 1,
        borderRadius: 5,
        width:'100%',


    },
    newCategoryContainer: {
        marginTop: 25,
        width: '100%',

    },
    newCategoryText: {
        fontSize: 16,
        color: '#f77d48',

    },
    newCategoryInputButton: {
    },
    input: {
        height: 40,
        borderColor: '#f77d48',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
        color: '#40cfff'

    },
    button: {
        backgroundColor: '#f77d48',
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',

    },

    touchButton: {

        padding: 1,

    },
    image: {
        width: 26,
        height: 26
    },

    confirmDeleteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    confirmDeleteContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    confirmDeleteText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    confirmDeleteButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
    },

});

export default CategoryList;
