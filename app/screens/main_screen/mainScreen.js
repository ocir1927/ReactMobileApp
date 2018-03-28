import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';

import { NavigationActions } from 'react-navigation';


import { Container, Header, Title, Content, Button, Body, Text, Item, List, ListItem, Card, CardItem, Thumbnail, Left, Right } from 'native-base';
import { BASE_URL } from '../../../App';


export class MainScreen extends Component {

    static navigationOptions = {
        header: null
    };

    baseUrl = BASE_URL;

    constructor(props) {
        super(props);
        this.state = {
            pizzaItems: []
        }
    }


    componentDidMount() {
    }

    gotoProducts() {
        this.props.navigation.navigate('PizzaListScreen');
    }

    goToShoppingCart() {
        this.props.navigation.navigate('ShoppingCart');
    }

    gotoAbout() {
        this.props.navigation.navigate("AboutPage");
    }


    render() {
        return (
            <Container
                style={styles.container}
            >
                <TouchableOpacity
                    style={styles.shoppingIntentItem}
                    onPress={() => this.goToShoppingCart()}
                >
                    <Text style={styles.textIntent}> View Shopping Cart </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cartIntentItem}
                    onPress={() => this.gotoProducts()}
                >
                    <Text style={styles.textIntent}> View Products </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.aboutIntentItem}
                    onPress={() => this.gotoAbout()}
                >
                    <Text style={styles.textIntent}> About Us </Text>
                </TouchableOpacity>

            </Container>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    shoppingIntentItem: {
        backgroundColor: '#c6d8e4',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flex: 1,
        borderRadius: 10,
    },
    cartIntentItem: {
        backgroundColor: '#f2c8d3',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flex: 1,
        borderRadius: 10,
    },
    aboutIntentItem: {
        backgroundColor: '#cda0c1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flex: 1,
        borderRadius: 10,
    },
    textIntent: {
        fontSize: 26,
        fontFamily: "Comic Sans MS"
    }
});