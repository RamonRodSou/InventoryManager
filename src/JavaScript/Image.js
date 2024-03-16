import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from '../service/fireBaseConecction'

const handleImgChange = async (isFromGallery, setImage) => {

  const convertToBlob = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    return blob
  }

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

export default handleImgChange