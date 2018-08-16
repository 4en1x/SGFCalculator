import React, { Component } from 'react';
import {
    Footer,
    Button,
    FooterTab,
    Icon,
    Text,
} from 'native-base';

import PropTypes from 'prop-types';
import styles from './footer.styled';
import Global from '../../pages/Global';
import {ImageBackground} from "react-native";

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
        if (Global.tableData.length > 1) {
            this.props.navigation.navigate('Amortization');
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
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

        );
    }
}
