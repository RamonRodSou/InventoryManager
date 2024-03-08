import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { deleteImage, getAllImages } from '../../FireBaseDB/FireBaseAllImages';
import MiniIconDelete from '../MiniIcon/MiniIconDelete';
import { cssColors } from '../../Variavel/Css';

const Galery = () => {

    const [imageUrls, setImageUrls] = useState([])

    const handleDeleteImage =  (imageUrl) => {
        deleteImage(imageUrl);
        console.log(imageUrl)
    };

    useEffect(() => {
        async function fetchImages() {
            const images = await getAllImages();
            setImageUrls(images);
        }

        fetchImages();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                {imageUrls.map((imageUrl, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.imageContainer}
                    >   
                        <View style={styles.excluirImage}>
                            <MiniIconDelete handleDelete={() => handleDeleteImage(imageUrl)} miniIconStyle={styles.miniIconStyle}/>
                        </View>
                        <Image style={styles.image} source={{ uri: imageUrl }} />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    imageContainer: {
        margin: 5,
    }, 
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    miniIconStyle:{

    },
    excluirImage:{
        position:'absolute',
        top:-5,
        right:-5,
        backgroundColor: cssColors.backgroundCicle,
        borderRadius: 50,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1,

    },

});
export default Galery;
