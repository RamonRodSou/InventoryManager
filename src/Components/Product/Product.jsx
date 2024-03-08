import React, { useContext, useEffect } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import MiniIcon from "../MiniIcon/MiniIcon"
import {  fireBaseGet, fireBaseUpdateQuantity } from "../../FireBaseDB/FireBaseDbProduct"
import { fireBaseGetCategory } from "../../FireBaseDB/FireBaseDbCategory"
import EditProduct from "./EditProduct"
import { cssColors } from "../../Variavel/Css"
import { ProductContext } from "../../contexts/product"

export default function Product() {

    const {product, setProduct, categoryD, setCategoryD, editingProductId, setEditingProductId} =  useContext(ProductContext)

    const handleMoreProduct = (id) => {
        fireBaseUpdateQuantity(id, 1)
    }

    const handleLessProduct = (id) => {
        fireBaseUpdateQuantity(id, -1)
    }

    const handleEdit = (id) => {
        setEditingProductId(id)
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
                                            <View style={styles.productQTDContainer}>
                                                <Text style={styles.productQTD}>{prod.qtd}</Text>
                                            </View>
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
        padding: 2
    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        color: cssColors.title,
    },
    product: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: cssColors.backgroundProduct,
        borderWidth: 1,
        borderColor: cssColors.borderProduct,
        borderRadius: 10,
        width: 150,
        height: 250
    },
    productTop: {
        position:"absolute",
        top: 0,
        zIndex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '110%',
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
    productQTDContainer:{
        backgroundColor: cssColors.backgroundCicle,
        borderRadius: 50,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deteteImg:{
        backgroundColor: cssColors.backgroundCicle,
        borderRadius: 50,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productQTD: {
        fontWeight: "bold",
        fontSize: 26,
        color: cssColors.title,
        zIndex: 2
    },
    imagem: {
        width: '100%',
        height: 120
    },
    texto: {
        fontSize: 18,
        color: cssColors.text,
    },

})
