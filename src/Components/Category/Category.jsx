import React, { useContext, useEffect } from 'react'
import {  Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductContext } from '../../contexts/product';
import { fireBaseDeleteCategory, fireBaseGetCategory } from '../../FireBaseDB/FireBaseDbCategory';
import { cssColors } from '../../Variavel/Css';
import ExcluirConfirm from '../ExcluirConfirm/ExcluirConfirm';
import MiniIconDelete from '../MiniIcon/MiniIconDelete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Category = () => {

    const { categories, setCategories, setCategory, setSelectedCategory, setModalVisible, setConfirmDeleteVisible,
        confirmDeleteVisible, setCategoryToDelete, editCategory, categoryToDelete } = useContext(ProductContext);

    const chooseCategory = (category) => {
        setSelectedCategory(category);
        setModalVisible(false);
        setCategory(category)
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


    useEffect(() => {
        fireBaseGetCategory(setCategories);
    }, []);

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.modalContainer}>
                <ScrollView>
                    {categories.map((item) => (
                        <View key={item.id} style={styles.selectOrdeleteCategory}>
                            <TouchableOpacity
                                style={styles.selectCategory}
                                onPress={() => chooseCategory(item)} >
                                <Text style={styles.modalText}>{item.nameCategory}</Text>
                            </TouchableOpacity>

                            {!editCategory ? (
                                <>
                                </>
                            ) : (
                                <MiniIconDelete handleDelete={() => {
                                    setCategoryToDelete(item);
                                    setConfirmDeleteVisible(true);
                                }} deletImg={true} />
                            )}
                        </View>
                    ))}
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={confirmDeleteVisible}
                    onRequestClose={() => setConfirmDeleteVisible(false)}
                >
                    <ExcluirConfirm Msg={'Deseja realmente excluir a categoria?'} OnPCancel={cancelDeleteCategory} OnPConfirm={confirmDeleteCategory} />
                </Modal>
            </View>
        </KeyboardAwareScrollView>

    )
}
const styles = StyleSheet.create({

    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',

    },
    selectOrdeleteCategory: {
        alignItems: "center",
        justifyContent: 'center',
        gap: 20,
        flexDirection: "row",
        width: '100%',
        borderColor:cssColors.backgroundCicle,
        backgroundColor:cssColors.backgroundProduct,
        borderWidth:1,
        borderRadius:10,
        paddingVertical:2,
        marginBottom:5,
    },
    selectCategory: {
        width: '80%',
    },
    modalText: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 3,
        paddingHorizontal: 20,
        fontSize: 18,
        color: cssColors.placeholder,
        borderColor: cssColors.orange,
        borderWidth: .7,
        margin: 1,
        borderRadius: 5,
        width: '100%',
    },
    touchButton: {
        padding: 1,
    },
    image: {
        width: 26,
        height: 26
    },

})

export default Category