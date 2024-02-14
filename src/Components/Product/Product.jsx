import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MiniIcon from "../MiniIcon/MiniIcon";
import getList from "../../service/getList";
import { url } from "../../service/api";

export default function Product() {


    const handleMoreProduct = () => {
    }

    const handleLessProduct = () => {
    }


    const productData = getList(url.product);
    const categoryData = getList(url.category);

    const { data: product} = productData;
    const { data: category} = categoryData;

    // console.log(`Aqui esta os produtos ${product}`)
    
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
                                        <Text style={styles.texto}>{product.name}</Text>
                                        <Text style={styles.texto}>R$:{product.value}</Text>
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
        borderColor: '#ed7e4b',
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
        color: '#ed7e4b',
        zIndex: 2

    },
    imagem: {
        width: 85,
        height: 100
    },
    texto: {
        fontSize: 20,
        color: '#2499c7',
    }
});
