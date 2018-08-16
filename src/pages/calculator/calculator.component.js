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
import styles from './calculator.styled';
import Global from '../Global';
import CustomFooter from '../../components/footer/footer.component';
import PropTypes from "prop-types";

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flag_param: 0,

            cur_principle: null,
            cur_addition: null,
            cur_interest: null,
            cur_total: null,
            cur_inflation: null,
            cur_duration: null,

            cur_compound_unit: 'annually',
            cur_duration_unit: 'years',
            cur_addition_unit: 'monthly',

            potential_principle: null,
            potential_addition: null,
            potential_interest: null,
            potential_total: null,
            potential_inflation: null,
            potential_duration: null,

            potential_compound_unit: 'annually',
            potential_duration_unit: 'years',
            potential_addition_unit: 'monthly',

            m_time: 1,
            m_potentialcompound: 1,
            m_curcompound: 1,
            m_curaddition: 12,
            m_potentialaddition: 12,
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

    onChangeCurPrinciple(text) {
        this.setState({
            cur_principle: text,
            potential_principle: text,
        });

        this._potentialPrincipal.setNativeProps({ text });

        this.onCurrentInvestment();
        this.onPotentialInvestment();
    }

    onChangeCurAddition(text) {
        this.setState({ cur_addition: text });
        this.onCurrentInvestment();
    }

    onChangeCurInterest(text) {
        this.setState({ cur_interest: parseInt(text, 10) / 100 });
        this.onCurrentInvestment();
    }

    onChangeCurInflation(text) {
        this.setState({ cur_inflation: parseInt(text, 10) / 100 });
        this.onCurrentInvestment();
    }

    onChangeCurDuration(text) {
        this.setState({
            cur_duration: text,
            potential_duration: text,
        });

        this._potentialDuration.setNativeProps({ text });
        this.onCurrentInvestment();
        this.onPotentialInvestment();
    }

    onChangeCompoundUnit(text) {
        this.setState({ cur_compound_unit: text });
        this.onCurrentInvestment();
    }

    onChangeCurAdditionUnit(text) {
        this.setState({ cur_duration_unit: text });
        this.onCurrentInvestment();
    }

    onChangeDurationUnit(text) {
        this.setState({
            cur_duration_unit: text,
            potential_duration_unit: text,
        });
        this.onCurrentInvestment();
    }

    onCurrentInvestment() {
        if (this.state.cur_interest === null) return;
        if (this.state.cur_principle === null) return;
        if (this.state.cur_inflation === null) {
            this.setState({ cur_inflation: 0 });
        }
        if (this.state.cur_duration === null) return;
        if (this.state.cur_addition === null) {
            this.setState({ cur_addition: 0 });
        }

        if (this.state.cur_addition_unit === 'daily') {
            this.setState({ m_curaddition: 365 });
        } else if (this.state.cur_addition_unit === 'monthly') {
            this.setState({ m_curaddition: 12 });
        } else if (this.state.cur_addition_unit === 'quarterly') {
            this.setState({ m_curaddition: 4 });
        } else if (this.state.cur_addition_unit === 'semiannually') {
            this.setState({ m_curaddition: 2 });
        } else if (this.state.cur_addition_unit === 'annually') {
            this.setState({ m_curaddition: 1 });
        }

        if (this.state.cur_compound_unit === 'daily') {
            this.setState({ m_curcompound: 365 });
        } else if (this.state.cur_compound_unit === 'monthly') {
            this.setState({ m_curcompound: 12 });
        } else if (this.state.cur_compound_unit === 'quarterly') {
            this.setState({ m_curcompound: 4 });
        } else if (this.state.cur_compound_unit === 'semiannually') {
            this.setState({ m_curcompound: 2 });
        } else if (this.state.cur_compound_unit === 'annually') {
            this.setState({ m_curcompound: 1 });
        }

        if (this.state.cur_duration_unit === 'days') {
            this.setState({ m_time: 1 / 365 });
        } else if (this.state.cur_duration_unit === 'months') {
            this.setState({ m_time: 1 / 12 });
        } else if (this.state.cur_duration_unit === 'years') {
            this.setState({ m_time: 1 });
        }

        const RperN = (this.state.cur_interest - this.state.cur_inflation)
            / this.state.m_curaddition;

        let result = this.state.cur_principle * (1 + (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curcompound) ** (this.state.m_curcompound * this.state.m_time * this.state.cur_duration);
        const resultAddition = this.state.cur_addition * (((1 + RperN) ** (this.state.m_curaddition * this.state.m_time * this.state.cur_duration) - 1) / (RperN));// * (1 + (RperN));

        result += resultAddition;
        result = result.toFixed(2);

        this._curTotal.setNativeProps({ text: result.toString() });
    }

    onChangePotentialInterest(text) {
        this.setState({ potential_interest: parseInt(text, 10) / 100 });
        this.onPotentialInvestment();
    }

    onChangePotentialInflation(text) {
        this.setState({ potential_inflation: parseInt(text, 10) / 100 });
        this.onPotentialInvestment();
    }

    onChangePotentialCompoundUnit(text) {
        this.setState({ potential_compound_unit: text });
        this.onPotentialInvestment();
    }

    onChangePotentialAddition(text) {
        this.setState({ potential_addition: text });
        this.onPotentialInvestment();
    }

    onChangePotentialAdditionUnit(text) {
        this.setState({ potential_addition_unit: text });
        this.onPotentialInvestment();
    }

    onPotentialInvestment() {
        if (this.state.potential_interest === null) return;
        if (this.state.potential_principle === null) return;
        if (this.state.potential_inflation === null) {
            this.setState({ m_time: 1 / 365 });
        }
        if (this.state.potential_duration === null) return;
        if (this.state.potential_addition === null) {
            this.setState({ potential_addition: 0 });
        }

        if (this.state.potential_addition_unit === 'daily') {
            this.setState({ m_potentialaddition: 365 });
        } else if (this.state.potential_addition_unit === 'monthly') {
            this.setState({ m_potentialaddition: 12 });
        } else if (this.state.potential_addition_unit === 'quarterly') {
            this.setState({ m_potentialaddition: 4 });
        } else if (this.state.potential_addition_unit === 'semiannually') {
            this.setState({ m_potentialaddition: 2 });
        } else if (this.state.potential_addition_unit === 'annually') {
            this.setState({ m_potentialaddition: 1 });
        }

        if (this.state.potential_compound_unit === 'daily') {
            this.setState({ m_potentialcompound: 365 });
        } else if (this.state.potential_compound_unit === 'monthly') {
            this.setState({ m_potentialcompound: 12 });
        } else if (this.state.potential_compound_unit === 'quarterly') {
            this.setState({ m_potentialcompound: 4 });
        } else if (this.state.potential_compound_unit === 'semiannually') {
            this.setState({ m_potentialcompound: 2 });
        } else if (this.state.potential_compound_unit === 'annually') {
            this.setState({ m_potentialcompound: 1 });
        }

        if (this.state.cur_duration_unit === 'days') {
            this.setState({ m_time: 1 / 365 });
        } else if (this.state.cur_duration_unit === 'months') {
            this.setState({ m_time: 1 / 12 });
        } else if (this.state.cur_duration_unit === 'years') {
            this.setState({ m_time: 1 });
        }

        const RperN = (this.state.potential_interest - this.state.potential_inflation)
            / this.state.m_potentialaddition;

        let result = this.state.potential_principle * (1 + (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialcompound) ** (this.state.m_potentialcompound * this.state.m_time * this.state.potential_duration);
        const resultAddition = this.state.potential_addition * (((1 + RperN) ** (this.state.m_potentialaddition * this.state.m_time * this.state.potential_duration) - 1) / (RperN));

        result += resultAddition;
        result = result.toFixed(0);

        this._potentialTotal.setNativeProps({ text: result.toString() });
    }

    onGraph() {
        let days = this.state.potential_duration;

        let m_time_tmp = this.state.m_time;

        if (this.state.potential_duration < 5) {
            if (this.state.cur_duration_unit === 'months') {
                days *= 30;
                Global.xAxis_label = 'Investment During (days)';
                m_time_tmp = 1 / 365;
            } else if (this.state.cur_duration_unit === 'years') {
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

    onAmortization() {
        let days = this.state.potential_duration;

        let m_time_tmp = this.state.m_time;

        if (this.state.potential_duration < 8) {
            if (this.state.cur_duration_unit === 'months') {
                days *= 30;
                m_time_tmp = 1 / 365;
                Global.tableHeaderDays = 'days';
            } else if (this.state.cur_duration_unit === 'years') {
                days *= 12;
                m_time_tmp = 1 / 12;
                Global.tableHeaderDays = 'months';
            }
        } else { Global.tableHeaderDays = this.state.cur_duration_unit; }

        Global.tableData = [[0, parseInt(this.state.cur_principle, 10), 0]];

        let resultSGF = 0;

        for (let i = 1; i <= days; i += 1) {
            const RperNSGF = (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialaddition;

            resultSGF = this.state.cur_principle * (1 + (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialcompound) ** (this.state.m_potentialcompound * m_time_tmp * i);

            const resultAdditionSGF = this.state.potential_addition * (((1 + RperNSGF) ** (this.state.m_potentialaddition * m_time_tmp * i) - 1) / (RperNSGF));// * (1 + (RperNSGF));

            resultSGF += resultAdditionSGF;

            const deposite = this.state.potential_addition * this.state.m_potentialaddition * m_time_tmp * i;

            let interestTotal = resultSGF - this.state.cur_principle - deposite;

            interestTotal = interestTotal.toFixed(2);

            Global.tableData.push([i, parseInt(resultSGF.toFixed(2), 10), interestTotal]);
        }

        if (Global.tableData.length > 1) this.props.navigation.navigate('Amortization');
    }

    render() {
        const compoundUnit = [
            { value: 'daily' },
            { value: 'monthly' },
            { value: 'quarterly' },
            { value: 'semiannually' },
            { value: 'annually' },
        ];

        const durationUnit = [
            { value: 'days' },
            { value: 'months' },
            { value: 'years' },
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

                        <View style = {styles.first}>
                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Principal($) </Text>
                            <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangeCurPrinciple(text)}
                                value = { this.state.cur_principle}
                                maxLength={11}
                            />
                        </View>

                        <View style = {styles.second}>
                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Interest(%) </Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangeCurInterest(text)}
                                value = { this.state.cur_interest}
                                maxLength={11}
                            />

                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Inflation(%) </Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangeCurInflation(text)}
                                value = { this.state.cur_inflation}
                                maxLength={11}
                            />
                        </View>
                        <View style = {[styles.first, { justifyContent: 'flex-end' }]}>

                            <Text style = {{ marginTop: 15, marginRight: 40, color: '#ffffff' }}> Compound </Text>

                            <View style = {{ marginRight: 15, width: 150 }}>
                                <Dropdown
                                    textColor = '#ffffff'
                                    containerStyle={{
                                        marginTop: 15, borderWidth: 1, borderColor: 'lightgrey', backgroundColor: '#101010', borderRadius: 5, width: 150, height: 40, paddingLeft: 20,
                                    }}
                                    rippleCentered={true}
                                    inputContainerStyle={{ marginTop: -20, borderBottomColor: 'transparent' }}
                                    data={compoundUnit}
                                    selectedItemColor='#0000ff'

                                    onChangeText = {text => this.onChangeCompoundUnit(text)}

                                    disabledItemColor= '#ffff00'
                                    pickerStyle = {{ backgroundColor: '#ffffff' }}
                                    value = "annually"
                                    baseColor = '#ffffff'

                                />
                            </View>

                        </View>


                        <View style = {styles.second}>
                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Duration </Text>
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

                            <View style = {{ marginRight: 15, width: 150 }}>
                                <Dropdown
                                    textColor = '#ffffff'
                                    containerStyle={{
                                        marginTop: 15, borderWidth: 1, borderColor: 'lightgrey', backgroundColor: '#101010', borderRadius: 5, width: 150, height: 40, paddingLeft: 20,
                                    }}
                                    rippleCentered={true}
                                    inputContainerStyle={{ marginTop: -20, borderBottomColor: 'transparent' }}

                                    data={durationUnit}
                                    selectedItemColor='#0000ff'

                                    onChangeText = {text => this.onChangeDurationUnit(text)}

                                    disabledItemColor= '#ffff00'
                                    pickerStyle = {{ backgroundColor: '#ffffff' }}
                                    value = "years"
                                    baseColor = '#ffffff'

                                />
                            </View>
                        </View>

                        <View style = {styles.first}>

                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Addition($) </Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangeCurAddition(text)}
                                value = { this.state.cur_addition}
                                maxLength={11}
                            />

                            <View style = {{ marginRight: 15, width: 150 }}>
                                <Dropdown
                                    textColor = '#ffffff'
                                    containerStyle={{
                                        marginTop: 15, borderWidth: 1, borderColor: 'lightgrey', backgroundColor: '#101010', borderRadius: 5, width: 150, height: 40, paddingLeft: 20,
                                    }}
                                    rippleCentered={true}
                                    inputContainerStyle={{ marginTop: -20, borderBottomColor: 'transparent' }}
                                    data={compoundUnit}
                                    selectedItemColor	='#0000ff'

                                    disabledItemColor= '#ffff00'
                                    onChangeText = {text => this.onChangeCurAdditionUnit(text)}

                                    pickerStyle = {{ backgroundColor: '#ffffff' }}
                                    value = "monthly"
                                    baseColor = '#ffffff'
                                />
                            </View>
                        </View>

                        <View style = {styles.second}>
                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Total Return </Text>
                            <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                editable={false}
                                selectTextOnFocus={false}
                                ref={component => this._curTotal = component}

                            />

                        </View>

                        <View style = {{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                            <Text style = {{ color: '#ffffff', fontSize: 20 }}>
                                Potential Investment Strategy
                            </Text>
                        </View>

                        <View style = {styles.first}>


                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Principal($) </Text>
                            <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"

                                editable={false}
                                selectTextOnFocus={false}
                                ref={component => this._potentialPrincipal = component}
                            />
                        </View>

                        <View style = {styles.second}>
                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Interest(%) </Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangePotentialInterest(text)}
                                value = { this.state.potential_interest}
                                maxLength={11}
                            />

                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Inflation(%) </Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangePotentialInflation(text)}
                                value = { this.state.potential_inflation}
                                maxLength={11}
                            />
                        </View>
                        <View style = {[styles.first, { justifyContent: 'flex-end' }]}>

                            <Text style = {{ marginTop: 15, marginRight: 40, color: '#ffffff' }}> Compound </Text>

                            <View style = {{ marginRight: 15, width: 150 }}>
                                <Dropdown
                                    textColor = '#ffffff'
                                    containerStyle={{
                                        marginTop: 15, borderWidth: 1, borderColor: 'lightgrey', backgroundColor: '#101010', borderRadius: 5, width: 150, height: 40, paddingLeft: 20,
                                    }}
                                    rippleCentered={true}
                                    inputContainerStyle={{ marginTop: -20, borderBottomColor: 'transparent' }}
                                    data={compoundUnit}
                                    selectedItemColor='#0000ff'

                                    onChangeText = {text => this.onChangePotentialCompoundUnit(text)}

                                    disabledItemColor= '#ffff00'
                                    pickerStyle = {{ backgroundColor: '#ffffff' }}
                                    value = "annually"
                                    baseColor = '#ffffff'

                                />
                            </View>

                        </View>


                        <View style = {styles.second}>
                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Duration </Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"


                                editable={false}
                                selectTextOnFocus={false}
                                ref={component => this._potentialDuration = component}
                            />

                            <View style = {{ marginRight: 15, width: 150 }}>
                                <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}>
                                    {this.state.potential_duration_unit}

                                </Text>
                            </View>
                        </View>

                        <View style = {styles.first}>

                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Addition($) </Text>
                            <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {text => this.onChangePotentialAddition(text)}
                                value = { this.state.cur_addition}
                                maxLength={11}
                            />

                            <View style = {{ marginRight: 15, width: 150 }}>
                                <Dropdown
                                    textColor = '#ffffff'
                                    containerStyle={{
                                        marginTop: 15, borderWidth: 1, borderColor: 'lightgrey', backgroundColor: '#101010', borderRadius: 5, width: 150, height: 40, paddingLeft: 20,
                                    }}
                                    rippleCentered={true}
                                    inputContainerStyle={{ marginTop: -20, borderBottomColor: 'transparent' }}
                                    data={compoundUnit}
                                    selectedItemColor	='#0000ff'

                                    disabledItemColor= '#ffff00'
                                    onChangeText = {text => this.onChangePotentialAdditionUnit(text)}

                                    pickerStyle = {{ backgroundColor: '#ffffff' }}
                                    value = "monthly"
                                    baseColor = '#ffffff'
                                />
                            </View>
                        </View>

                        <View style = {styles.second}>
                            <Text style = {{ marginTop: 15, marginLeft: 10, color: '#ffffff' }}> Total Return </Text>
                            <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                editable={false}
                                selectTextOnFocus={false}
                                ref={component => this._potentialTotal = component}

                            />
                        </View>

                        <TouchableOpacity style = {styles.btn_graph} onPress = {() => this.onGraph('Graph')}>
                            <Image source={require('../../assets/images/btn_Graph.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.btn_graph} onPress = {() => this.onAmortization()}>
                            <Image source={require('../../assets/images/btn_Table.png')}/>
                        </TouchableOpacity>
                    </Content>

                    <CustomFooter navigation={this.props.navigation}/>
                </ImageBackground>

            </Container>


        );
    }
}

export default Calculator;
