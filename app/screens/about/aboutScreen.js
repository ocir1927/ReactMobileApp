import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity,
    Linking
} from 'react-native';

import { Pie } from 'react-native-pathjs-charts';

import { NavigationActions } from 'react-navigation';


import { Container, H1, Header, Title, Content, Button, Body, Text, Item, List, ListItem, Card, CardItem, Thumbnail, Left, Right } from 'native-base';
import { BASE_URL } from '../../../App';


export class AboutPage extends Component {

    static navigationOptions = {
        title: "About Us"
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


    chartData = [{
        "name": "Very satisfied",
        "levelOfSatisfation": 78
    }, {
        "name": "Satisfied",
        "levelOfSatisfation": 44
    }, {
        "name": "Not very satisfied",
        "levelOfSatisfation": 12
    }, {
        "name": "Not satisfied",
        "levelOfSatisfation": 3
    }];


    chartOptions = {
        margin: {
            top: 30,
            left: 30,
            right: 30,
            bottom: 30
        },
        width: 350,
        height: 350,
        color: '#2980B9',
        r: 20,
        R: 140,
        legendPosition: 'bottomRight',
        animate: {
            type: 'oneByOne',
            duration: 1000,
            fillTransition: 3
        },
        label: {
            fontFamily: 'Arial',
            fontSize: 8,
            fontWeight: true,
            color: 'white'
        }
    }

    sendEmail() {
        Linking.openURL('mailto:pizza.costi@gmail.com?subject=subject&&body=body')
            .catch(err => console.error('An error occurred', err));
    }

    makeCall() {
        Linking.openURL('tel:0757189383')
            .catch(err => console.error('An error occurred', err));
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.testStyle}>How satisfied are our customers?</Text>
                <Pie
                    data={this.chartData}
                    options={this.chartOptions}
                    accessorKey="levelOfSatisfation" />
                <H1>Contact us:</H1>
                <TouchableOpacity
                    onPress={() => this.makeCall().bind(this)}
                >
                    <Text style={styles.testStyle}>Phone:0757189383</Text>
                </TouchableOpacity >
                <TouchableOpacity
                    onPress={() => this.sendEmail().bind(this)}
                >
                    <Text style={styles.testStyle}>Email:pizza.costi@gmail.com</Text>
                </TouchableOpacity >
            </Container>
        );
    }

}



const styles = StyleSheet.create({
    testStyle: {
        margin: 10,
        fontSize: 26
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    textIntent: {
        fontSize: 24,
        fontFamily: "Comic Sans MS"
    }
});
