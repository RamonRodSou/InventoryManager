
import firebase from '../service/fireBaseConecction'

export async function fireBasePostCategory(nameCategory) {
  try {
    const createdAt = new Date().toISOString()
    await firebase.firestore().collection('category').add({
      nameCategory: nameCategory,
      createdAt:createdAt
    })
    console.log('Post successful');

  } catch (error) {
    alert('Error: ' + error)
  }
}

export async function fireBaseGetCategory(dataCategory) {
  try {
    await firebase.firestore().collection('category').onSnapshot((querySnapshot) => {
      let allCategory = []
      querySnapshot.forEach((doc) => {
        allCategory.push({
          id: doc.id,
          nameCategory: doc.data().nameCategory,
          createdAt: doc.data().createdAt, 
        })
      })
      allCategory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      allCategory.reverse()
      dataCategory(allCategory)
    })
  } catch (error) {
    alert('Error: ' + error)
  }
}

export async function fireBaseUpdateCategory(categoryId, newName) {
  try {
    await firebase.firestore().collection('category').doc(categoryId).update({
      nameCategory: newName,
    })
    console.log('Update successfully')

  } catch (error) {
    alert('Error: ' + error)
  }
}

export async function fireBaseDeleteCategory(categoryId) {
  try {
    await firebase.firestore().collection('category').doc(categoryId).delete()
    console.log('deleted successfully')
  } catch (error) {
    alert('Error: ' + error)
  }
}
