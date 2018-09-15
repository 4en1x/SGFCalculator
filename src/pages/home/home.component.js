import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Icon,
    Container,
    Content,
    Text,
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
                    source={require('../../assets/images/home.jpg')}
                    style={{ flex: 1 }}
                >
                    <Content>
                        <View style={styles.aboutBackground}>
                            <TouchableOpacity
                                style={styles.buttonCalculator}
                                onPress={() => navigate('Calculator')}
                            >
                                <View style={styles.buttonImageView}>
                                    <Image style={styles.buttonImage} source={require('../../assets/images/calculator-image.png')}/>
                                </View>
                                <View style={styles.buttonTextView}>
                                    <Text style={styles.buttonText}>Return Comparison Calculator</Text>
                                </View>
                                <View style={styles.buttonIconView}>
                                    <Icon name="arrow-forward" style={styles.buttonIcon} />
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.aboutText}>
                                A tool to compare the result from alternative investment strategies.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.buttonAbout}
                            onPress={() => navigate('AboutUs')}
                        >
                            <View style={styles.buttonImageView}>
                                <Image style={styles.buttonImage} source={require('../../assets/images/about-image.png')}/>
                            </View>
                            <View style={styles.buttonTextView}>
                                <Text style={styles.buttonText}>About Us</Text>
                            </View>
                            <View style={styles.buttonIconView}>
                                <Icon name="arrow-forward" style={styles.buttonIcon} />
                            </View>
                        </TouchableOpacity>
                    </Content>

                    <CustomFooter navigation={this.props.navigation}/>
                </ImageBackground>
            </Container>
        );
    }
}

export default Home;
