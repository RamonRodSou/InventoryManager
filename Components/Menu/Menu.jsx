import React, { useState } from "react";
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalNewProduct from "../ModalNewProduct/ModalNewProduct";

const home = '../../assets/Icone/home.png'
const add = '../../assets/Icone/add.png'
const list = '../../assets/Icone/list.png'
const close = '../../assets/Icone/close.png'



export default function Menu () {

    const [modalVisible, setModalVisible] = useState(false);

    const handleNewProduct = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.imagem}
                source={require(home)}
            />
            <TouchableOpacity 
                style={styles.touchButton} 
                onPress={handleNewProduct}
            >
                <Image 
                    style={styles.add}
                    source={require(add)}
                />
            </TouchableOpacity>
            <Image 
                style={styles.imagem}
                source={require(list)}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={closeModal}>
                        <Image 
                            style={styles.close}
                            source={require(close)}
                        />
                        </TouchableOpacity>
                        <ModalNewProduct/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    imagem: {
        width: 50,
        height:50
    },
    add: {
        width: 65,
        height:65
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
        position:'absolute',
        width:30,
        height:30,
        right:10,
        padding: 10
    }
});