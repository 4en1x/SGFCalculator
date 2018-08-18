import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { View, Dimensions, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import PropTypes from 'prop-types';
import CustomFooter from '../../components/footer/footer.component';

import styles from './table.styled';
import Global from '../Global';

class CustomTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableHeadOne: [Global.tableHeaderOneDays, 'Result', 'Interest'],
            tableHeadTwo: [Global.tableHeaderTwoDays, 'Interest'],
            widthArr: [
                Dimensions.get('screen').width / 7,
                Dimensions.get('screen').width / 2,
                Dimensions.get('screen').width / 3,
            ],
        };
    }

    static navigationOptions = {
        title: 'Table',
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

    static get propTypes() {
        return {
            navigation: PropTypes.shape({
                navigate: PropTypes.func,
            }),
        };
    }

    onGraph() {
        if (Global.maxY > 1) this.props.navigation.navigate('Graph');
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        <ScrollView style={styles.dataWrapper}>
                            <View style = {{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                                <Text style = {{ color: '#ffffff', fontSize: 20 }}>
                                    Current Investment Strategy
                                </Text>
                            </View>
                            <Table borderStyle={{ borderColor: '#000000' }}>
                                <Row
                                    data={this.state.tableHeadOne}
                                    widthArr={this.state.widthArr}
                                    style={styles.header}
                                    textStyle={styles.headertext}
                                />
                            </Table>
                            <Table borderStyle={{ borderColor: '#000000' }}>
                                {
                                    Global.tableDataOne.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={this.state.widthArr}
                                            style={[styles.row, index % 2 && { backgroundColor: '#63656e' }]}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                            <View style = {{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                                <Text style = {{ color: '#ffffff', fontSize: 20 }}>
                                    Potential Investment Strategy
                                </Text>
                            </View>
                            <Table borderStyle={{ borderColor: '#000000' }}>
                                <Row
                                    data={this.state.tableHeadTwo}
                                    widthArr={this.state.widthArr}
                                    style={styles.header}
                                    textStyle={styles.headertext}
                                />
                            </Table>
                            <Table borderStyle={{ borderColor: '#000000' }}>
                                {
                                    Global.tableDataTwo.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={this.state.widthArr}
                                            style={[styles.row, index % 2 && { backgroundColor: '#63656e' }]}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>

                    </View>
                </Content>

                <CustomFooter navigation={this.props.navigation}/>
            </Container>
        );
    }
}

export default CustomTable;
