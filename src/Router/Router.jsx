import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home/Home';
import NewProduct from '../Components/NewProduct/NewProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryPage from '../Components/Category/CategoryPage';
import { ProductContext } from '../contexts/product';
import Galery from '../Components/Galery/Galery';

const Tab = createBottomTabNavigator();

const HomePage = () => {
    return (
        <Home />
    )
}

const RegisterNewProduct = () => {
    return (
        <NewProduct />
    )
}

const RegisterNewCategory = () => {
    return (
        <CategoryPage />
    )
}

const GaleryTabImg = () => {
    return (
        <Galery />
    )
}

const Router = () => {

    const { setEditCategory } = useContext(ProductContext);

    const CategoryEdit = (state) => {
        setEditCategory(state)
    }

    return (
        <Tab.Navigator initialRouteName="Feed">
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Product"
                component={RegisterNewProduct}
                options={{
                    tabBarLabel: 'New Product',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={size} />
                    )
                }}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(false);
                    },
                })}
            />
            <Tab.Screen
                name="Category"
                component={RegisterNewCategory}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(true);
                    },
                })}
                options={{
                    tabBarLabel: 'Category',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Galery"
                component={GaleryTabImg}
                options={{
                    tabBarLabel: 'Galery',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}



export default Router