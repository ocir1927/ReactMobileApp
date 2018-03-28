import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Alert,
    AsyncStorage,
    View
} from 'react-native';

import { Container, Header, Title, Toast, Content, Button, Body, Text, Item, List, ListItem, Card, CardItem, Thumbnail, Left, Right } from 'native-base';
import { BASE_URL } from '../../../App';


export class ShoppingCart extends Component {

    static navigationOptions = {
        title: "Cart",
        headerRight: (
            <Button title="Cart" />
        )
    };

    baseUrl = BASE_URL;

    constructor(props) {
        super(props);
        this.state = {
            pizzaItems: [],
            totalPrice: 0,
            user: ''
        }
    }

    fetchPizza(id) {
        console.log(id);

        fetch(this.baseUrl + `/pizza/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((responseJson) => {
                this.setState({
                    pizzaItems: [...this.state.pizzaItems, responseJson]
                });
                this.state.totalPrice += responseJson.price;
                this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
                Toast.show({
                    text: 'Api call error',
                    position: 'bottom',
                    buttonText: 'OK'
                });
            });

    }

    async getUser() {
        try {
            this.state.user = await AsyncStorage.getItem('user');
            console.log(this.state.user);
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        try {
            let pizzaList = await AsyncStorage.getItem('cart');
            if (pizzaList !== null) {
                pizzaList = JSON.parse(pizzaList);
                console.log(pizzaList);


                // for (let id of pizzaList) {
                //     this.fetchPizza(id);
                // }

                this.state.pizzaItems = pizzaList;

                for (let pizza of pizzaList) {
                    this.state.totalPrice += pizza.price;
                }

                this.forceUpdate();

            }
        } catch (error) {
            console.log(error);
        }

        this.getUser();
    }

    clearPizzaFromMemory() {
        AsyncStorage.removeItem('cart');
    }

    checkout() {
        fetch(this.baseUrl + '/comanda', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    user: { username: this.state.user },
                    pizzaList: this.state.pizzaItems
                }
            )
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                Toast.show({
                    text: 'Your order was sent!',
                    position: 'bottom',
                    type: 'success,'
                });
                this.clearPizzaFromMemory();
                setTimeout(() => this.props.navigation.navigate("MainScreen"), 1000);
            }
            else {
                throw new Error(response.status);
                Toast.show({
                    text: 'There was an error sending your order!',
                    position: 'bottom',
                    type: 'warning,'
                });
            }
        }).catch((error) => {
            console.log(error);
            Toast.show({
                text: 'There was an error sending your order!',
                position: 'bottom',
                type: 'warning,'
            });
        });
    }



    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <List dataArray={this.state.pizzaItems}
                        renderRow={(pizza) =>
                            <ListItem>
                                <Thumbnail square size={80} source={{ uri: pizza.photoUrl }} />
                                <Body>
                                    <Text style={styles.pizzaName}>{pizza.name}</Text>
                                    <Text style={styles.price}>{pizza.price}</Text>
                                </Body>
                            </ListItem>
                        }>
                    </List>
                    <Text style={styles.price}>Total price: {this.state.totalPrice.toFixed(2)} RON</Text>
                    <View style={styles.emptySpace}></View>
                </Content>
                <Button block success
                    style={styles.checkoutButton}
                    onPress={this.checkout.bind(this)}>
                    <Text>Checkout</Text>
                </Button>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    price: {
        alignSelf: 'flex-end',
        marginRight: 10
    },
    pizzaName: {
        fontSize: 20
    },
    checkoutButton: {
        height: 70,
        // alignSelf: 'flex-end'
    },
    emptySpace: {
        height: 50
    }
});