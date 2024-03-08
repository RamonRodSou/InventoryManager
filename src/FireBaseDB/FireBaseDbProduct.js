
import firebase from '../service/fireBaseConecction'

export async function fireBasePost(name, image, value, qtd, category) {
  try {
    const quantity = parseInt(qtd, 10)
    const createdAt = new Date().toISOString()
    await firebase.firestore().collection('product').add({
      name: name,
      image: image,
      value: value,
      qtd: quantity,
      category: category,
      createdAt: createdAt
    })
    alert('Registrado com sucesso!')
  } catch (error) {
    alert('Error: ' + error)
  }
}

export async function fireBaseGet(dataProduct) {
  try {
    await firebase.firestore().collection('product').onSnapshot((querySnapshot) => {
      let allProduct = []
      querySnapshot.forEach((doc) => {
        allProduct.push({
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image,
          value: doc.data().value,
          qtd: doc.data().qtd,
          category: doc.data().category,
          createdAt: doc.data().createdAt 
        })
      })
      allProduct.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      allProduct.reverse()
      dataProduct(allProduct)
    })
  } catch (error) {
    alert('Error: ' + error)
  }
}

export async function fireBaseUpdate(id, name, value, qtd,) {
  try {
    const quantity = parseInt(qtd, 10)
    await firebase.firestore().collection('product').doc(id).update({
      name: name,
      value: value,
      qtd: quantity,

    })
  } catch (error) {
    alert('Error: ' + error)
  }
}

export async function fireBaseDelete(id) {
  try {
    await firebase.firestore().collection('product').doc(id).delete()
  } catch (error) {
    alert('Error: ' + error)
  }
}

export async function fireBaseUpdateQuantity(id, newQtd) {
  try {
    const productRef = firebase.firestore().collection('product').doc(id)
    const productDoc = await productRef.get()
    const currentQuantity = productDoc.data().qtd
    const updatedQuantity = currentQuantity + newQtd
    await productRef.update({
      qtd: updatedQuantity
    })
  } catch (error) {
    alert('Error: ' + error)
  }
}