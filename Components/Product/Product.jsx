import React, { useReducer, useState } from "react";
import {Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MiniIcon from "../MiniIcon/MiniIcon";

const product1 = '../../assets/Product/P1.webp'
const product2 = '../../assets/Product/C1.webp'


export default function Product () {

    // const [ addProduct, setAddProduct] = useState(0)

    // const handleMoreProduct = () => {
    //     setAddProduct(prevProduct => prevProduct + 1)
    // }

    // const handleLessProduct = () => {
    //     setAddProduct(prevProduct => Math.max(0, prevProduct - 1))
    // }

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
    
    const [addProduct, dispatch] = useReducer(reducer, 0)
    
    const handleMoreProduct = () => {
        dispatch({ type: 'INCREMENT' })
    }
    
    const handleLessProduct = () => {
        dispatch({ type: 'DECREMENT' })
    }

    


    return (
        <View style={styles.productSec}>
            <ScrollView  
                    showsVerticalScrollIndicator={false}
                    horizontal={false}

                > 
                <View style={styles.container}>
                    <Text style={styles.title}> Promoção</Text>
                    <ScrollView  
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                    > 
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                            <MiniIcon 
                                handleMoreProduct={ () => handleMoreProduct()} 
                                handleLessProduct={ () => handleLessProduct()}/>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                            <MiniIcon/>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                            <MiniIcon/>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                            <MiniIcon/>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                            <MiniIcon/>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                            <MiniIcon/>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}> Perfume</Text>
                    <ScrollView  
                        //  showsVerticalScrollIndicator={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                    > 
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>Glamour Just Shine</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>Glamour Just Shine</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>Glamour Just Shine</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>Glamour Just Shine</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>Glamour Just Shine</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product1)}
                            />
                            <Text>Glamour Just Shine</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}> Creme</Text>
                    <ScrollView  
                        //  showsVerticalScrollIndicator={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                    > 
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                        <View style={styles.product}>
                            <Text style={styles.productQTD}>{addProduct}</Text>
                            <Image 
                            style={styles.imagem}
                            source={require(product2)}
                            />
                            <Text>lily lumiere</Text>
                            <Text style={{fontSize:20}}>R$35,90</Text>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView> 
        </View>
    )
}

const styles = StyleSheet.create({

    productSec: {
    },
    container: {
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:6
    },
    title: {
        fontSize:30,
        marginBottom:16,
    },
    product: {
        justifyContent:'space-around',
        alignItems:'center',
        padding:10,
        backgroundColor:'#fefefe',
        borderWidth: 1, 
        borderColor: 'fefefe',
        borderRadius:10,
        
        width:150,
        height:250
    },

    scrollViewContent: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10, 
      },
    productQTD: {
        position:'absolute',
        top:5,
        right:10,
        fontWeight:"bold",
        fontSize:20,
        color:'red',
        zIndex:2
    
    },
    imagem: {
        width: 110,
        height:110
    },
  });
  