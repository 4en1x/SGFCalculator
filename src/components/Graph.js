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
import { Image, SectionList, View,Dimensions,StyleSheet,ScrollView } from "react-native";
///rjc
import Global from './Global';
import Expo, {FileSystem,ImagePicker, SQLite} from 'expo'

import { VictoryBar, VictoryChart, VictoryGroup, VictoryAxis, VictoryLine ,VictoryTheme, VictoryLabel, VictoryPolarAxis} from 'victory-native';
import Svg, { Defs, Rect, ClipPath, Circle } from "react-native-svg";


class Graph extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
       flag_param : 0,    
    };
  }
 
  gotoscreen(name)
  {
      var {navigate} = this.props.navigation;
     // Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
      navigate(name);
  }


  static navigationOptions = {
    title: "Graph",
  };
  

  render() {

    
  //  console.log(Global.current_data);
  var m_length =  Global.current_data.length;
    // console.log("test =======" + Global.current_data[3] );

    var m_fontSize = 14;

    console.log("max Y =======" + Global.maxY );
     if(Global.maxY > 100) m_fontSize = 12 ;
     else if(Global.maxY > 1000) m_fontSize = 10 ;
     else if(Global.maxY > 10000) m_fontSize = 8 ;
     else if(Global.maxY > 100000) m_fontSize = 5 ;

    // Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
     const { width } = Dimensions.get('window').width-Dimensions.get('window').width/10;
     const { hight } = Dimensions.get('window').height-Dimensions.get('window').height/3;

    return (
        <Container>
        <Content>
        <ScrollView
        style={{ backgroundColor:"#7000FF"}}>                  
        <VictoryChart
          color={"#000000"}
          height={250}
          width={600}
          theme={VictoryTheme.material}
        >
        <VictoryAxis
            label= {Global.xAxis_label}
            style={{
              axisLabel: { padding: 35, stroke: '#ccc'},
              ticks: { stroke: '#ccc' },
              tickLabels: { fontSize: 14, fill: '#E0F2F1', fontWeight: 'bold' },
            }}
        />

        <VictoryAxis dependentAxis
            orientation="right"
            label="Return(AUD)"
            width={400} height={400}
            style={{
              axisLabel: { padding: 5, stroke: '#ccc'},
              ticks: { stroke: '#ccc'},
              tickLabels: { fontSize: m_fontSize , fill: '#E0F2F1', fontWeight: 'bold'},
            }}
        />
 
          <VictoryGroup   domain={{y:[0,Global.maxY]}}    >
          <VictoryLine data={[ { x: 0, y: 0}, { x: 0, y: Global.maxY },]} style={{data: { stroke: "#FFFFFF" },}}/>
          <VictoryLine data={[ { x: 0, y:Global.maxY},{ x:parseInt(Global.current_data[(m_length - 1)].x), y:Global.maxY},]} style={{data: { stroke: "#FFFFFF" },}}/>

          <VictoryLine data={Global.sgf_data} interpolation="natural" style={{data: { stroke: "#00F300" },}}/>
          <VictoryLine data={Global.current_data} interpolation="natural" style={{data: { stroke: "#FF0000" },}}/>
          <VictoryLine data={Global.princial_data} interpolation="natural" style={{data: { stroke: "#FFFFFF" },}}/>
           
          <VictoryLabel text="P" datum={{ x:1-0.1, y: Global.princial_data[0].y }} textAnchor="end" style={{stroke: "#FFFFFF"}}/>

          <VictoryLabel text="Current" datum={{ x:Global.current_data[3].x, y: Global.current_data[3].y+ Global.maxY *0.08 }} textAnchor="start" style={{stroke: "#ff0000"}}/>
          <VictoryLabel text="SGF" datum={{ x: Global.sgf_data[4].x, y: Global.sgf_data[4].y+Global.maxY*0.08 }} textAnchor="start" style={{stroke: "#00ffff"}}/> 
          <VictoryLabel text="Princial" datum={{ x:Global.princial_data[5].x, y: Global.princial_data[5].y+Global.maxY*0.08 }} textAnchor="start" style={{stroke: "#FFFFFF"}}/>          
              
          </VictoryGroup>
          
        </VictoryChart>
      </ScrollView>
      </Content>
         <Footer>
                    <FooterTab style = {{backgroundColor : '#004567'}}>
                        <Button style={styles.bottomButton} transparent onPress = {()=>this.gotoscreen("Home")}>
                            <Icon style={{color:'#ffffff'}} type="FontAwesome" name="home" />
                            <Text style = {{color:'#ffffff'}}>Home</Text>
                            </Button>
                            <Button style={styles.bottomButton}  transparent onPress = {()=>this.gotoscreen("Calculator")}>
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="calculator" />
                            <Text style = {{color:'#ffffff'}}> Calcul</Text>
                            </Button>
                            <Button style={styles.bottomButton}  transparent>
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="bar-chart" />
                            <Text style = {{color:'#ffffff'}}>Graph</Text>
                            </Button>           
                            <Button style={{color:'#ffffff'}}  style={styles.bottomButton}  transparent onPress = {()=>this.gotoscreen("AboutUs")}>       
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="user" />       
                            <Text style = {{color:'#ffffff'}}>About us</Text>
                        </Button>
                    </FooterTab>
         </Footer>
                
       
        </Container>
    );
  }  
}
var styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    button1: 
    {
        borderRadius: 20,
        marginTop: Dimensions.get('screen').height / 2 - 120,
        shadowColor: '#303838',
        
        alignItems:'center',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,

    },
    button2: {
        borderRadius: 20,
        marginTop: 40,
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

    }

});
export default Graph;
