import firebase from '../service/fireBaseConecction'

export async function fireBasePost(name, image ,value ,qtd, category) {

  await firebase.firestore().collection('product')
    .add({
      name: name,
      image: image,
      value: value,
      qtd: qtd,
      category: category
    })
    .then(() => {
      alert('Registrado com sucesso!')
    })
    .catch((error) => {
      alert('Error: ' + error)
    })
}
