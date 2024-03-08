import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Category from '../Category/Category';
import { ProductContext } from '../../contexts/product';
import { cssColors } from '../../Variavel/Css';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const CategorySelect = () => {

    const { modalVisible, setModalVisible, selectedCategory, setSelectedCategory } = useContext(ProductContext);

    const resetFields = () => {
        setSelectedCategory(null)
    }

    useFocusEffect(
        React.useCallback(() => {
            resetFields();
        }, []))


    return (
        <View style={styles.container_Input}>
            <View style={styles.categoriesOrNew}>
                <Text style={styles.label}>Selecionar Categoria: </Text>
            </View>
            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                {!selectedCategory ? (
                    <>
                        <Text style={{ color: cssColors.placeholder, marginHorizontal: 6 }}>Clique para escolher...</Text>
                        <Feather name="chevron-down" size={20} color="#2a2a2a" />
                    </>
                ) : (
                    <Text style={{ color: '#40cfff', marginHorizontal: 6 }}>{selectedCategory.nameCategory}</Text>
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

                    <View style={styles.modalCategory}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <KeyboardAwareScrollView>
                            <Category/>
                        </KeyboardAwareScrollView>
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
    modalContainerFull: {
        flex: 1,
        alignItems: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCategory: {
        top: '5%',
        width: '60%',
        backgroundColor: cssColors.backgroundProduct,
        borderRadius: 10,
        padding: 20,
        marginBottom:90,

    },
    categoriesOrNew: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,

    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderColor: cssColors.orange,
        borderWidth: 1,
        marginBottom: 16,
        paddingVertical: 8,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'space-between',
        backgroundColor: cssColors.backgroundProduct,

    },

    label: {
        fontSize: 16,
        marginBottom: 8,
        color: cssColors.Label,
    },

    closeButton: {
        position: "absolute",
        top: -10,
        right: -5,
        backgroundColor: cssColors.backgroundCicle,
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
});

export default CategorySelect;



