import { createContext, useState } from "react";

export const ProductContext = createContext ({})

export function  ProductProvider({children}){

    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [value, setValue] = useState('')
    const [qtd, setQtd] = useState('')
    const [category, setCategory] = useState('')

    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [newCategory, setNewCategory] = useState('');
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [editCategory, setEditCategory] = useState(false)

    const [product, setProduct] = useState([])
    const [categoryD, setCategoryD] = useState([])
    const [editingProductId, setEditingProductId] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)


    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    return (
        <ProductContext.Provider 
            value={{name, image, value, qtd, category, setName, setImage, setValue, setQtd, setCategory,
                categories, setCategories, modalVisible, setModalVisible, selectedCategory, setSelectedCategory,
                formSubmitted, setFormSubmitted, newCategory, setNewCategory, confirmDeleteVisible, setConfirmDeleteVisible,
                categoryToDelete, setCategoryToDelete, editCategory, setEditCategory, product, setProduct, categoryD, setCategoryD,
                editingProductId, setEditingProductId, productToDelete, setProductToDelete
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

