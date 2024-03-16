import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import handleImgChange from '../../JavaScript/Image'
import Btn from '../Btn/Btn'
import { cssColors } from '../../Variavel/Css'

const ProductImage = ({ image, setImage, borderColor }) => {

  return (
    <View style={[styles.containerImg, { borderColor: borderColor }]}>
      {image ? (
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />

      ) : (
        <View style={styles.containerBtnImg}>
          <Btn name={'Tirar Foto'} OnP={() => handleImgChange(false, setImage, image)} />
          <Btn name={'Escolher da Galeria'} OnP={() => handleImgChange(true, setImage, image)} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerImg: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: cssColors.backgroundProduct,
  },
  containerBtnImg: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    width: '50%',
  }
})
export default ProductImage