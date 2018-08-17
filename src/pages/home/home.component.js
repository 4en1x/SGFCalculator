import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Content, Text,
} from 'native-base';

import {
    Image, ImageBackground, TouchableOpacity, View,
} from 'react-native';
import CustomFooter from '../../components/footer/footer.component';

import styles from './home.styled';

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

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <ImageBackground
                    source={require('../../assets/images/home.png')}
                    style={{ flex: 1 }}
                >
                    <Content>
                        <View style={styles.aboutBackground}>
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={() => navigate('Calculator')}
                            >
                                <Image source={require('../../assets/images/btn_Return.png')} />
                            </TouchableOpacity>

                            <Text style={styles.aboutText}>
                                A tool to compare the result from alternative investment strategies.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => navigate('AboutUs')}
                        >
                            <Image source={require('../../assets/images/btn_AboutUs.png')} />
                        </TouchableOpacity>
                    </Content>

                    <CustomFooter navigation={this.props.navigation}/>
                </ImageBackground>
            </Container>
        );
    }
}

export default Home;
