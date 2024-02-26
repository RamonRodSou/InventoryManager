import React, { useEffect, useState } from "react"
import { Image, Modal, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import MiniIcon from "../MiniIcon/MiniIcon"
import { fireBaseDelete, fireBaseGet, fireBaseUpdateQuantity } from "../../FireBaseDB/FireBaseDbProduct"
import { fireBaseGetCategory } from "../../FireBaseDB/FireBaseDbCategory"
import EditProduct from "./EditProduct"
import MiniIconDelete from "../MiniIcon/MiniIconDelete"

export default function Product() {

    const [product, setProduct] = useState([])
    const [categoryD, setCategoryD] = useState([])
    const [editingProductId, setEditingProductId] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

    const handleMoreProduct = (id) => {
        fireBaseUpdateQuantity(id, 1)
    }

    const handleLessProduct = (id) => {
        fireBaseUpdateQuantity(id, -1)
    }

    const handleEdit = (id) => {
        setEditingProductId(id)
    }

    const handleDelete = (id) => {
        setProductToDelete(id)
        setConfirmDeleteVisible(true)
    }

    const confirmDeleteProduct = () => {
        if (productToDelete) {
            fireBaseDelete(productToDelete)
            setProduct(product.filter(prod => prod.id !== productToDelete))
        }
        cancelDeleteProduct()
    }

    const cancelDeleteProduct = () => {
        setConfirmDeleteVisible(false)
        setProductToDelete(null)
    }

    useEffect(() => {
        fireBaseGetCategory(setCategoryD)
        fireBaseGet(setProduct)
    }, [])

    return (
        <View style={styles.productSec}>
            <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
                {categoryD.map((category) => (
                    <View style={styles.container} key={category.id}>
                        <Text style={styles.title}>{category.nameCategory}</Text>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            {Array.isArray(product) && product
                                .filter((prod) => prod.category.nameCategory === category.nameCategory)
                                .map((prod) => (
                                    <View style={styles.product} key={prod.id}>
                                        <View style={styles.productTop}>
                                            <MiniIconDelete handleDelete={() => handleDelete(prod.id)} />
                                            <Text style={styles.productQTD}>{prod.qtd}</Text>
                                        </View>
                                        <View style={styles.productImgNameValue}>
                                            <Image style={styles.imagem} source={{ uri: prod.image }} />
                                            <Text style={styles.texto}>{prod.name}</Text>
                                            <Text style={styles.texto}>R$:{prod.value}</Text>
                                        </View>
                                        <MiniIcon
                                            handleMoreProduct={() => handleMoreProduct(prod.id)}
                                            handleLessProduct={() => handleLessProduct(prod.id)}
                                            handleEdit={() => handleEdit(prod.id)}
                                        />
                                    </View>
                                ))}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>
            <Modal
                animationType="slide"  
                transparent={true}
                visible={confirmDeleteVisible}
                onRequestClose={() => setConfirmDeleteVisible(false)}
            >
                <View style={styles.confirmDeleteContainer}>
                    <View style={styles.confirmDeleteContent}>
                        <Text style={styles.confirmDeleteText}>Deseja realmente excluir o produto?</Text>
                        <View style={styles.confirmDeleteButtons}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelDeleteProduct}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmDeleteProduct}>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {editingProductId && (
                <EditProduct productId={editingProductId} onClose={() => setEditingProductId(null)} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    productSec: {},
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6
    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        color: '#fefefe'
    },
    product: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ed7e4b',
        borderRadius: 10,
        width: 150,
        height: 250
    },
    productTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 2,
    },
    productImgNameValue: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    productQTD: {
        fontWeight: "bold",
        fontSize: 26,
        color: '#ed7e4b',
        zIndex: 2
    },
    imagem: {
        width: 85,
        height: 100
    },
    texto: {
        fontSize: 18,
        color: '#2499c7',
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
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})
