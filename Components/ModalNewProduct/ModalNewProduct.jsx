// import React, { useState } from 'react'
// import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
// import CameraImg from '../Camera/Camera';


// const ModalNewProduct = () => {
  
//   const [name, setName] = useState('')
//   const [image, setImage] = useState('')
//   const [value, setValue] = useState('')
//   const [qtd, setQtd] = useState('')
//   const [isCameraVisible, setIsCameraVisible] = useState(false);

//   const handleNameChange = (text) => {
//     setName(text)
//   }

//   const handleImgChange = (photo) => {
//     setImage(photo.uri);
//   };

//   const handleOpenCamera = () => {
//     setIsCameraVisible(true);
//   };

//   const handleCloseCamera = () => {
//     setIsCameraVisible(false);
//   };

//   const handleValueChange = (text) => {
//     setValue(text)
//   }
//   const handleQtdChange = (text) => {
//     setQtd(text)
//   }

//   const handleSubmit = () => {
//     Alert.alert(`O nome é ${name}, Foto: ${image}, valor:  ${value}, Qtd:  ${qtd}`)
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.container_Input}>
//         <Text style={styles.label}>Nome:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Digite o nome do produto"
//           value={name}
//           onChangeText={handleNameChange}
//         />
//       </View>
      
//       <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
//         <Text style={styles.buttonText}>Abrir Câmera</Text>
//       </TouchableOpacity>

//       <View style={styles.container_Input}>
//         <Text style={styles.label}>Valor:</Text> 
//         <TextInput
//           style={styles.input}
//           placeholder="Coloque o preço"
//           value={value}
//           onChangeText={handleValueChange}
//           keyboardType="image-address"
//           autoCapitalize="none"
//         />
//       </View>
//       <View style={styles.container_Input}>
//         <Text style={styles.label}>Quantidade:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Coloque a quantidade"
//           value={qtd}
//           onChangeText={handleQtdChange}
//           keyboardType="image-address"
//           autoCapitalize="none"
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Enviar</Text>
//       </TouchableOpacity>
//       {isCameraVisible && (
//         <CameraImg onPictureTaken={handleImgChange} onClose={handleCloseCamera} />
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   container_Input: {
//     width:'100%',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingLeft: 8,
//     paddingRight: 8,
//     width: '100%',
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     width:'100%',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//     width:'100%',

//   },
// })

// export default ModalNewProduct



import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import CameraImg from '../Camera/Camera';


const ModalNewProduct = () => {
  
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [value, setValue] = useState('')
  const [qtd, setQtd] = useState('')

  const [modalVisible, setModalVisible] = useState(false);

  const handleNameChange = (text) => {
    setName(text)
  }

  const handleImgChange = (photo) => {
    setImage(photo.uri);
  };

  const handleOpenCamera = () => {
    modalVisible(true);
  };

  const handleCloseCamera = () => {
    setModalVisible(false);
  };



  const handleValueChange = (text) => {
    setValue(text)
  }
  const handleQtdChange = (text) => {
    setQtd(text)
  }

  const handleSubmit = () => {
    Alert.alert(`O nome é ${name}, Foto: ${image}, valor:  ${value}, Qtd:  ${qtd}`)
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
        />
      </View>
      
      <TouchableOpacity 
               style={styles.button}
                onPress={handleOpenCamera}
            >
        <Text style={styles.buttonText}>Abrir Câmera</Text>
      </TouchableOpacity>

      <View style={styles.container_Input}>
        <Text style={styles.label}>Valor:</Text> 
        <TextInput
          style={styles.input}
          placeholder="Coloque o preço"
          value={value}
          onChangeText={handleValueChange}
          keyboardType="image-address"
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
          keyboardType="image-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseCamera}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={handleCloseCamera}>
 
                        </TouchableOpacity>
                        <CameraImg/>
                    </View>
                </View>
            </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container_Input: {
    width:'100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
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
    right:10,
    padding: 10
}
})

export default ModalNewProduct