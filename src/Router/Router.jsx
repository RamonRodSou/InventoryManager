import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home/Home';
import NewProduct from '../Components/NewProduct/NewProduct';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryPage from '../Components/Category/CategoryPage';
import { ProductContext } from '../contexts/product';
import Galery from '../Components/Galery/Galery';
import { StyleSheet } from 'react-native';
import { cssColors } from '../Variavel/Css';
import NewProductIcon from './NewProductIcon';

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
const Search = () => {}

const Router = () => {

    const { setEditCategory, setIsSearchVisible } = useContext(ProductContext);
    const CategoryEdit = (state) => {
        setEditCategory(state)
    }

    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarStyle: {
                    margin: 10,
                    backgroundColor: cssColors.title,
                    borderRadius: 15,
                    height: 50,
                    ...styles.shadow,
                },
                headerShown: false,
                tabBarShowLabel: false,
            }}

        >

            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={focused ? '#40cfff' : color}
                            size={size}
                        />
                    ),
                }}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(false)
                    },
                })}
            />

            <Tab.Screen
                name="Category"
                component={RegisterNewCategory}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(true)
                        setIsSearchVisible(false)
                    },
                })}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="layers"
                            color={focused ? '#40cfff' : color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Product"
                component={RegisterNewProduct}
                options={{
                    tabBarIcon: ({ focused, size }) => (
                        <NewProductIcon focused={focused} size={size} />
                    )
                }}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(false)
                        setIsSearchVisible(false)
                    },
                })}
            />
            <Tab.Screen
                name="Galery"
                component={GaleryTabImg}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="image"
                            color={focused ? '#40cfff' : color}
                            size={size}
                        />
                    )
                }}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(false)
                        setIsSearchVisible(false)
                    },
                })}
            />

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="cloud-search"
                            color={focused ? '#40cfff' : color}
                            size={size}
                        />

                    )
                }}
                listeners={({ route, navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        setIsSearchVisible(true)
                        navigation.navigate('Home')
                    },
                })}
            />
        </Tab.Navigator>

    )
}


const styles = StyleSheet.create({
    container: {
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },

})

export default Router


