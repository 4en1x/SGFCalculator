import React, { Component } from 'react';
import {
    Container,
    Text,
    Content,
} from 'native-base';
import {
    Image, View, ImageBackground, TouchableOpacity, TextInput,
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
import styles from './calculator.styled';
import Global from '../Global';
import CustomFooter from '../../components/footer/footer.component';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flag_param: 0,

            cur_principle: 0,
            cur_addition: 0,
            cur_interest: 0,
            cur_total: null,
            cur_inflation: 0,
            cur_duration: null,

            cur_compound_unit: 'Annually',
            cur_duration_unit: 'Years',
            cur_addition_unit: 'Monthly',

            potential_principle: 0,
            potential_addition: 0,
            potential_interest: 0,
            potential_total: null,
            potential_inflation: 0,
            potential_duration: null,

            potential_compound_unit: 'Annually',
            potential_duration_unit: 'Years',
            potential_addition_unit: 'Monthly',

            m_time: 1,
            m_potentialcompound: 1,
            m_curcompound: 1,
            m_curaddition: 12,
            m_potentialaddition: 12,

            curTotal: 0,
            potentialTotal: 0,
        };
    }

    static navigationOptions = {
        title: 'Calculator',
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

    async onChangeCurPrinciple(text) {
        await this.setState({
            cur_principle: parseFloat(text) || 0,
            potential_principle: parseFloat(text) || 0,
        });

        this.onCurrentInvestment();
        this.onPotentialInvestment();
    }

    async onChangeCurAddition(text) {
        await this.setState({ cur_addition: text });
        this.onCurrentInvestment();
    }

    async onChangeCurInterest(text) {
        await this.setState({ cur_interest: parseFloat(text) / 100 || 0 });
        this.onCurrentInvestment();
    }

    async onChangeCurInflation(text) {
        await this.setState({ cur_inflation: parseFloat(text) / 100 || 0 });
        this.onCurrentInvestment();
    }

    async onChangeCurDuration(text) {
        await this.setState({
            cur_duration: text,
            potential_duration: text,
        });

        await this._potentialDuration.setNativeProps({ text });

        this.onCurrentInvestment();
        this.onPotentialInvestment();
    }

    async onChangeCompoundUnit(text) {
        await this.setState({ cur_compound_unit: text });
        this.onCurrentInvestment();
    }

    async onChangeCurAdditionUnit(text) {
        await this.setState({ cur_duration_unit: text });
        this.onCurrentInvestment();
    }

    async onChangeDurationUnit(text) {
        await this.setState({
            cur_duration_unit: text,
            potential_duration_unit: text,
        });

        this.onCurrentInvestment();
    }

    async onCurrentInvestment() {
        if (this.state.cur_interest === null) return;
        if (this.state.cur_principle === null) return;
        if (this.state.cur_inflation === null) {
            await this.setState({ cur_inflation: 0 });
        }
        if (this.state.cur_duration === null) return;
        if (this.state.cur_addition === null) {
            await this.setState({ cur_addition: 0 });
        }

        if (this.state.cur_addition_unit === 'Daily') {
            await this.setState({ m_curaddition: 365 });
        } else if (this.state.cur_addition_unit === 'Weekly') {
            await this.setState({ m_curaddition: 52 });
        } else if (this.state.cur_addition_unit === 'Monthly') {
            await this.setState({ m_curaddition: 12 });
        } else if (this.state.cur_addition_unit === 'Quarterly') {
            await this.setState({ m_curaddition: 4 });
        } else if (this.state.cur_addition_unit === 'Semi-Annually') {
            await this.setState({ m_curaddition: 2 });
        } else if (this.state.cur_addition_unit === 'Annually') {
            await this.setState({ m_curaddition: 1 });
        }

        if (this.state.cur_compound_unit === 'Daily') {
            await this.setState({ m_curcompound: 365 });
        } else if (this.state.cur_addition_unit === 'Weekly') {
            await this.setState({ m_curaddition: 52 });
        } else if (this.state.cur_compound_unit === 'Monthly') {
            await this.setState({ m_curcompound: 12 });
        } else if (this.state.cur_compound_unit === 'Quarterly') {
            await this.setState({ m_curcompound: 4 });
        } else if (this.state.cur_compound_unit === 'Semi-Annually') {
            await this.setState({ m_curcompound: 2 });
        } else if (this.state.cur_compound_unit === 'Annually') {
            await this.setState({ m_curcompound: 1 });
        }

        if (this.state.cur_duration_unit === 'Days') {
            await this.setState({ m_time: 1 / 365 });
        } else if (this.state.cur_duration_unit === 'Months') {
            await this.setState({ m_time: 1 / 12 });
        } else if (this.state.cur_duration_unit === 'Years') {
            await this.setState({ m_time: 1 });
        }

        const RperN = (this.state.cur_interest - this.state.cur_inflation)
            / this.state.m_curaddition;

        let result = this.state.cur_principle * (1 + (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curcompound) ** (this.state.m_curcompound * this.state.m_time * this.state.cur_duration);
        const resultAddition = this.state.cur_addition * (((1 + RperN) ** (this.state.m_curaddition * this.state.m_time * this.state.cur_duration) - 1) / (RperN));// * (1 + (RperN));

        result += resultAddition;
        result = result.toFixed(2);

        this.setState({ curTotal: result.toString() });
    }

    async onChangePotentialInterest(text) {
        await this.setState({ potential_interest: parseFloat(text) / 100 || 0 });
        this.onPotentialInvestment();
    }

    async onChangePotentialInflation(text) {
        await this.setState({ potential_inflation: parseFloat(text) / 100 || 0 });
        this.onPotentialInvestment();
    }

    async onChangePotentialCompoundUnit(text) {
        await this.setState({ potential_compound_unit: text });
        this.onPotentialInvestment();
    }

    async onChangePotentialAddition(text) {
        await this.setState({ potential_addition: text });
        this.onPotentialInvestment();
    }

    async onChangePotentialAdditionUnit(text) {
        await this.setState({ potential_addition_unit: text });
        this.onPotentialInvestment();
    }

    async onPotentialInvestment() {
        if (this.state.potential_interest === null) return;
        if (this.state.potential_principle === null) return;
        if (this.state.potential_inflation === null) {
            await this.setState({ m_time: 1 / 365 });
        }
        if (this.state.potential_duration === null) return;
        if (this.state.potential_addition === null) {
            await this.setState({ potential_addition: 0 });
        }

        if (this.state.potential_addition_unit === 'Daily') {
            await this.setState({ m_potentialaddition: 365 });
        } else if (this.state.potential_addition_unit === 'Weekly') {
            await this.setState({ m_potentialaddition: 52 });
        } else if (this.state.potential_addition_unit === 'Monthly') {
            await this.setState({ m_potentialaddition: 12 });
        } else if (this.state.potential_addition_unit === 'Quarterly') {
            await this.setState({ m_potentialaddition: 4 });
        } else if (this.state.potential_addition_unit === 'Semi-Annually') {
            await this.setState({ m_potentialaddition: 2 });
        } else if (this.state.potential_addition_unit === 'Annually') {
            await this.setState({ m_potentialaddition: 1 });
        }

        if (this.state.potential_compound_unit === 'Daily') {
            await this.setState({ m_potentialcompound: 365 });
        } else if (this.state.potential_addition_unit === 'Weekly') {
            await this.setState({ m_potentialaddition: 52 });
        } else if (this.state.potential_compound_unit === 'Monthly') {
            await this.setState({ m_potentialcompound: 12 });
        } else if (this.state.potential_compound_unit === 'Quarterly') {
            await this.setState({ m_potentialcompound: 4 });
        } else if (this.state.potential_compound_unit === 'Semi-Annually') {
            await this.setState({ m_potentialcompound: 2 });
        } else if (this.state.potential_compound_unit === 'Annually') {
            await this.setState({ m_potentialcompound: 1 });
        }

        if (this.state.cur_duration_unit === 'Days') {
            await this.setState({ m_time: 1 / 365 });
        } else if (this.state.cur_duration_unit === 'Months') {
            await this.setState({ m_time: 1 / 12 });
        } else if (this.state.cur_duration_unit === 'Years') {
            await this.setState({ m_time: 1 });
        }

        const RperN = (this.state.potential_interest - this.state.potential_inflation)
            / this.state.m_potentialaddition;

        let result = this.state.potential_principle * (1 + (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialcompound) ** (this.state.m_potentialcompound * this.state.m_time * this.state.potential_duration);
        const resultAddition = this.state.potential_addition * (((1 + RperN) ** (this.state.m_potentialaddition * this.state.m_time * this.state.potential_duration) - 1) / (RperN));

        result += resultAddition;
        result = result.toFixed(2);

        this.setState({ potentialTotal: result.toString() });
    }

    makeResult(text) {
        let returnText = text;
        if (!text || isNaN(text)) {
            returnText = '0';
        }

        return `$${returnText.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }

    onGraph() {
        let days = this.state.potential_duration;

        let m_time_tmp = this.state.m_time;

        if (this.state.potential_duration < 5) {
            if (this.state.cur_duration_unit === 'Months') {
                days *= 30;
                Global.xAxis_label = 'Investment During (days)';
                m_time_tmp = 1 / 365;
            } else if (this.state.cur_duration_unit === 'Years') {
                days *= 12;
                m_time_tmp = 1 / 12;
                Global.xAxis_label = 'Investment During (months)';
            }
        } else {
            Global.xAxis_label = `${'Investment During ('}${this.state.cur_duration_unit})`;
        }
        Global.princial_data = [{ x: 0, y: parseInt(this.state.cur_principle, 10) }];
        Global.current_data = [{ x: 0, y: parseInt(this.state.cur_principle, 10) }];
        Global.sgf_data = [{ x: 0, y: parseInt(this.state.cur_principle, 10) }];

        let resultSGF = 0;
        let resultCurrent = 0;
        let resultPrincipal = 0;

        for (let i = 1; i <= days; i += 1) {
            const RperNSGF = (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialaddition;
            resultSGF = this.state.cur_principle * (1 + (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialcompound) ** (this.state.m_potentialcompound * m_time_tmp * i);
            const resultAdditionSGF = this.state.potential_addition * (((1 + RperNSGF) ** (this.state.m_potentialaddition * m_time_tmp * i) - 1) / (RperNSGF));
            resultSGF += resultAdditionSGF;

            const RperNCurrent = (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curaddition;
            resultCurrent = this.state.cur_principle * (1 + (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curcompound) ** (this.state.m_curcompound * m_time_tmp * i);
            const resultAdditionCurrent = this.state.cur_addition * (((1 + RperNCurrent) ** (this.state.m_curaddition * m_time_tmp * i) - 1) / (RperNCurrent));
            resultCurrent += resultAdditionCurrent;

            resultPrincipal = this.state.cur_principle * (1 + (this.state.cur_interest - this.state.cur_inflation) * m_time_tmp * i);

            Global.princial_data.push({ x: i, y: parseInt(resultPrincipal.toFixed(0), 10) });
            Global.current_data.push({ x: i, y: parseInt(resultCurrent.toFixed(0), 10) });
            Global.sgf_data.push({ x: i, y: parseInt(resultSGF.toFixed(0), 10) });
        }
        if (resultSGF >= resultCurrent && resultSGF >= resultPrincipal) {
            Global.maxY = parseInt(resultSGF.toFixed(0), 10);
        } else if (resultCurrent >= resultSGF && resultCurrent >= resultPrincipal) {
            Global.maxY = parseInt(resultCurrent.toFixed(0), 10);
        } else { resultCurrent = parseInt(resultCurrent.toFixed(0), 10); }

        if (Global.maxY < 1) return;
        this.props.navigation.navigate('Graph');
    }

    onTable() {
        this.fillTableOne();
        this.fillTableTwo();

        if (Global.tableDataOne.length > 1 || Global.tableDataOne.length > 1) {
            this.props.navigation.navigate('Table');
        }
    }

    fillTableOne() {
        let days = this.state.cur_duration;

        let m_time_tmp = this.state.m_time;
        Global.tableHeaderOneDays = this.state.cur_duration_unit;

        Global.tableDataOne = [[0, `$${parseInt(this.state.cur_principle, 10)}`, '$0']];

        let resultSGF = 0;

        for (let i = 1; i <= days; i += 1) {
            const RperNSGF = (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curaddition;
            resultSGF = this.state.cur_principle * (1 + (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curcompound) ** (this.state.m_curcompound * m_time_tmp * i);
            const resultAdditionSGF = this.state.cur_addition * (((1 + RperNSGF) ** (this.state.m_curaddition * m_time_tmp * i) - 1) / (RperNSGF));
            resultSGF += resultAdditionSGF;
            const deposite = this.state.cur_addition * this.state.m_curaddition * m_time_tmp * i;
            let interestTotal = resultSGF - this.state.cur_principle - deposite;
            interestTotal = interestTotal.toFixed(2);
            Global.tableDataOne.push([i, `$${parseInt(resultSGF.toFixed(2), 10)}`, `$${interestTotal}`]);
        }
    }

    fillTableTwo() {
        let days = this.state.potential_duration;

        let m_time_tmp = this.state.m_time;
        Global.tableHeaderTwoDays = this.state.cur_duration_unit;

        Global.tableDataTwo = [[0, `$${parseInt(this.state.cur_principle, 10)}`, '$0']];

        let resultSGF = 0;

        for (let i = 1; i <= days; i += 1) {
            const RperNSGF = (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialaddition;
            resultSGF = this.state.cur_principle * (1 + (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialcompound) ** (this.state.m_potentialcompound * m_time_tmp * i);
            const resultAdditionSGF = this.state.potential_addition * (((1 + RperNSGF) ** (this.state.m_potentialaddition * m_time_tmp * i) - 1) / (RperNSGF));
            resultSGF += resultAdditionSGF;
            const deposite = this.state.potential_addition * this.state.m_potentialaddition * m_time_tmp * i;
            let interestTotal = resultSGF - this.state.cur_principle - deposite;
            interestTotal = interestTotal.toFixed(2);
            Global.tableDataTwo.push([i, `$${parseInt(resultSGF.toFixed(2), 10)}`, `$${interestTotal}`]);
        }
    }

    render() {
        const compoundUnit = [
            { value: 'Daily' },
            { value: 'Weekly' },
            { value: 'Monthly' },
            { value: 'Quarterly' },
            { value: 'Semi-Annually' },
            { value: 'Annually' },
        ];

        const durationUnit = [
            { value: 'Days' },
            { value: 'Months' },
            { value: 'Years' },
        ];

        return (
            <Container>
                <ImageBackground source = {require('../../assets/images/calculator.png')} style={{ flex: 1 }}>
                    <Content>
                        <View style = {{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                            <Text style = {{ color: '#ffffff', fontSize: 20 }}>
                                Current Investment Strategy
                            </Text>
                        </View>

                        <View style={styles.first}>
                            <Text style={{ marginLeft: 10, color: '#ffffff' }}>Principal</Text>
                            <TextInput
                                style={styles.input1}
                                underlineColorAndroid="transparent"
                                placeholder="$0"
                                placeholderTextColor="#ffffff"
                                autoCapitalize="none"
                                keyboardType='numeric'
                                onChangeText={text => this.onChangeCurPrinciple(text.split('$').pop())}
                                value={`$${this.state.cur_principle}`}
                                maxLength={11}
                            />
                        </View>

                        <View style={styles.second}>
                            <Text style={{ marginLeft: 10, color: '#ffffff' }}>Interest</Text>
                            <TextInput style={styles.input2}
                                underlineColorAndroid="transparent"
                                placeholder="%0"
                                placeholderTextColor="#ffffff"
                                autoCapitalize="none"
                                keyboardType='numeric'
                                onChangeText={text => this.onChangeCurInterest(text.split('%').pop())}
                                value={`%${(this.state.cur_interest * 100).toFixed(0)}`}
                                maxLength={11}
                            />

                            <Text style={{ color: '#ffffff' }}>Inflation</Text>
                            <TextInput style={styles.input2}
                                underlineColorAndroid="transparent"
                                placeholder="%0"
                                placeholderTextColor="#ffffff"
                                autoCapitalize="none"
                                keyboardType='numeric'
                                onChangeText={text => this.onChangeCurInflation(text.split('%').pop())}
                                value={`%${(this.state.cur_inflation * 100).toFixed(0)}`}
                                maxLength={11}
                            />
                        </View>

                        <View style = {[styles.first, { paddingRight: 15 }]}>
                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Compound</Text>
                            <Dropdown
                                textColor = '#ffffff'
                                containerStyle={styles.dropdownContainer}
                                rippleCentered={true}
                                inputContainerStyle={styles.dropdownInputContainer}
                                data={compoundUnit}
                                selectedItemColor='#0000ff'
                                onChangeText = {text => this.onChangeCompoundUnit(text)}
                                disabledItemColor= '#ffff00'
                                pickerStyle = {{ backgroundColor: '#ffffff' }}
                                value = "Annually"
                                baseColor = '#ffffff'
                            />
                        </View>

                        <View style = {[styles.second, { paddingRight: 15 }]}>
                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Duration</Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangeCurDuration(text)}
                                value = { this.state.cur_duration}
                                maxLength={11}
                            />

                            <Dropdown
                                textColor = '#ffffff'
                                containerStyle={styles.dropdownContainer}
                                rippleCentered={true}
                                inputContainerStyle={styles.dropdownInputContainer}
                                data={durationUnit}
                                selectedItemColor='#0000ff'
                                onChangeText = {text => this.onChangeDurationUnit(text)}
                                disabledItemColor= '#ffff00'
                                pickerStyle = {{ backgroundColor: '#ffffff' }}
                                value = "Years"
                                baseColor = '#ffffff'
                            />
                        </View>

                        <View style={[styles.first, { paddingRight: 15 }]}>
                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Addition</Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "$0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangeCurAddition(text.split('$').pop())}
                                value={`$${this.state.cur_addition}`}
                                maxLength={11}
                            />

                            <Dropdown
                                textColor = '#ffffff'
                                containerStyle={styles.dropdownContainer}
                                rippleCentered={true}
                                inputContainerStyle={styles.dropdownInputContainer}
                                data={compoundUnit}
                                selectedItemColor='#0000ff'
                                disabledItemColor= '#ffff00'
                                onChangeText = {text => this.onChangeCurAdditionUnit(text)}
                                pickerStyle = {{ backgroundColor: '#ffffff' }}
                                value = "Monthly"
                                baseColor = '#ffffff'
                            />
                        </View>

                        <View style = {styles.second}>
                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Total Return</Text>
                            <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                editable={false}
                                selectTextOnFocus={false}
                                value={this.makeResult(this.state.curTotal)}
                            />
                        </View>


                        <View style = {{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                            <Text style = {{ color: '#ffffff', fontSize: 20 }}>
                                Potential Investment Strategy
                            </Text>
                        </View>

                        <View style = {styles.first}>
                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Principal</Text>
                            <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "$0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                editable={false}
                                selectTextOnFocus={false}
                                value={`$${this.state.potential_principle}`}
                            />
                        </View>

                        <View style = {styles.second}>
                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Interest</Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "%0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangePotentialInterest(text.split('%').pop())}
                                value = {`%${(this.state.potential_interest * 100).toFixed(0)}`}
                                maxLength={11}
                            />

                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Inflation</Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "%0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangePotentialInflation(text.split('%').pop())}
                                value = {`%${(this.state.potential_inflation * 100).toFixed(0)}`}
                                maxLength={11}
                            />
                        </View>

                        <View style={[styles.first, { paddingRight: 15 }]}>
                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Compound</Text>
                            <Dropdown
                                textColor = '#ffffff'
                                containerStyle={styles.dropdownContainer}
                                rippleCentered={true}
                                inputContainerStyle={styles.dropdownInputContainer}
                                data={compoundUnit}
                                selectedItemColor='#0000ff'
                                onChangeText = {text => this.onChangePotentialCompoundUnit(text)}
                                disabledItemColor= '#ffff00'
                                pickerStyle = {{ backgroundColor: '#ffffff' }}
                                value = "Annually"
                                baseColor = '#ffffff'
                            />
                        </View>

                        <View style={[styles.second, { paddingRight: 15 }]}>
                            <Text style={{ marginLeft: 10, color: '#ffffff' }}>Duration</Text>
                            <TextInput style={styles.input2}
                                underlineColorAndroid="transparent"
                                placeholder="0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                editable={false}
                                selectTextOnFocus={false}
                                ref={component => this._potentialDuration = component}
                            />

                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>
                                {this.state.potential_duration_unit}
                            </Text>
                        </View>

                        <View style={[styles.first, { paddingRight: 15 }]}>
                            <Text style={{ marginLeft: 10, color: '#ffffff' }}>Addition</Text>
                            <TextInput style={styles.input2}
                                underlineColorAndroid="transparent"
                                placeholder="$0"
                                placeholderTextColor="#ffffff"
                                autoCapitalize="none"
                                keyboardType='numeric'
                                onChangeText={text => this.onChangePotentialAddition(text.split('$').pop())}
                                value={`$${this.state.cur_addition}`}
                                maxLength={11}
                            />

                            <Dropdown
                                textColor = '#ffffff'
                                containerStyle={styles.dropdownContainer}
                                rippleCentered={true}
                                inputContainerStyle={styles.dropdownInputContainer}
                                data={compoundUnit}
                                selectedItemColor='#0000ff'
                                disabledItemColor= '#ffff00'
                                onChangeText = {text => this.onChangePotentialAdditionUnit(text)}
                                pickerStyle = {{ backgroundColor: '#ffffff' }}
                                value = "Monthly"
                                baseColor = '#ffffff'
                            />
                        </View>

                        <View style={styles.second}>
                            <Text style = {{ marginLeft: 10, color: '#ffffff' }}>Total Return</Text>
                            <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                editable={false}
                                selectTextOnFocus={false}
                                value={this.makeResult(this.state.potentialTotal)}
                            />
                        </View>

                        <TouchableOpacity style={styles.btn_graph} onPress = {() => this.onGraph('Graph')}>
                            <Image style={styles.btn_graph_inner} source={require('../../assets/images/btn_Graph.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn_graph} onPress = {() => this.onTable()}>
                            <Image style={styles.btn_graph_inner} source={require('../../assets/images/btn_Table.png')}/>
                        </TouchableOpacity>
                    </Content>

                    <CustomFooter navigation={this.props.navigation}/>
                </ImageBackground>
            </Container>
        );
    }
}

export default Calculator;
