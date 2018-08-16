import React, { Component } from "react";
import {
   
    Container,
    Contenet,
    Footer,
    Button,
    FooterTab,
    Icon,
    Text,
    Content,
    
} from "native-base"
import {   Image, SectionList, View,Dimensions,StyleSheet, ImageBackground,TouchableOpacity,ScrollView, TextInput,Picker, Alert, } from "react-native";
///rjc
import Expo, {FileSystem,ImagePicker, SQLite} from 'expo'
import { Dropdown } from 'react-native-material-dropdown';
import ExpandableList from './ExpandableList';
import Global from './Global';

class Calculator extends Component {
    constructor(props)
    {
      super(props);
  
      this.state = {
         flag_param : 0,
         
         cur_principle : null,
         cur_addition : null,
         cur_interest : null,
         cur_total:null,
         cur_inflation: null,
         cur_duration: null,

         cur_compound_unit :'annually',
         cur_duration_unit : 'years',
         cur_addition_unit : "monthly",

         potential_principle : null,
         potential_addition : null,
         potential_interest : null,
         potential_total:null,
         potential_inflation: null,
         potential_duration: null,

         potential_compound_unit :'annually',
         potential_duration_unit : 'years',
         potential_addition_unit : "monthly",


         m_time : 1,
         m_potentialcompound : 1,
         m_curcompound : 1,
         m_curaddition : 12,
         m_potentialaddition : 12,


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
onChangeCurPrinciple(text)
{
    this.state.cur_principle = text;
    this.state.potential_principle = text;

    this._potentialPrincipal.setNativeProps({text: text});

    this.onCurrentInvestment();
    this.onPotentialInvestment();
   
}
onChangeCurAddition(text)
{
    this.state.cur_addition= text;
    this.onCurrentInvestment();
 
}
onChangeCurInterest(text)
{
    this.state.cur_interest  = parseInt(text) / 100 ;
    this.onCurrentInvestment();
}
onChangeCurInflation(text)
{
    this.state.cur_inflation  = parseInt(text) / 100 ; 
    this.onCurrentInvestment();
    
}
onChangeCurDuration(text)
{
    this.state.cur_duration = text;
    this.state.potential_duration = text;
    this._potentialDuration.setNativeProps({text : text});
    this.onCurrentInvestment();
    this.onPotentialInvestment();
    
}
onChangeCompoundUnit(text)
{
    this.state.cur_compound_unit = text;
    this.onCurrentInvestment();
    
    
}
onChangeCurAdditionUnit(text)
{
    this.state.cur_addition_unit = text;
   // alert(this.state.cur_addition_unit);
    this.onCurrentInvestment();
}
onChangeDurationUnit(text)
{
    this.state.cur_duration_unit = text;
  
    this.setState({potential_duration_unit : text});
  //  this.state.potential_duration_unit = text;
  

    this.onCurrentInvestment();
}

onCurrentInvestment()
{
    
    if(this.state.cur_interest === null ) return;
    if(this.state.cur_principle ===null) return;
    if(this.state.cur_inflation ===null) this.state.cur_inflation  = 0;
    if(this.state.cur_duration ===null) return;
    if(this.state.cur_addition ===null) this.state.cur_addition = 0;
    
    var  m_principal  = this.state.cur_principle;
  
    var m_interest;
    var m_time;
    ////////   calculate  addition and total return   ////////////////////////
    if(this.state.cur_addition_unit === 'daily')
    {
        this.state.m_curaddition = 365;
    }
    else if(this.state.cur_addition_unit === 'monthly')
    {
        this.state.m_curaddition = 12;

    }
    else if(this.state.cur_addition_unit === 'quarterly')
    {
        this.state.m_curaddition = 4;
    }
    else if (this.state.cur_addition_unit === 'semiannually')
    {
        this.state.m_curaddition = 2;
    }
    else if(this.state.cur_addition_unit === 'annually')
    {
        this.state.m_curaddition = 1;
    }
    ///////////////////////////
    if(this.state.cur_compound_unit === 'daily')
    {
        this.state.m_curcompound = 365;
    }
    else if(this.state.cur_compound_unit === 'monthly')
    {
        this.state.m_curcompound = 12;

    }
    else if(this.state.cur_compound_unit === 'quarterly')
    {
        this.state.m_curcompound = 4;
    }
    else if (this.state.cur_compound_unit === 'semiannually')
    {
        this.state.m_curcompound = 2;
    }
    else if(this.state.cur_compound_unit === 'annually')
    {
        this.state.m_curcompound = 1;
    }

    if(this.state.cur_duration_unit === 'days')
    {
        this.state.m_time = 1 / 365;

    }
    else if(this.state.cur_duration_unit === 'months')
    {
        this.state.m_time = 1 / 12;

    }
    else if(this.state.cur_duration_unit === 'years')
    {

        this.state.m_time = 1;
    }

    let RperN = (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curaddition ;

    let result =  this.state.cur_principle * ( 1 + (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curcompound  ) ** (this.state.m_curcompound * this.state.m_time * this.state.cur_duration);
    let resultAddition = this.state.cur_addition * (((1 + RperN ) ** (this.state.m_curaddition * this.state.m_time * this.state.cur_duration)-1) /(RperN));// * (1 + (RperN)); 
    
  //  this.state.cur_interest *  this.state.cur_inflation * this.state.cur_duration;
   
    
    result   = result + resultAddition;

    result = result.toFixed(2);

    //////////////////// send result value /////////////////////////////////// //////////////////
    
     this._curTotal.setNativeProps({text: result.toString()});

    //////////////////////set result into global variable according to days//////////////////////
  
}

onChangePotentialInterest(text)
{

    this.state.potential_interest =parseInt(text) / 100 ;
    this.onPotentialInvestment();
}  
onChangePotentialInflation(text)
{
    this.state.potential_inflation = parseInt(text) / 100 ;
    this.onPotentialInvestment();
    
}
onChangePotentialCompoundUnit(text)
{
    this.state.potential_compound_unit = text;
    this.onPotentialInvestment();
}
onChangePotentialAddition(text)
{
    this.state.potential_addition= text;
    this.onPotentialInvestment();
 
}
onChangePotentialAdditionUnit(text)
{
    this.state.potential_addition_unit = text;
    this.onPotentialInvestment();
}
onPotentialInvestment()
{
    
    if(this.state.potential_interest === null ) return;
    if(this.state.potential_principle ===null) return;
    if(this.state.potential_inflation ===null) this.state.potential_inflation = 0;
    if(this.state.potential_duration ===null) return;
    if(this.state.potential_addition === null) this.state.potential_addition = 0;
    
    var  m_principal  = this.state.potential_principle;
  
    var m_interest;
    
    ////////   calculate  addition and total return   ////////////////////////

    if(this.state.potential_addition_unit === 'daily')
    {
        this.state.m_potentialaddition = 365;
    }
    else if(this.state.potential_addition_unit === 'monthly')
    {
        this.state.m_potentialaddition = 12;

    }
    else if(this.state.potential_addition_unit === 'quarterly')
    {
        this.state.m_potentialaddition = 4;
    }
    else if (this.state.potential_addition_unit === 'semiannually')
    {
        this.state.m_potentialaddition = 2;
    }
    else if(this.state.potential_addition_unit === 'annually')
    {
        this.state.m_potentialaddition = 1;
    }



    if(this.state.potential_compound_unit === 'daily')
    {
        this.state.m_potentialcompound = 365;
    }
    else if(this.state.potential_compound_unit === 'monthly')
    {
        this.state.m_potentialcompound = 12;

    }
    else if(this.state.potential_compound_unit === 'quarterly')
    {
        this.state.m_potentialcompound = 4;
    }
    else if (this.state.potential_compound_unit === 'semiannually')
    {
        this.state.m_potentialcompound = 2;
    }
    else if(this.state.potential_compound_unit === 'annually')
    {
        this.state.m_potentialcompound = 1;
    }

    if(this.state.cur_duration_unit === 'days')
    {
        this.state.m_time = 1 / 365;

    }
    else if(this.state.cur_duration_unit === 'months')
    {
        this.state.m_time = 1 / 12;

    }
    else if(this.state.cur_duration_unit === 'years')
    {

        this.state.m_time = 1;
    }
    let RperN = (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialaddition ;

    let result =  this.state.potential_principle * ( 1 + (this.state.potential_interest - this.state.potential_inflation) /  this.state.m_potentialcompound  ) ** ( this.state.m_potentialcompound * this.state.m_time * this.state.potential_duration);
    
    let resultAddition = this.state.potential_addition * (((1 + RperN ) ** (this.state.m_potentialaddition * this.state.m_time * this.state.potential_duration)-1) /(RperN));// * (1 + (RperN)); 
  //  this.state.cur_interest *  this.state.cur_inflation * this.state.cur_duration;
     
    result   = result + resultAddition;
    result = result.toFixed(0);

    //////////////////// send result value /////////////////////////////////// 
    this._potentialTotal.setNativeProps({text: result.toString()});

}

onGraph(param)
{

    var days = this.state.potential_duration;
    var m_time_tmp;
    
    m_time_tmp = this.state.m_time;

    // console.log(this.state.potential_duration);

    if(this.state.potential_duration < 5)
    {
        
        if(this.state.cur_duration_unit === 'months')
        {
            days = days * 30;
            Global.xAxis_label = "Investment During" + "(days)";
            m_time_tmp =  1 / 365;
        }
        else if(this.state.cur_duration_unit === 'years')
        {
            days = days * 12;
            m_time_tmp =  1 / 12;
            Global.xAxis_label = "Investment During" + "(months)";
        }
       
    }
    else
    {
        Global.xAxis_label ="Investment During" + "(" +  this.state.cur_duration_unit  + ")";
    }
    Global.princial_data = [{x : 0, y : parseInt(this.state.cur_principle)}];
    Global.current_data = [{x : 0, y : parseInt(this.state.cur_principle)}];
    Global.sgf_data = [{x : 0, y : parseInt(this.state.cur_principle)}];
    
    let resultSGF = 0;
    let resultCurrent = 0;
    let resultPrincipal =0;
    
    for(let i = 1 ; i <= days; i++)
    {
        let RperNSGF = (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialaddition ;
        resultSGF =  this.state.cur_principle * ( 1 + (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialcompound  ) ** (this.state.m_potentialcompound * m_time_tmp * i);
        let resultAdditionSGF = this.state.potential_addition * (((1 + RperNSGF ) ** (this.state.m_potentialaddition * m_time_tmp * i)-1) /(RperNSGF));// * (1 + (RperNSGF)); 
        resultSGF = resultSGF +  resultAdditionSGF;

        // console.log("result =======" + resultSGF);


      
        let RperNCurrent = (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curaddition ;
        resultCurrent =  this.state.cur_principle * ( 1 + (this.state.cur_interest - this.state.cur_inflation) / this.state.m_curcompound  ) ** (this.state.m_curcompound * m_time_tmp * i);        
        let resultAdditionCurrent = this.state.cur_addition * (((1 + RperNCurrent ) ** (this.state.m_curaddition *m_time_tmp * i)-1) /(RperNCurrent));// * (1 + (RperNCurrent)); 
        resultCurrent = resultCurrent + resultAdditionCurrent;

        resultPrincipal = this.state.cur_principle * (1 + (this.state.cur_interest - this.state.cur_inflation) * m_time_tmp * i );
      
      
       
        Global.princial_data.push({x : i ,y : parseInt(resultPrincipal.toFixed(0))});
        Global.current_data.push({x : i ,y : parseInt(resultCurrent.toFixed(0))});
        Global.sgf_data.push({x : i ,y : parseInt(resultSGF.toFixed(0))});
    }
    if(resultSGF >= resultCurrent && resultSGF >= resultPrincipal)
    {
        Global.maxY = parseInt(resultSGF.toFixed(0));
    }
    else if(resultCurrent>=  resultSGF && resultCurrent >= resultPrincipal)
    {
        Global.maxY = parseInt(resultCurrent.toFixed(0));
    }
    else {resultCurrent = parseInt(resultCurrent.toFixed(0)); }


           
    // if(Global.maxY > 100)
    // {
    //     Global.maxY  = Global.maxY + 100;
    // }
    // else if(Global.maxY > 1000)
    // {
    //     Global.maxY  = Global.maxY + 1000;

    // }
    // else if(Global.maxY > 10000)
    // {
    //     Global.maxY  = Global.maxY + 10000;
    // }
    // else  Global.maxY  = Global.maxY + 10;
  
    if(Global.maxY < 1) return; 
    this.props.navigation.navigate("Graph");

}
onAmortization()
{
    var days = this.state.potential_duration;
    
    var m_time_tmp;
    
    m_time_tmp = this.state.m_time;

    // console.log(this.state.potential_duration);

    if(this.state.potential_duration < 8)
    {
        
        if(this.state.cur_duration_unit === 'months')
        {
            days = days * 30;
            m_time_tmp =  1 / 365;
            Global.tableHeaderDays = "days";
        }
        else if(this.state.cur_duration_unit === 'years')
        {
            days = days * 12;
            m_time_tmp =  1 / 12;
            Global.tableHeaderDays = "months";
          
        }
       
    }
    else {    Global.tableHeaderDays = this.state.cur_duration_unit ;}

    Global.tableData = [[ 0 ,  parseInt(this.state.cur_principle) , 0]];
    
    let resultSGF = 0;
 
   
    for(let i = 1 ; i <= days; i++)
    {
        let RperNSGF = (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialaddition ;
       
        resultSGF =  this.state.cur_principle * ( 1 + (this.state.potential_interest - this.state.potential_inflation) / this.state.m_potentialcompound  ) ** (this.state.m_potentialcompound * m_time_tmp * i);
     
        let resultAdditionSGF = this.state.potential_addition * (((1 + RperNSGF ) ** (this.state.m_potentialaddition * m_time_tmp * i)-1) /(RperNSGF));// * (1 + (RperNSGF)); 
      
        resultSGF = resultSGF +  resultAdditionSGF;
     
       
        let deposite =  this.state.potential_addition * this.state.m_potentialaddition  *  m_time_tmp * i;
        
     
        let interestTotal = resultSGF - this.state.cur_principle  - deposite;

        interestTotal = interestTotal.toFixed(2);
       
        Global.tableData.push([i , parseInt(resultSGF.toFixed(2)), interestTotal]);
    }


     // if(Global.maxY < 1) return; 

         if(Global.tableData.length > 1) 
         this.props.navigation.navigate("Amortization");
     
   

}

  render() {
    let compound_unit = [{
        value: 'daily',
      }, {
        value: 'monthly',
      }, {
        value: 'quarterly',
      },
      {
        value: 'semiannually',
      },
      {
        value: 'annually',
      }
    ];

    let duration_unit = [{
        value: 'days',
      }, {
        value: 'months',
      }, {
        value: 'years',
      }
    ];
    var {navigate} = this.props.navigation;

  
    
    return (
        //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        //    <Image style={{ height: 100, flex: 1 }}  source = {require('../../images/home.jpg')} />
        //    </View> 
        <Container>
            

            <ImageBackground source = {require('../assets/images/calculator.png')}  style={{flex: 1}}>
                
           
            <Content>
                    <View style = {{marginTop:10, marginBottom:10, alignItems : 'center'}}>
                        <Text style = {{ color:'#ffffff',fontSize:20}}>
                            Current Investment Strategy
                        </Text>
                    </View>
             
                <View style = {styles.first}>
              

                    <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Principal($) </Text>
                    <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {(text) => this.onChangeCurPrinciple(text)}
                                value = { this.state.cur_principle}
                                maxLength={11} 
                                />
                </View>

                <View style = {styles.second}>
                <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Interest(%) </Text>
                <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {(text) => this.onChangeCurInterest(text)}
                                value = { this.state.cur_interest}
                                maxLength={11} 
                                />
                
                <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Inflation(%) </Text>
                <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {(text) => this.onChangeCurInflation(text)}
                                value = { this.state.cur_inflation}
                                maxLength={11} 
                                />
                </View>
                <View style = {[styles.first, { justifyContent: 'flex-end'}]}>

                    <Text style = {{marginTop : 15 , marginRight: 40 ,  color:'#ffffff'}}> Compound </Text>
                    
                    <View style = {{marginRight : 15, width: 150}}>
                        <Dropdown
                                textColor = '#ffffff'
                                containerStyle={{marginTop:15,borderWidth:1, borderColor:'lightgrey',backgroundColor:'#101010', borderRadius:5, width:150,height:40, paddingLeft:20}}
                                rippleCentered={true}
                                inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}
                                data={compound_unit}
                                selectedItemColor	='#0000ff'
                                
                                onChangeText = {(text) => this.onChangeCompoundUnit(text)}
                                
                                disabledItemColor= '#ffff00'
                                pickerStyle = {{backgroundColor:'#ffffff'}}
                                value = "annually"
                                baseColor = '#ffffff'
                          
                        />
                    </View>

                </View>


                <View style = {styles.second}>
                <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Duration </Text>
                <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                
                                keyboardType = 'numeric'
                                
                                onChangeText = {(text) => this.onChangeCurDuration(text)}
                                value = { this.state.cur_duration}
                                maxLength={11} 
                                />
                
                <View style = {{marginRight : 15, width: 150}}>
                        <Dropdown
                                textColor = '#ffffff'
                                containerStyle={{marginTop:15,borderWidth:1, borderColor:'lightgrey',backgroundColor:'#101010', borderRadius:5, width:150,height:40, paddingLeft:20}}
                                rippleCentered={true}
                                inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}

                                data={duration_unit}
                                selectedItemColor	='#0000ff'
                                
                                onChangeText = {(text) => this.onChangeDurationUnit(text)}

                                disabledItemColor= '#ffff00'
                                pickerStyle = {{backgroundColor:'#ffffff'}}
                                value = "years"
                                baseColor = '#ffffff'
                          
                        />
                    </View>
                </View>

                <View style = {styles.first}>
                    
                <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Addition($) </Text>
                <TextInput style = {styles.input2}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText = {(text) => this.onChangeCurAddition(text)}
                                value = { this.state.cur_addition}
                                maxLength={11} 
                               />
                
                <View style = {{marginRight : 15, width: 150}}>
                        <Dropdown
                                textColor = '#ffffff'
                                containerStyle={{marginTop:15,borderWidth:1, borderColor:'lightgrey',backgroundColor:'#101010', borderRadius:5, width:150,height:40, paddingLeft:20}}
                                rippleCentered={true}
                                inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}
                                data={compound_unit}
                                selectedItemColor	='#0000ff'
                                
                                disabledItemColor= '#ffff00'
                                onChangeText = {(text) => this.onChangeCurAdditionUnit(text)}

                                pickerStyle = {{backgroundColor:'#ffffff'}}
                                value = "monthly"
                                baseColor = '#ffffff'
                        />
                    </View>
                </View>

                <View style = {styles.second}>
                <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Total Return </Text>
                    <TextInput style = {styles.input1}
                                underlineColorAndroid = "transparent"
                                placeholder = "0"
                                placeholderTextColor = "#ffffff"
                                autoCapitalize = "none"
                                editable={false} 
                                selectTextOnFocus={false}
                                ref={component=> this._curTotal=component}

                                />
                
                </View>

                {/* ////////////////////second part     //////////////////////////////////////////////////// */}

                  <View style = {{marginTop:10, marginBottom:10, alignItems : 'center'}}>
                        <Text style = {{ color:'#ffffff',fontSize:20}}>
                            Potential Investment Strategy
                        </Text>
                    </View>
             
                    <View style = {styles.first}>
              

                        <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Principal($) </Text>
                        <TextInput style = {styles.input1}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "0"
                                    placeholderTextColor = "#ffffff"
                                    autoCapitalize = "none"

                                    editable={false} 
                                    selectTextOnFocus={false}
                                    ref={component=> this._potentialPrincipal = component}
                                    />
                    </View>

                    <View style = {styles.second}>
                    <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Interest(%) </Text>
                    <TextInput style = {styles.input2}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "0"
                                    placeholderTextColor = "#ffffff"
                                    autoCapitalize = "none"
                                    keyboardType = 'numeric'
                                    onChangeText = {(text) => this.onChangePotentialInterest(text)}
                                    value = { this.state.potential_interest}
                                    maxLength={11} 
                                    />
                    
                    <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Inflation(%) </Text>
                    <TextInput style = {styles.input2}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "0"
                                    placeholderTextColor = "#ffffff"
                                    autoCapitalize = "none"
                                    keyboardType = 'numeric'
                                    onChangeText = {(text) => this.onChangePotentialInflation(text)}
                                    value = { this.state.potential_inflation}
                                    maxLength={11} 
                                    />
                    </View>
                    <View style = {[styles.first, { justifyContent: 'flex-end'}]}>

                        <Text style = {{marginTop : 15 , marginRight: 40 ,  color:'#ffffff'}}> Compound </Text>
                        
                        <View style = {{marginRight : 15, width: 150}}>
                            <Dropdown
                                    textColor = '#ffffff'
                                    containerStyle={{marginTop:15,borderWidth:1, borderColor:'lightgrey',backgroundColor:'#101010', borderRadius:5, width:150,height:40, paddingLeft:20}}
                                    rippleCentered={true}
                                    inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}
                                    data={compound_unit}
                                    selectedItemColor	='#0000ff'
                                    
                                    onChangeText = {(text) => this.onChangePotentialCompoundUnit(text)}
                                    
                                    disabledItemColor= '#ffff00'
                                    pickerStyle = {{backgroundColor:'#ffffff'}}
                                    value = "annually"
                                    baseColor = '#ffffff'
                                
                            />
                        </View>

                    </View>


                    <View style = {styles.second}>
                    <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Duration </Text>
                    <TextInput style = {styles.input2}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "0"
                                    placeholderTextColor = "#ffffff"
                                    autoCapitalize = "none"
                                    

                                    editable={false} 
                                    selectTextOnFocus={false}
                                    ref={component=> this._potentialDuration = component}
                                    />
                    
                    <View style = {{marginRight : 15, width: 150}}>
                        <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}>
                           {this.state.potential_duration_unit}
                           
                        </Text>
                    </View>
                    </View>

                              <View style = {styles.first}>
                    
                    <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Addition($) </Text>
                    <TextInput style = {styles.input2}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "0"
                                    placeholderTextColor = "#ffffff"
                                    autoCapitalize = "none"
                                    keyboardType = 'numeric'
                                    onChangeText = {(text) => this.onChangePotentialAddition(text)}
                                    value = { this.state.cur_addition}
                                    maxLength={11} 
                                   />
                    
                    <View style = {{marginRight : 15, width: 150}}>
                            <Dropdown
                                    textColor = '#ffffff'
                                    containerStyle={{marginTop:15,borderWidth:1, borderColor:'lightgrey',backgroundColor:'#101010', borderRadius:5, width:150,height:40, paddingLeft:20}}
                                    rippleCentered={true}
                                    inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}
                                    data={compound_unit}
                                    selectedItemColor	='#0000ff'
                                    
                                    disabledItemColor= '#ffff00'
                                    onChangeText = {(text) => this.onChangePotentialAdditionUnit(text)}
    
                                    pickerStyle = {{backgroundColor:'#ffffff'}}
                                    value = "monthly"
                                    baseColor = '#ffffff'
                            />
                        </View>
                    </View>

                    <View style = {styles.second}>
                    <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Total Return </Text>
                        <TextInput style = {styles.input1}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "0"
                                    placeholderTextColor = "#ffffff"
                                    autoCapitalize = "none"
                                    editable={false} 
                                    selectTextOnFocus={false}
                                    ref={component=> this._potentialTotal=component}

                                    />
                    
                    </View>
                 <TouchableOpacity style = {styles.btn_graph} onPress = {()=>this.onGraph("Graph")}>
                         <Image source={require("../assets/images/btn_Graph.png")}/>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.btn_graph} onPress = {()=>this.onAmortization()}>
                         <Image source={require("../assets/images/btn_Table.png")}/>
                </TouchableOpacity>
                  
                
                </Content>
                 
                <Footer>
                    <FooterTab style = {{backgroundColor : '#004567'}}>
                        <Button style={styles.bottomButton} transparent onPress = {()=>navigate("Home")}>
                            <Icon style={{color:'#ffffff'}} type="FontAwesome" name="home" />
                            <Text style = {{color:'#ffffff'}}>  Home</Text>
                            </Button>
                            <Button style={styles.bottomButton}  transparent onPress = {()=>navigate("Calculator")}>
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="calculator" />
                            <Text style = {{color:'#ffffff'}}>Calculator</Text>
                            </Button>
                            
                            <Button style={styles.bottomButton}  transparent onPress = {()=>this.onAmortization()}>
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="file-text" />
                            <Text style = {{color:'#ffffff'}}>Amortization</Text>
                            </Button>   
                            
                            <Button style={styles.bottomButton}  transparent onPress = {()=>this.onGraph("Graph")}>
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="bar-chart" />
                            <Text style = {{color:'#ffffff'}}>  Graph</Text>
                            </Button>    

                             <Button style={{color:'#ffffff'}}  style={styles.bottomButton}  transparent onPress = {()=>navigate("AboutUs")}>       
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="user" />       
                            <Text style = {{color:'#ffffff'}}>About Us</Text>
                        </Button>
                    </FooterTab>
                </Footer>
                
            </ImageBackground>
        
        </Container>      
     
      
    );
  }  
}

var styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    first: 
    {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 0,
        shadowColor: '#303838',
        height:70,
        backgroundColor : '#63656e',
      
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,

    },
    second: {
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 0,
        shadowColor: '#303838',
        height:70,
        backgroundColor : '#3f434e',
       
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },
    input1: {
        margin: 15,
        height: 40,
        width: 250,
        color:'#ffffff',
        backgroundColor:'#101010',
        borderColor: '#ffffff',
        borderWidth: 1,
        paddingRight: 10,
        textAlign : 'right',
        flex: 2
     },
     input2: {
        margin: 15,
        height: 40,
        width: 100,
        color:'#ffffff',
        backgroundColor:'#101010',
        borderColor: '#ffffff',
        borderWidth: 1,
        paddingRight: 10,
        textAlign : 'right',
        flex: 2
     },
    btn_graph: {
        borderRadius: 20,
        marginTop: 20,
        shadowColor: '#303838',
        alignItems:'center',
        shadowOffset: { width: 0, height: 5 },

        shadowRadius: 10,
        shadowOpacity: 0.35,
    },
    bottomButton:
    {
        borderRadius: 20,
      
        backgroundColor:'#1b4567'

    },
    list_expand: {
       
        zIndex: 5,
        position:'absolute',
        width:'100%',
        height:110,
        // backgroundColor:'#f9f9f9',
        borderWidth:1,
        // borderColor:'#e9e3d5',
        // marginBottom: 24
    },
    list_close: {        
        marginBottom: 24,
        zIndex: -1
    },

});
export default Calculator;
