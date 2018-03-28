import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Alert,
    AsyncStorage,
    NetInfo
} from 'react-native';

import { Container, Header, Title, Content, Button, Body, Text, Icon, Item, List, ListItem, Card, CardItem, Thumbnail, Left, Right } from 'native-base';
import { BASE_URL } from '../../../App';


export class PizzaListScreen extends Component {

    baseUrl = BASE_URL;


    // static navigationOptions = {
    //     title: 'Pizza List',
    //     // headerLeft: null,
    //     headerRight: <Button />
    // };


    constructor(props) {
        super(props);
        this.state = {
            pizzaItems: [],
            isConnected: false
        }

        this.addToCart = this.addToCart.bind(this);
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: "Pizza List",
            headerRight: (
                <Button title="Cart" />
            )
        }
    }

    savePizzaListLocal() {
        try {
            AsyncStorage.getItem('pizzaList', (err, result) => {
                if (result !== null) {
                    return;
                } else {
                    console.log('Data Not Found');
                    AsyncStorage.setItem('pizzaList', JSON.stringify(this.state.pizzaItems));
                }
            });
        } catch (error) {
            console.log(error);
        }

    }

    loadPizzaListFromLocalStorage() {
        try {
            AsyncStorage.getItem('pizzaList', (err, result) => {
                console.log(result);

                if (result !== null) {

                    this.state.pizzaItems = JSON.parse(result);
                    this.forceUpdate();
                }
            });
        } catch (error) {
            console.log(error);

        }
    }


    async addToCart(item) {
        let cart = [item];
        console.log("sddsa");
        try {
            AsyncStorage.getItem('cart', (err, result) => {
                if (result !== null) {
                    console.log('Data Found', result);
                    var newCart = JSON.parse(result);
                    newCart.push(item);
                    AsyncStorage.setItem('cart', JSON.stringify(newCart));
                } else {
                    console.log('Data Not Found');
                    AsyncStorage.setItem('cart', JSON.stringify(cart));
                }
            });
        } catch (error) {

            // Error saving data
            console.log(error);
        }
    }




    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.state.isConnected = isConnected;
            if (!isConnected) {
                this.loadPizzaListFromLocalStorage();
            }else{
                this.fetchPizza();
            }
        });


    }


    fetchPizza() {

        fetch(this.baseUrl + '/pizza') 
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((responseJson) => {
                console.log(responseJson);

                this.setState({
                    pizzaItems: responseJson
                });
                this.savePizzaListLocal();

                console.log(this.state.pizzaItems);
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
    }

    render() {
        return (
            <Container>
                <List dataArray={this.state.pizzaItems}
                    renderRow={(item) =>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: item.photoUrl }} />
                                    <Body>
                                        <Text>{item.name}</Text>
                                        <Text note>{item.contains.join(", ")}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: item.photoUrl }} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button small primary
                                        onPress={() => this.addToCart(item)}
                                    >
                                        <Text>Add to Cart</Text>
                                    </Button>
                                </Left>

                                <Right>

                                    <Text>{item.price} RON</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    }>
                </List>
            </Container>
        );
    }

}