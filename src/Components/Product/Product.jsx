import React, { useReducer, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MiniIcon from "../MiniIcon/MiniIcon";
import getList from "../../service/getList";
import { url } from "../../service/api";

export default function Product() {

    const reducer = (state, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return Math.max(0, state - 1)
            default:
                return state
        }
    }


    const handleMoreProduct = () => {
        dispatch({ type: 'INCREMENT' })
    }

    const handleLessProduct = () => {
        dispatch({ type: 'DECREMENT' })
    }


    const productData = getList(url.product);
    const categoryData = getList(url.category);

    const { data: product, loading: loadingProduct, error: errorProduct } = productData;
    const { data: category, loading: loagingCategory, error: errorCat } = categoryData;

    if (loadingProduct || loagingCategory) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>)
    }

    if (errorProduct || errorCat) {
        return (
            <View>
                <Text>Error fetching data</Text>
            </View>)
    }

    return (
        <View style={styles.productSec}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal={false}>
                {category.map((category) => (
                    <View style={styles.container} key={category.id}>
                        <Text style={styles.title}>{category.nameCategory}</Text>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            {Array.isArray(product) && product
                                .filter((product) => product.category === category.nameCategory)
                                .map((product) => (
                                    <View style={styles.product} key={product.id}>
                                        <Text style={styles.productQTD}>{product.qtd}</Text>
                                        <Image
                                            style={styles.imagem}
                                            source={{ uri: product.image }}
                                        />
                                        <Text>{product.name}</Text>
                                        <Text style={{ fontSize: 20 }}>R$: {product.value}</Text>
                                        <MiniIcon
                                            handleMoreProduct={() => handleMoreProduct()}
                                            handleLessProduct={() => handleLessProduct()} />
                                    </View>
                                ))}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>
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
        borderColor: '#101066',
        borderRadius: 10,

        width: 150,
        height: 250
    },

    scrollViewContent: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    productQTD: {
        position: 'absolute',
        top: 5,
        right: 10,
        fontWeight: "bold",
        fontSize: 20,
        color: 'red',
        zIndex: 2

    },
    imagem: {
        width: 110,
        height: 110
    },
});

        // <View style={styles.productSec}>
        //     <ScrollView  
        //         showsVerticalScrollIndicator={false}
        //         horizontal={false}> 
        //     {Array.isArray(produtos) && produtos.map((product) => (
        //     <View style={styles.container}>                  
        //         <Text style={styles.title}>{product.category}</Text>
        //         <ScrollView  
        //             showsVerticalScrollIndicator={false}
        //             horizontal={true}
        //             showsHorizontalScrollIndicator={false}
        //             contentContainerStyle={styles.scrollViewContent}
        //         > 
        //             <View style={styles.product} key={product.id}>
        //                 <Text style={styles.productQTD}>{product.qtd}</Text>
        //                 <Image 
        //                 style={styles.imagem}
        //                 source={{ uri: product.image }}
        //                 />
        //                 <Text>{product.name}</Text>
        //                 <Text style={{fontSize:20}}>R$: {product.value}</Text>
        //                 <MiniIcon 
        //                     handleMoreProduct={ () => handleMoreProduct()} 
        //                     handleLessProduct={ () => handleLessProduct()}/>
        //             </View>
        //             </ScrollView>
        //     </View>
        //     ))}
        // </ScrollView> 
        // </View>