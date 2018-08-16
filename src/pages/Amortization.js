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
import {   Image, SectionList, View,Dimensions,StyleSheet, ImageBackground,TouchableOpacity,ScrollView } from "react-native";
///rjc
import Expo, {FileSystem,ImagePicker, SQLite} from 'expo'

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import Global from "./Global";
class Amortization extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
        tableHead: ['Date(days)', 'Result($)', 'Interest($)'],
        widthArr: [50, 200, 100]
      }
  }
 
  static navigationOptions = {
    title: 'Amortization',
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
onGraph()
{
    if(Global.maxY > 1)    this.props.navigation.navigate("Graph");
}
  render() {
    
    var {navigate} = this.props.navigation;
    
    this.state.tableHead[0] = Global.tableHeaderDays;
    
    this.state.widthArr[0] = Dimensions.get('screen').width / 7;
    this.state.widthArr[1] = Dimensions.get('screen').width / 2;
    this.state.widthArr[2] = Dimensions.get('screen').width / 3;

    const state = this.state;
    
    // const tableData = [];

    // for (let i = 0; i < 30; i += 1) {
    //   const rowData = [];
    //   for (let j = 0; j < 9; j += 1) {
    //     rowData.push(`${i}${j}`);
    //   }
    //   tableData.push(rowData);
    // }
    // console.log(tableData);

    return (
        //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        //    <Image style={{ height: 100, flex: 1 }}  source = {require('../../images/home.jpg')} />
        //    </View> 
        <Container>

            {/* <ImageBackground source = {require('../assets/images/home.png')}  style={{flex: 1}}> */}
                
           
                <Content>
             
                <View style={styles.container}>
                    <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{borderColor: '#000000'}}>
                      
                        <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.headertext}/>
                      
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                     
                        <Table borderStyle={{borderColor: '#000000'}}>
                            {
                            Global.tableData.map((rowData, index) => (
                                <Row
                                key={index}
                                data={rowData}
                                widthArr={state.widthArr}
                                style={[styles.row, index%2 && {backgroundColor: '#63656e'}]}
                                textStyle={styles.text}
                                />
                            ))
                            }
                        </Table>
                        </ScrollView>
                    </View>
                    </ScrollView>
                </View>
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
                            
                            <Button style={styles.bottomButton}  transparent >
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
                
            {/* </ImageBackground> */}
        
        </Container>      
     
      
    );
  }  
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 2, paddingTop: 1, backgroundColor: '#2f333e' },
    header: { height: 50, backgroundColor: '#2f333e'},
    headertext: { textAlign: 'center', fontWeight: '100',color : "#999999" },
    text: { textAlign: 'center', fontWeight: '100',color : "#fff" },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#3f434e' }
  });
export default Amortization;
