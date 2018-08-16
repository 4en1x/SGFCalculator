import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Footer,
    Button,
    FooterTab,
    Icon,
    Text,
    Content,
} from 'native-base';

import { Image, ImageBackground, TouchableOpacity } from 'react-native';

import styles from './home.styled';
import Global from '../Global';

class Home extends Component {
    static get propTypes() {
        return {
            navigation: PropTypes.shape({
                navigate: PropTypes.func,
            }),
        };
    }

    static navigationOptions = {
        title: 'Home',
        headerTintColor: '#ffffff',

        headerStyle: {
            backgroundColor: '#1b4567',
            borderBottomColor: '#888888',
            borderBottomWidth: 1,
        },
        headerTitleStyle: {
            fontSize: 20,
        },
    };

    onGraph() {
        if (Global.maxY > 1) {
            this.props.navigation.navigate('Graph');
        }
    }

    onTable() {
        if (Global.tableData.length > 1) {
            this.props.navigation.navigate('Amortization');
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <ImageBackground
                    source={require('../../assets/images/home.png')}
                    style={{ flex: 1 }}
                >
                    <Content>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => navigate('Calculator')}
                        >
                            <Image source={require('../../assets/images/btn_Return.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => navigate('AboutUs')}
                        >
                            <Image source={require('../../assets/images/btn_AboutUs.png')} />
                        </TouchableOpacity>
                    </Content>

                    <Footer>
                        <FooterTab style={{ backgroundColor: '#004567' }}>
                            <Button
                                style={styles.bottomButton}
                                transparent
                                onPress={() => navigate('Calculator')}
                            >
                                <Icon style={{ color: '#ffffff' }} type="FontAwesome" name="calculator"/>
                                <Text style={styles.textContainer}>Calculator</Text>
                            </Button>

                            <Button
                                style={styles.bottomButton}
                                transparent
                                onPress={() => this.onTable()}
                            >
                                <Icon style={{ color: '#ffffff' }} type="FontAwesome" name="file-text"/>
                                <Text style={styles.textContainer}>Table</Text>
                            </Button>

                            <Button
                                style={styles.bottomButton}
                                transparent
                                onPress={() => this.onGraph()}
                            >
                                <Icon style={{ color: '#ffffff' }} type="FontAwesome" name="bar-chart"/>
                                <Text style={styles.textContainer}>Graph</Text>
                            </Button>

                            <Button
                                style={styles.bottomButton}
                                transparent
                                onPress={() => navigate('AboutUs')}
                            >
                                <Icon style={{ color: '#ffffff' }} type="FontAwesome" name="user"/>
                                <Text style={styles.textContainer}>About us</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </ImageBackground>
            </Container>
        );
    }
}

export default Home;
