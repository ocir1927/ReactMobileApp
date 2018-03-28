import React from 'react';
import { PizzaListScreen } from './screens/pizza_list/pizzaList';
import { StackNavigator } from 'react-navigation';
import { Login } from './screens/login/login';
import { MainScreen } from './screens/main_screen/mainScreen';
import { ShoppingCart } from './screens/shoppingChart/shoppingChart';
import { AboutPage } from './screens/about/aboutScreen';



export const RootNavigator = StackNavigator({
    LoginScreen: {
        screen: Login
    },
    PizzaListScreen: {
        screen: PizzaListScreen,
        title: 'Pizza List'
    },
    MainScreen: {
        screen: MainScreen,
        title: 'Main Screen'
    },
    ShoppingCart: {
        screen: ShoppingCart,
        title: 'Shopping Cart'
    },
    AboutPage: {
        screen: AboutPage,
        title: 'About page'
    }
},
    {
        initialRouteName: 'LoginScreen'
    });