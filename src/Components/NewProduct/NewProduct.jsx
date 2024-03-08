import React, { useContext, useEffect } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native'
import CategorySelect from '../Category/CategorySelect'
import { fireBasePost } from '../../FireBaseDB/FireBaseDbProduct'
import { ProductContext } from '../../contexts/product'
import { useFocusEffect } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from '../../service/fireBaseConecction'
import { cssColors } from '../../Variavel/Css'
import Btn from '../Btn/Btn'
import { LinearGradient } from 'expo-linear-gradient';
const NewProduct = () => {

  const { name, image, value, qtd, category, setName, setImage, setValue, setQtd, setCategory, formSubmitted, setFormSubmitted } = useContext(ProductContext)

  const handleNameChange = (text) => {
    const formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    setName(formattedText)
  }

  const handleImgChange = async (isFromGallery) => {
    let pickerResult;
    if (isFromGallery) {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (permissionResult.granted === false) {
        Alert.alert('Permissão necessária', 'É necessário conceder permissão para acessar a biblioteca de mídia.')
        return
      }
      pickerResult = await ImagePicker.launchImageLibraryAsync()
    } else {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
      if (permissionResult.granted === false) {
        Alert.alert('Permissão necessária', 'É necessário conceder permissão para acessar a câmera.')
        return
      }
      pickerResult = await ImagePicker.launchCameraAsync()
    }

    if (pickerResult.canceled === true) {
      console.log('Usuário cancelou a seleção de imagem')
    } else {
      const fileUri = pickerResult.assets[0].uri
      const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1)
      const storageRef = ref(storage, `images/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, await convertToBlob(fileUri))

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Progresso do upload: ${progress}%`)
        },
        (error) => {
          console.error('Erro durante o upload:', error)
          alert('Erro durante o upload: ' + error.message)
        },
        () => {
          console.log('Upload completo!')
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('URL da imagem após o upload:', downloadURL)
              setImage(downloadURL)
            })
            .catch((error) => {
              console.error('Erro ao obter a URL da imagem:', error)
              alert('Erro ao obter a URL da imagem: ' + error.message)
            })
        }
      )
    }
  }

  useEffect(() => {
    console.log('Valor atualizado de image:', image)
  }, [image])

  const convertToBlob = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    return blob
  }

  const handleValueChange = (text) => {
    setValue(text)
  }

  const handleQtdChange = (text) => {
    setQtd(text)
  }

  const handleSubmit = async () => {
    setFormSubmitted(true)

    if (!name || !image || !value || !qtd || !category) {

      Alert.alert('Todos os campos são obrigatórios.')

      return
    }

    fireBasePost(
      name,
      image,
      value,
      qtd,
      category
    )

    setName('')
    setImage(null)
    setQtd(null)
    setValue('')
  }

  const resetFields = () => {
    setName('')
    setImage(null)
    setQtd(null)
    setValue('')
  }

  useFocusEffect(
    React.useCallback(() => {
      resetFields()
    }, []))

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient 
        colors={cssColors.gradient}
        style={[styles.container, styles.transparentBackground]}>
          <View style={styles.container_Input}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do produto"
              placeholderTextColor={cssColors.placeholder}
              value={name}
              onChangeText={handleNameChange}
            />
          </View>

          <View style={styles.containerImg}>
            {image ? (
              <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />

            ) : (
              <View style={styles.containerBtnImg}>
                <Btn name={'Tirar Foto'} OnP={() => handleImgChange(false)} />
                <Btn name={'Escolher da Galeria'} OnP={() => handleImgChange(true)} />
              </View>
            )}
          </View>

          <View style={styles.container_Input}>
            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o preço"
              value={value}
              onChangeText={handleValueChange}
              placeholderTextColor={cssColors.placeholder}
              keyboardType="numeric"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.container_Input}>
            <Text style={styles.label}>Quantidade:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a quantidade"
              placeholderTextColor={cssColors.placeholder}
              value={qtd}
              onChangeText={handleQtdChange}
              autoCapitalize="none"
              keyboardType="numeric"
            />
          </View>

          <CategorySelect />
          <Btn OnP={handleSubmit} name={'Enviar'} />
      </LinearGradient>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: cssColors.gradientColors,

  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  container_Input: {
    width: '100%',

  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: cssColors.Label,
    shadowColor:'#000',
    textShadowRadius:10,
    shadowOffset:{width:-1,height:9},
    elevation:8,
  },
  input: {
    height: 40,
    borderColor: cssColors.input,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
    borderRadius: 5,
    color: cssColors.text,
    backgroundColor: cssColors.backgroundProduct,


  },

  imageButton: {
    backgroundColor: cssColors.orange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  containerImg: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: cssColors.input,
    borderRadius: 5,
    backgroundColor: cssColors.backgroundProduct,
  },
  containerBtnImg: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  }
})

export default NewProduct