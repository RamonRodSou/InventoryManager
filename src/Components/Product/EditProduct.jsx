import React, { useContext } from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import { fireBaseUpdate } from '../../FireBaseDB/FireBaseDbProduct';
import { ProductContext } from '../../contexts/product';

export default function EditProduct({ productId, onClose }) {
  const { name, value, qtd, setName, setValue, setQtd } = useContext(ProductContext);

  const handleEditProduct = () => {

    if (!name || !value || !qtd) {

      Alert.alert('Todos os campos são obrigatórios.');

      return;
    }

    fireBaseUpdate(
      productId,
      name,
      value,
      qtd,
      )

    setName('')
    setQtd('')
    setValue('')
    onClose();

  };

  const handleClose = (e) => {
    
    setName('')
    setQtd('')
    setValue('')
    onClose();
  }

  const handleNameChange = (text) => {
    setName(text)
  }

  const handleValueChange = (text) => {
    setValue(text)
  }

  const handleQtdChange = (text) => {
    setQtd(text)
  }
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <View style={styles.container_Input} >
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome do produto"
                value={name}
                onChangeText={handleNameChange}
                keyboardType="name-phone-pad"

              />
            </View>

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
            <View style={styles.buttonsContainer}>
              <Button title="Save" onPress={handleEditProduct} style={styles.button} />
              <Button title="Cancel" onPress={handleClose} style={styles.button} />
          </View>
        </View>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Cor de fundo semi-transparente
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
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
  buttonsContainer: {
    gap:10,
    paddingLeft:10,
    paddingRight:10,
  },
  button: {
  }
});


