import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { Dimensions, ScrollView } from 'react-native';

import {
    VictoryChart, VictoryGroup, VictoryAxis, VictoryLine, VictoryTheme, VictoryLabel,
} from 'victory-native';

import CustomFooter from '../../components/footer/footer.component';

import styles from './graph.styled';
import Global from '../Global';


class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag_param: 0,
        };
    }

    gotoscreen(name) {
        const { navigate } = this.props.navigation;
        // Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        navigate(name);
    }


    static navigationOptions = {
        title: 'Graph',
    };


    render() {
        const m_length = Global.current_data.length;

        let m_fontSize = 14;

        if (Global.maxY > 100) m_fontSize = 12;
        else if (Global.maxY > 1000) m_fontSize = 10;
        else if (Global.maxY > 10000) m_fontSize = 8;
        else if (Global.maxY > 100000) m_fontSize = 5;

        // Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
        const { width } = Dimensions.get('window').width - Dimensions.get('window').width / 10;
        const { hight } = Dimensions.get('window').height - Dimensions.get('window').height / 3;

        return (
            <Container>
                <Content>
                    <ScrollView
                        style={{ backgroundColor: '#7000FF' }}>
                        <VictoryChart
                            color={'#000000'}
                            height={250}
                            width={600}
                            theme={VictoryTheme.material}
                        >
                            <VictoryAxis
                                label= {Global.xAxis_label}
                                style={{
                                    axisLabel: { padding: 35, stroke: '#ccc' },
                                    ticks: { stroke: '#ccc' },
                                    tickLabels: { fontSize: 14, fill: '#E0F2F1', fontWeight: 'bold' },
                                }}
                            />

                            <VictoryAxis dependentAxis
                                         orientation="right"
                                         label="Return(AUD)"
                                         width={400} height={400}
                                         style={{
                                             axisLabel: { padding: 5, stroke: '#ccc' },
                                             ticks: { stroke: '#ccc' },
                                             tickLabels: { fontSize: m_fontSize, fill: '#E0F2F1', fontWeight: 'bold' },
                                         }}
                            />

                            <VictoryGroup domain={{ y: [0, Global.maxY] }} >
                                <VictoryLine data={[{ x: 0, y: 0 }, { x: 0, y: Global.maxY }]} style={{ data: { stroke: '#FFFFFF' } }}/>
                                <VictoryLine data={[{ x: 0, y: Global.maxY }, { x: parseInt(Global.current_data[(m_length - 1)].x), y: Global.maxY }]} style={{ data: { stroke: '#FFFFFF' } }}/>

                                <VictoryLine data={Global.sgf_data} interpolation="natural" style={{ data: { stroke: '#00F300' } }}/>
                                <VictoryLine data={Global.current_data} interpolation="natural" style={{ data: { stroke: '#FF0000' } }}/>
                                <VictoryLine data={Global.princial_data} interpolation="natural" style={{ data: { stroke: '#FFFFFF' } }}/>

                                <VictoryLabel text="P" datum={{ x: 1 - 0.1, y: Global.princial_data[0].y }} textAnchor="end" style={{ stroke: '#FFFFFF' }}/>

                                <VictoryLabel text="Current" datum={{ x: Global.current_data[3].x, y: Global.current_data[3].y + Global.maxY * 0.08 }} textAnchor="start" style={{ stroke: '#ff0000' }}/>
                                <VictoryLabel text="SGF" datum={{ x: Global.sgf_data[4].x, y: Global.sgf_data[4].y + Global.maxY * 0.08 }} textAnchor="start" style={{ stroke: '#00ffff' }}/>
                                <VictoryLabel text="Princial" datum={{ x: Global.princial_data[5].x, y: Global.princial_data[5].y + Global.maxY * 0.08 }} textAnchor="start" style={{ stroke: '#FFFFFF' }}/>

                            </VictoryGroup>

                        </VictoryChart>
                    </ScrollView>
                </Content>

                <CustomFooter navigation={this.props.navigation}/>
            </Container>
        );
    }
}

export default Graph;
