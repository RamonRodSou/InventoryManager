import { createContext, useState } from "react";

export const ProductContext = createContext ({})

export function  ProductProvider({children}){

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [value, setValue] = useState('')
    const [qtd, setQtd] = useState('')
    const [category, setCategory] = useState('')

    return (
        <ProductContext.Provider 
            value={{name, image, value, qtd, category, setName, setImage, setValue, setQtd, setCategory}}
        >
            {children}
        </ProductContext.Provider>
    )
}