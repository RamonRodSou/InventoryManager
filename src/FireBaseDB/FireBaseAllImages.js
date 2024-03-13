import { storage } from '../service/fireBaseConecction'


export async function getAllImages() {
    try {
      const storageRef = storage.ref()
      const imagesRef = storageRef.child('images')
      const imageUrls = []
  
      const items = await imagesRef.listAll()
  
      await Promise.all(items.items.map(async (item) => {
        const url = await item.getDownloadURL()
        imageUrls.push(url)
      })) 
  
      return imageUrls
    } catch (error) {
      console.error('Erro ao obter imagens:', error)
      return []
    }
  }

  export async function deleteImage(imageUrl) {
    try {
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('%2F') + 3, imageUrl.lastIndexOf('?')) 
      const storageRef = storage.ref()
      const imageRefPath = `images/${fileName}`
      const imageRef = storageRef.child(imageRefPath)
      await imageRef.delete()
      console.log('Imagem excluída com sucesso!')
  } catch (error) {
      console.error('Erro ao excluir imagem:', error)
      throw error
  }
}