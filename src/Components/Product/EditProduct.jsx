import React, { useContext } from 'react'
import { View, Text, Modal, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native'
import { fireBaseDelete, fireBaseUpdate } from '../../FireBaseDB/FireBaseDbProduct'
import { ProductContext } from '../../contexts/product'
import { cssColors } from '../../Variavel/Css'
import Btn from '../Btn/Btn'
import ExcluirConfirm from '../ExcluirConfirm/ExcluirConfirm'
import ProductImage from '../ProductImage/ProductImage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function EditProduct({ productId, onClose}) {

  const { name, value, qtd, setName, image, setImage, setValue, setQtd, product, setProduct, confirmDeleteVisible, setConfirmDeleteVisible,
     setProductToDelete, productToDelete } = useContext(ProductContext)
    
  const handleEditProduct = () => {
    if (!name || !value || !qtd) {
      Alert.alert('Todos os campos são obrigatórios.')
      return
    }

    fireBaseUpdate(
      productId,
      name,
      image,
      value,
      qtd,
    )

    setName('')
    setImage(null)
    setQtd(null)
    setValue('')
    onClose()

  }

  const handleClose = (e) => {
    setName('')
    setQtd(null)
    setValue('')
    onClose()
  }

  const handleNameChange = (text) => {
    setName(text)
  }

  const handleValueChange = (text) => {
    setValue(text)
  }

  const handleQtdChange = (num) => {
    setQtd(num)
  }

  const handleDelete = (productId) => {
    setProductToDelete(productId)
    setConfirmDeleteVisible(true)
  }

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      fireBaseDelete(productToDelete)
      setProduct(product.filter(prod => prod.id !== productToDelete))
      handleClose()
    }
    cancelDeleteProduct()
  }

  const cancelDeleteProduct = () => {
    setConfirmDeleteVisible(false)
    setProductToDelete(null)
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

        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView>

          <View style={styles.container_Input} >
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do produto"
              placeholderTextColor={cssColors.placeholder}
              value={name}
              onChangeText={handleNameChange}
            />
          </View>

          <ProductImage setImage={setImage} image={image} borderColor={ cssColors.backgroundCicle}/>

          <View style={styles.container_Input}>
            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o preço"
              placeholderTextColor={cssColors.placeholder}
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
              placeholder="Digite a quantidade"
              placeholderTextColor={cssColors.placeholder}
              value={qtd !== null ? qtd.toString() : ''}
              onChangeText={handleQtdChange}
              autoCapitalize="none"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Btn name={'Salvar'} OnP={handleEditProduct} style={styles.BtnsSyle}/>
            <Btn name={'Excluir'} OnP={() => handleDelete(productId)} style={styles.BtnsSyle}/>
          </View>
          </KeyboardAwareScrollView>

        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmDeleteVisible}
          onRequestClose={() => setConfirmDeleteVisible(false)}
        >
            <ExcluirConfirm Msg={'Deseja realmente excluir o produto?'} OnPCancel={cancelDeleteProduct} OnPConfirm={confirmDeleteProduct} />
  
        </Modal>
      </View>

    </Modal>
    
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
    backgroundColor: cssColors.backgroundProduct,
    justifyContent: 'center'
  },
  container_Input: {
    width: '100%',

  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: cssColors.blue,
  },
  input: {
    height: 40,
    borderColor: cssColors.backgroundCicle,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
    borderRadius: 5,
    color: cssColors.text
  },
  buttonsContainer: {
    
    width:'100%',
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    
    gap: 10,
  },
  closeButton: {
    position: "absolute",
    top: -10,
    right: -5,
    backgroundColor: cssColors.btn,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  BtnsSyle:{
  width:'40%',  
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
  
})


