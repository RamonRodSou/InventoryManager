import React, { useContext, useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import CategoryList from './CategoryList';
import { fireBasePost } from '../../FireBaseDB/FireBaseDbProduct';
import { ProductContext } from '../../contexts/product';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from '../../service/fireBaseConecction';

const NewProduct = () => {

  const { name, image, value, qtd, category, setName, setImage, setValue, setQtd, setCategory } = useContext(ProductContext);
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleNameChange = (text) => {
    const formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    setName(formattedText)
  }

  const handleImgChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'É necessário conceder permissão para acessar a biblioteca de mídia.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      console.log('Usuário cancelou a seleção de imagem');
    } else {
      const fileUri = pickerResult.assets[0].uri;
      const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, await convertToBlob(fileUri));

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progresso do upload: ${progress}%`);
        },
        (error) => {
          console.error('Erro durante o upload:', error);
          alert('Erro durante o upload: ' + error.message);
        },
        () => {
          console.log('Upload completo!');
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('URL da imagem após o upload:', downloadURL);
              setImage(downloadURL);
            })
            .catch((error) => {
              console.error('Erro ao obter a URL da imagem:', error);
              alert('Erro ao obter a URL da imagem: ' + error.message);
            });
        }
      );
    }
  };

  useEffect(() => {
    console.log('Valor atualizado de image:', image);
  }, [image]);

  const convertToBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const handleValueChange = (text) => {
    setValue(text)
  }

  const handleQtdChange = (text) => {
    setQtd(text)
  }

  const handleSelectCategory = (text) => {
    setCategory(text)
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);

    if (!name || !image || !value || !qtd || !category) {

      Alert.alert('Todos os campos são obrigatórios.');

      return;
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
    setQtd('')
    setValue('')
  }

  const resetFields = () => {
    setName('')
    setImage(null)
    setQtd('')
    setValue('')
  }

  useFocusEffect(
    React.useCallback(() => {
      resetFields();
    }, []))

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.container_Input}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do produto"
            value={name}
            onChangeText={handleNameChange}
          />
        </View>

        <TouchableOpacity style={styles.container_Input} onPress={handleImgChange}>
          <Text style={styles.label}>Foto:</Text>
          <View style={styles.imageButton}>
            {image ? (
              <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text style={styles.imageButtonText}>Escolher imagem</Text>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.container_Input}>
          <Text style={styles.label}>Valor:</Text>
          <TextInput
            style={styles.input}
            placeholder="Coloque o preço"
            value={value}
            onChangeText={handleValueChange}
            keyboardType="numeric"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.container_Input}>
          <Text style={styles.label}>Quantidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Coloque a quantidade"
            value={qtd}
            onChangeText={handleQtdChange}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </View>

        <CategoryList onSelectCategory={handleSelectCategory} />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fefefe',

  },
  container_Input: {
    width: '100%',

  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#f77d48'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
    borderRadius: 5,
    color: '#40cfff'

  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    width: 300,
    height: 450,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  close: {
    position: 'absolute',
    width: 30,
    height: 30,
    padding: 1
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 8,
  },

  imageButton: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 5,
  },
  imageButtonText: {
    color: '#40cfff',
    fontSize: 16,
  },

})

export default NewProduct