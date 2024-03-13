import React, { useContext, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { deleteImage, getAllImages } from '../../FireBaseDB/FireBaseAllImages'
import MiniIconDelete from '../MiniIcon/MiniIconDelete'
import { cssColors } from '../../Variavel/Css'
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ProductContext } from '../../contexts/product'

const Galery = () => {

    const { imageUrls, setImageUrls } = useContext(ProductContext)
    
    const handleDeleteImage = async (imageUrl) => {
        try {
            await deleteImage(imageUrl)
            setImageUrls(imageUrls.filter(url => url !== imageUrl))
        } catch (error) {
            console.error('Erro ao excluir imagem:', error)
        }
    }

    useEffect(() => {
        async function fetchImages() {
            try {
                const images = await getAllImages()
                setImageUrls(images)
            } catch (error) {
                console.error('Erro ao buscar imagens:', error)
            }
        }

        fetchImages()
    }, [])

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient colors={cssColors.gradientColors} style={[styles.container, styles.transparentBackground]}>
                {imageUrls.map((imageUrl, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <TouchableOpacity style={styles.imageTouchable} onPress={() => handleDeleteImage(imageUrl)}>
                            <Image style={styles.image} source={{ uri: imageUrl }} />
                        </TouchableOpacity>
                        <View style={styles.excluirImage}>
                            <MiniIconDelete handleDelete={() => handleDeleteImage(imageUrl)} miniIconStyle={styles.miniIconStyle} />
                        </View>
                    </View>
                ))}
            </LinearGradient>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    transparentBackground: {
        backgroundColor: 'transparent',
    },
    imageContainer: {
        margin: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    miniIconStyle: {

    },
    excluirImage: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: cssColors.backgroundCicle,
        borderRadius: 50,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,

    },

})
export default Galery
