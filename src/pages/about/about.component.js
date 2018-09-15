import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import {
    Text,
    Content,
} from 'native-base';

import {
    Linking, Platform, Image, View, ImageBackground, TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import styles from './about.styled';
import CustomFooter from '../../components/footer/footer.component';

class AboutUs extends Component {
    static get propTypes() {
        return {
            navigation: PropTypes.shape({
                navigate: PropTypes.func,
            }),
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'About Us',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#1b4567',
        },
        headerTitleStyle: {
            paddingLeft: 70,
            fontSize: 20,
            textAlign: 'center',
        },
        headerLeft: (
            <View style={styles.headerLeft}>
                <HeaderBackButton
                    onPress={() => navigation.navigate('Home')}
                    tintColor='#ffffff'
                />
                <TouchableOpacity style= {styles.customBackTitle} onPress={() => navigation.navigate('Home')} >
                    <Text style={styles.customBackTitleText}>Home</Text>
                </TouchableOpacity>
            </View>
        ),
    });

    openMaps() {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${-27.470208},${153.030485}`;
        const label = 'Our address';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        });
        Linking.openURL(url);
    }

    openPhoneNumber() {
        Linking.openURL('tel:+1300904415');
    }

    openSite() {
        Linking.openURL('http://www.sgf.com.au');
    }

    openMail() {
        Linking.openURL('mailto:admin@sgf.com.au');
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/home.png')} style={{ flex: 1 }}>
                <Content scrollEnabled={false}>
                    <View style={styles.aboutBackground}>
                        <Text style={styles.aboutText}>
                            SGF offers investors the opportunity to invest in a fund which specialises in investing in international shares. We follow a value-driven investment approach supported by intensive fundamental research, which enables us to invest in strong but undervalued companies around the world.
                        </Text>

                        <Text style={styles.aboutText}>
                            We create value for our investors by searching for compelling opportunities which have been overlooked in international share markets.
                        </Text>
                    </View>

                    <View style={styles.btn_contact} >
                        <Image source={require('../../assets/images/contactDetail.png')}/>
                    </View>

                    <TouchableOpacity style={styles.aboutContacts} onPress={() => this.openSite()}>
                        <Image style={styles.aboutContactsInner} source={require('../../assets/images/email.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.aboutContacts} onPress={() => this.openMail()}>
                        <Image style={styles.aboutContactsInner} source={require('../../assets/images/admin.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.aboutContacts} onPress={() => this.openPhoneNumber()}>
                        <Image style={styles.aboutContactsInner} source={require('../../assets/images/telephone.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.aboutContacts} onPress={() => this.openMaps()} >
                        <Image style={styles.aboutContactsInner} source={require('../../assets/images/level.png')}/>
                    </TouchableOpacity>
                </Content>

                <CustomFooter navigation={this.props.navigation}/>
            </ImageBackground>

        );
    }
}

export default AboutUs;
