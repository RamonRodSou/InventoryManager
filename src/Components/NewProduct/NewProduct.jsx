import React, { useContext, useEffect } from 'react'
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native'
import CategorySelect from '../Category/CategorySelect'
import { fireBasePost } from '../../FireBaseDB/FireBaseDbProduct'
import { ProductContext } from '../../contexts/product'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { cssColors } from '../../Variavel/Css'
import Btn from '../Btn/Btn'
import { LinearGradient } from 'expo-linear-gradient'
import ProductImage from '../ProductImage/ProductImage'
const NewProduct = () => {

  const { name, image, value, qtd, category, setName, setImage, setValue, setQtd, setFormSubmitted } = useContext(ProductContext)

  const handleNameChange = (text) => {

    const words = text.toLowerCase().split(' ');
    const formattedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const formattedText = formattedWords.join(' ')

    setName(formattedText)
  }

  const handleValueChange = (text) => {
    setValue(text)
  }

  const handleQtdChange = (text) => {
    setQtd(text)
  }

  const handleSubmit = async () => {
    setFormSubmitted(true)

    if (!name || !value || !qtd || !category) {

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
  useEffect(() => {
  }, [image])


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

        <ProductImage
          setImage={setImage}
          image={image}
          borderColor={cssColors.input}
        />

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
            value={qtd !== null ? qtd.toString() : ''}
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
    shadowColor: '#000',
    textShadowRadius: 10,
    shadowOffset: { width: -1, height: 9 },
    elevation: 8,
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
  }
})

export default NewProduct