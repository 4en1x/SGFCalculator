import React, { Component } from 'react';
import {
    Footer,
    Button,
    FooterTab,
    Text,
} from 'native-base';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './footer.styled';
import Global from '../../pages/Global';

export default class CustomFooter extends Component {
    static get propTypes() {
        return {
            navigation: PropTypes.shape({
                navigate: PropTypes.func,
            }),
        };
    }

    onGraph() {
        if (Global.maxY > 1) {
            this.props.navigation.navigate('Graph');
        }
    }

    onTable() {
        if (Global.tableDataOne.length > 1 || Global.tableDataTwo.length > 1) {
            this.props.navigation.navigate('Table');
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Footer>
                <FooterTab style={{ backgroundColor: '#004567' }}>
                    <Button
                        style={[styles.bottomButton, styles.addRightBorder]}
                        transparent
                        onPress={() => navigate('Calculator')}
                    >
                        <Image source={require('../../assets/images/calculator-footer.png')}/>
                        <Text style={styles.textContainer}>Calculator</Text>
                    </Button>

                    <Button
                        style={[styles.bottomButton, styles.addRightBorder]}
                        transparent
                        onPress={() => this.onTable()}
                    >
                        <Image source={require('../../assets/images/table-footer.png')}/>
                        <Text style={styles.textContainer}>Table</Text>
                    </Button>

                    <Button
                        style={[styles.bottomButton, styles.addRightBorder]}
                        transparent
                        onPress={() => this.onGraph()}
                    >
                        <Image source={require('../../assets/images/graph-footer.png')}/>
                        <Text style={styles.textContainer}>Graph</Text>
                    </Button>

                    <Button
                        style={styles.bottomButton}
                        transparent
                        onPress={() => navigate('AboutUs')}
                    >
                        <Image source={require('../../assets/images/about-footer.png')}/>
                        <Text style={styles.textContainer}>About us</Text>
                    </Button>
                </FooterTab>
            </Footer>

        );
    }
}
