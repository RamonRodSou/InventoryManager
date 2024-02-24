
import firebase from '../service/fireBaseConecction';

export async function fireBasePostCategory(nameCategory) {
  try {
    await firebase.firestore().collection('category').add({
      nameCategory: nameCategory,
    });
    alert('Registrado com sucesso!');
  } catch (error) {
    alert('Error: ' + error);
  }
}

export async function fireBaseGetCategory(dataCategory) {
  try {
    await firebase.firestore().collection('category').onSnapshot((querySnapshot) => {
      let allCategory = [];
      querySnapshot.forEach((doc) => {
        allCategory.push({
          id: doc.id,
          nameCategory: doc.data().nameCategory,
        });
      });
      dataCategory(allCategory);
    });
  } catch (error) {
    alert('Error: ' + error);
  }
}

export async function fireBaseUpdateCategory(categoryId, newName) {
  try {
    await firebase.firestore().collection('category').doc(categoryId).update({
      nameCategory: newName,
    });
    alert('Categoria atualizada com sucesso!');
  } catch (error) {
    alert('Error: ' + error);
  }
}

export async function fireBaseDeleteCategory(categoryId) {
  try {
    await firebase.firestore().collection('category').doc(categoryId).delete();
    alert('Categoria excluída com sucesso!');
  } catch (error) {
    alert('Error: ' + error);
  }
}
