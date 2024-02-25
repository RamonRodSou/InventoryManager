import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MiniIcon from "../MiniIcon/MiniIcon";

import { fireBaseDelete, fireBaseGet, fireBaseUpdateQuantity } from "../../FireBaseDB/FireBaseDbProduct";
import { fireBaseGetCategory } from "../../FireBaseDB/FireBaseDbCategory";
import EditProduct from "./EditProduct";
import MiniIconDelete from "../MiniIcon/MiniIconDelete";

export default function Product() {

    const [product, setProduct] = useState([])
    const [categoryD, setCategoryD] = useState([])
    const [editingProductId, setEditingProductId] = useState(false)

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
        fireBaseDelete(id)
    }

    useEffect(() => {
        fireBaseGetCategory(setCategoryD)
        fireBaseGet(setProduct)
    }, [])


    return (
        <View style={styles.productSec}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal={false}>
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
                                .filter((product) => product.category.nameCategory === category.nameCategory)
                                .map((product) => (
                                    <View style={styles.product} key={product.id}>
                                        <View style={styles.productTop}>
                                            <MiniIconDelete
                                                handleDelete={() => handleDelete(product.id)}
                                            />
                                            <Text style={styles.productQTD}>{product.qtd}</Text>
                                        </View>
                                        <View style={styles.productImgNameValue}>
                                            <Image
                                                style={styles.imagem}
                                                source={{ uri: product.image }}
                                            />
                                            <Text style={styles.texto}>{product.name}</Text>
                                            <Text style={styles.texto}>R$:{product.value}</Text>
                                        </View>
                                        <MiniIcon
                                            handleMoreProduct={() => handleMoreProduct(product.id)}
                                            handleLessProduct={() => handleLessProduct(product.id)}
                                            handleEdit={() => handleEdit(product.id)}
                                        />
                                    </View>
                                ))}
                        </ScrollView>
                    </View>
                ))}

            </ScrollView>
            {editingProductId && (
                <EditProduct
                    productId={editingProductId}
                    onClose={() => setEditingProductId(null)}
                />
            )}
        </View>
    )
}
const styles = StyleSheet.create({

    productSec: {
    },
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
    productTop:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom:2,

    },
    productImgNameValue:{
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
    }
});
