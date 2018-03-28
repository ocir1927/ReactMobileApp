import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Alert,
    AsyncStorage,
    Animated
} from 'react-native';

import { Container, Header, Title, Toast, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, H1, Input, Thumbnail } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { BASE_URL } from '../../../App';


export class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.animated = new Animated.Value(0);
    }

    componentWillMount() {
        try {
            AsyncStorage.getItem("user", (err, result) => {
                console.log("dsadaadsdsadas");


                if (result != null) {
                    console.log(result);
                    this.navigateToMainPage();
                }
                else return;
            });
        } catch (error) {
            // Error saving data
            console.log(error);
        }
        
    }


    componentDidMount() {


        this.slide();
    }




    baseUrl = BASE_URL;

    async setCurrentUser(username) {
        try {
            await AsyncStorage.setItem('user', username);
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    }

    navigateToMainPage() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                // NavigationActions.navigate({ routeName: 'PizzaListScreen' })
                NavigationActions.navigate({ routeName: 'MainScreen' })

            ]
        });

        this.props.navigation.dispatch(resetAction);

    }

    login() {
        user = {
            username: this.state.username,
            password: this.state.password
        };

        mockUser = {
            username: "costin",
            password: "123"
        }

        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         // NavigationActions.navigate({ routeName: 'PizzaListScreen' })
        //         NavigationActions.navigate({ routeName: 'MainScreen' })

        //     ]
        // });


        fetch(this.baseUrl + '/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mockUser)
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                this.setCurrentUser(mockUser.username);
                this.navigateToMainPage();
                // this.props.navigation.dispatch(resetAction);
            }
            else {
                throw new Error(response.status);
            }
        }).catch((error) => {
            console.log(error);
            Toast.show({
                text: 'Wrong password!',
                position: 'bottom',
                buttonText: 'Okay'
            });
        });

    }

    slide() {
        this.animated.setValue(0);

        Animated.timing(
            this.animated,
            {
                toValue: 1,
                duration: 1000
            }
        ).start();
    }




    render() {
        const slide = this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [-500, 1]
        });

        const scale = this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const transform = [{ translateX: slide }]


        return (
            <Container>
                <Content contentContainerStyle={styles.container}>

                    <Animated.Image style={[styles.icon, { transform }]} source={require('../../../assets/pizza-icon.png')} />
                    <Animated.Text style={[styles.logoText, { transform: [{ scale }] }]}>Costi's pizza</Animated.Text>

                    <Item rounded style={styles.textField}>
                        <Icon active name='person' />
                        <Input placeholder='Usearname'
                            onChangeText={(value) => this.setState({ username: value })} />

                    </Item>
                    <Item style={styles.textField} rounded>
                        <Icon active name='lock' />
                        <Input placeholder='Password'
                            secureTextEntry
                            onChangeText={(password) => this.setState({ password })} />
                    </Item>

                    <Button primary rounded
                        style={styles.button}
                        onPress={this.login.bind(this)}>
                        <Text>Login</Text>
                    </Button>

                </Content>
                <Footer style={styles.footer}>
                    <Text>Don't have an account? Register Now</Text>
                </Footer>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        marginTop: 5
    },
    button: {
        width: 200,
        alignSelf: 'center',
        marginTop: 50,
        justifyContent: 'center'
    },
    footer: {
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    icon: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    logoText: {
        fontSize: 40
    }
});