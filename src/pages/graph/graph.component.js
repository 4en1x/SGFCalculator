import React, { Component } from 'react';
import {
    Dimensions,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    VictoryChart, VictoryGroup, VictoryAxis, VictoryLine, VictoryTheme, VictoryLabel,
} from 'victory-native';

import Expo from 'expo';
import PropTypes from 'prop-types';
import { HeaderBackButton } from 'react-navigation';
import CustomFooter from '../../components/footer/footer.component';

import styles from './graph.styled';
import Global from '../Global';


class Graph extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Graph',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#1b4567',
        },
        headerTitleStyle: {
            fontSize: 20,
            textAlign: 'center',
            paddingLeft: 70,
        },
        headerLeft: (
            <View style={styles.headerLeft}>
                <HeaderBackButton
                    onPress={() => {
                        navigation.navigate('Calculator');
                        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
                    }}
                    tintColor='#ffffff'
                />
                <TouchableOpacity style= {styles.customBackTitle} onPress={() => {
                    navigation.navigate('Calculator');
                    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
                }} >
                    <Text style={styles.customBackTitleText}>Calculator</Text>
                </TouchableOpacity>
            </View>
        ),
    });

    static get propTypes() {
        return {
            navigation: PropTypes.shape({
                navigate: PropTypes.func,
            }),
        };
    }

    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
    }

    render() {
        const m_length = Global.current_data.length;

        let m_fontSize = 14;

        if (Global.maxY > 100) m_fontSize = 12;
        else if (Global.maxY > 1000) m_fontSize = 10;
        else if (Global.maxY > 10000) m_fontSize = 8;
        else if (Global.maxY > 100000) m_fontSize = 5;

        let firstDestination = Global.current_data[Math.round(Global.current_data.length / 2)].y;
        let secondDestination = Global.sgf_data[Math.round(Global.current_data.length / 2)].y;

        if (firstDestination >= secondDestination) {
            firstDestination += Global.maxY * 0.10;
            secondDestination -= Global.maxY * 0.10;
        } else {
            firstDestination -= Global.maxY * 0.10;
            secondDestination += Global.maxY * 0.10;
        }
        return (
            <ImageBackground
                source={require('../../assets/images/background-graph.png')}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1 }}>
                    <VictoryChart
                        padding={{
                            top: 25, bottom: 60, left: 50, right: 80,
                        }}
                        color={'#000000'}
                        height={Dimensions.get('screen').width - 110}
                        width={Dimensions.get('screen').height - 50}
                        theme={VictoryTheme.material}
                    >
                        <VictoryAxis
                            label= {Global.xAxis_label}
                            style={{
                                axisLabel: { fontSize: 16, padding: 35, stroke: '#ffffff' },
                                ticks: { stroke: '#ffffff' },
                                tickLabels: { fontSize: 14, fill: '#ffffff', fontWeight: 'bold' },
                            }}
                        />

                        <VictoryAxis dependentAxis
                            orientation="right"
                            label="Return $"
                            style={{
                                axisLabel: { padding: 60, fontSize: 16, stroke: '#ffffff' },
                                ticks: { stroke: '#ffffff' },
                                tickLabels: { fontSize: m_fontSize, fill: '#ffffff', fontWeight: 'bold' },
                            }}
                        />

                        <VictoryGroup domain={{ y: [0, Global.maxY * 1.2] }} >
                            <VictoryLine
                                data={[{ x: 0, y: 0 }, { x: 0, y: Global.maxY * 1.2 }]}
                                style={{ data: { stroke: '#FFFFFF' } }}
                            />
                            <VictoryLine
                                data={[{ x: 0, y: Global.maxY * 1.2 }, { x: parseInt(Global.current_data[(m_length - 1)].x), y: Global.maxY * 1.2 }]}
                                style={{ data: { stroke: '#FFFFFF' } }}
                            />

                            <VictoryLine
                                data={Global.sgf_data}
                                interpolation="natural"
                                style={{ data: { stroke: '#00F300' } }}
                            />
                            <VictoryLine
                                data={Global.current_data}
                                interpolation="natural"
                                style={{ data: { stroke: '#FF0000' } }}
                            />

                            <VictoryLabel
                                text="ALTERNATIVE"
                                datum={{ x: Global.current_data[Math.round(Global.current_data.length / 2)].x, y: Global.current_data[Math.round(Global.current_data.length / 2)].y + Global.maxY * 0.10 }}
                                textAnchor="start" style={{ stroke: '#ffffff' }}
                            />
                            <VictoryLabel
                                text="CURRENT"
                                datum={{ x: Global.sgf_data[Math.round(Global.current_data.length / 2)].x, y: Global.sgf_data[Math.round(Global.current_data.length / 2)].y + Global.maxY * 0.20 }}
                                textAnchor="start" style={{ stroke: '#ffffff' }}
                            />
                        </VictoryGroup>
                    </VictoryChart>
                </View>

                <CustomFooter navigation={this.props.navigation}/>
            </ImageBackground>
        );
    }
}

export default Graph;
