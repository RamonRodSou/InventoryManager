import React, { useContext, useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import MiniIcon from "../MiniIcon/MiniIcon"
import { fireBaseGet, fireBaseUpdateQuantity } from "../../FireBaseDB/FireBaseDbProduct"
import { fireBaseGetCategory } from "../../FireBaseDB/FireBaseDbCategory"
import EditProduct from "../Product/EditProduct"
import { cssColors } from "../../Variavel/Css"
import { ProductContext } from "../../contexts/product"
import { LinearGradient } from "expo-linear-gradient"
import SearchBar from "../SearchBar/SearchBar"
import { useFocusEffect } from "@react-navigation/native"

export default function Home() {

    const { product, setProduct, categoryD, setCategoryD, editingProductId, setEditingProductId, setName, setImage,
        setValue, setQtd, isSearchVisible, setIsSearchVisible, searchTerm, setSearchTerm } = useContext(ProductContext)
    const [filteredProducts, setFilteredProducts] = useState(product)
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    const handleMoreProduct = (id) => {
        fireBaseUpdateQuantity(id, 1)
    }

    const handleLessProduct = (id) => {
        fireBaseUpdateQuantity(id, -1)
    }

    const handleEdit = (id, name, image, value, qtd) => {
        setEditingProductId(id, name)
        setName(name)
        setImage(image)
        setValue(value)
        setQtd(qtd)
    }

    const handleCloseModal = () => {
        setEditingProductId(null)
    }

    const resetFields = () => {
        setSearchTerm('')
    }

    useEffect(() => {
        fireBaseGetCategory(setCategoryD)
        fireBaseGet(setProduct)
    }, [])

    useEffect(() => {
        const filtered = product.filter((prod) => prod.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredProducts(filtered);
    }, [searchTerm, product])

    useFocusEffect(
        React.useCallback(() => {
            resetFields()
        }, []))

    return (
        <LinearGradient colors={cssColors.gradient} style={[styles.productSec, styles.transparentBackground]}>
            <View  style={styles.homeContainer}>
                <View style={styles.searchContainer}>
                        {isSearchVisible ? (
                            <SearchBar searchTerm={searchTerm} searchSet={setSearchTerm} onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} />
                        ) : (
                            <>
                            </>
                        )}
                </View>
                {isSearchFocused ? null : (
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>

                        {categoryD.map((category) => (
                            filteredProducts.some((prod) => prod.category.nameCategory === category.nameCategory) && (
                                <View style={styles.container} key={category.id}>
                                    <Text style={styles.title}>{category.nameCategory}</Text>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.scrollViewContent}
                                    >
                                        {filteredProducts
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
                                                        handleEdit={() => handleEdit(prod.id, prod.name, prod.image, prod.value, prod.qtd)}
                                                    />
                                                </View>
                                            ))}
                                    </ScrollView>
                                </View>
                            )
                        ))}
                    </ScrollView>
                )}
                {editingProductId && <EditProduct productId={editingProductId} onClose={handleCloseModal} />}
            </View>

        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    productSec: {},
    transparentBackground: {
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
    },
    homeContainer:{
        
    },
    searchContainer:{
        minWidth:'100%'
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,

    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        color: cssColors.title,
        shadowColor: '#000',
        textShadowRadius: 10,
        shadowOffset: { width: -1, height: 9 },
        elevation: 8,
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
        height: 250,
    },
    productTop: {
        position: "absolute",
        top: 0,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '110%',
        marginBottom: 2,
    },
    productImgNameValue: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollViewContent: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    productQTDContainer: {
        marginTop: 2,
        marginLeft: 1,
        backgroundColor: cssColors.backgroundCicle,
        borderRadius: 50,
        minWidth: 35,
        minHeight: 35,
        maxWidth: 100,
        maxHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    deteteImg: {
        backgroundColor: cssColors.backgroundCicle,
        borderRadius: 50,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productQTD: {
        fontWeight: "bold",
        fontSize: 23,
        color: cssColors.title,
        zIndex: 2
    },
    imagem: {
        width: '100%',
        height: 130
    },
    texto: {
        fontSize: 18,
        color: cssColors.text,
    },
    searchBtn: {
        position: "relative",
        backgroundColor: cssColors.backgroundCicle,
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

})
