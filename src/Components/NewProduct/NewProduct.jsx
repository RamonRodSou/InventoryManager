import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Modal, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import postList from '../../service/postList';
import CategoryList from './CategoryList';

const close = '../../../assets/Icone/close.png'


const NewProduct = () => {
  
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [value, setValue] = useState('')
  const [qtd, setQtd] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)


  

  const handleNameChange = (text) => {
    setName(text)
  }

  const handleImgChange = (photo) => {
    const options = {
      title: 'Escolha uma imagem',
      storageOptions: {
          skipBackup: true,
          path: 'images',
      },
  };

  ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
          console.log('Usuário cancelou a seleção de imagem');
      } else if (response.error) {
          console.log('Erro ao selecionar imagem: ', response.error);
      } else {
          // Aqui response.uri contém a URI da imagem selecionada
          setImage(response.uri);
      }
  });
  };

  // const handleOpenCamera = () => {
  //   setModalVisible(true);
  // };

  // const handleCloseCamera = () => {
  //   setModalVisible(false);
  // };

  const handleValueChange = (text) => {
    setValue(text)
  }

  const handleQtdChange = (text) => {
    setQtd(text)
  }

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
};

  const handleSubmit = async () => {
    setFormSubmitted(true);

    if (!name || !image || !value || !qtd || !selectedCategory) {

      Alert.alert('Todos os campos são obrigatórios.');

    return;
  }
      const dados = {
        name : name ,
        image : image,
        value : value,
        qtd : qtd,
        selectedCategory : selectedCategory
      }

      const urlProduct = url.product
      postList(urlProduct, dados)
      Alert.alert(`O nome é ${name}, Foto: ${image}, valor:  ${value}, Qtd:  ${qtd} ,category: ${selectedCategory}`)

  }

  return (
    <View style={styles.container}>
      <View style={styles.container_Input}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do produto"
          value={name}
          onChangeText={handleNameChange}
          keyboardType="name-phone-pad"

        />
      </View>

      {/* <View style={styles.container_Input}>
        <Text style={styles.label}>Foto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Coloque a foto do produto"
          value={image}
          onChangeText={handleImgChange}
          keyboardType="url"

        />
      </View> */}
      
      <TouchableOpacity style={styles.container_Input} onPress={handleImgChange}>
        <Text style={styles.label}>Foto:</Text>
          <View style={styles.imageButton}>
              {image ? (
                  <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
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

      <CategoryList onSelectCategory={handleSelectCategory}/>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
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
    width:'100%',

  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color:'#f77d48'
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
    color:'#40cfff'

  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width:'100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width:'100%',

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
    position:'absolute',
    width:30,
    height:30,
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