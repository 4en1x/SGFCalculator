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
import Global from "./Global";

class AboutUs extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
       flag_param : 0,
    };
  }
 
  static navigationOptions = {
    title: 'About Us',
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
 onAmortization()
{
    if(Global.tableData.length > 1) 
    this.props.navigation.navigate("Amortization");

}
  render() {
    
    var {navigate} = this.props.navigation;
    
    return (
      <Container>
            

      <ImageBackground source = {require('../assets/images/calculator.png')}  style={{flex: 1}}>
          
     
      <Content>
              <View style = {{marginTop:10, marginBottom:10, alignItems : 'center'}}>
                  <Text style = {{ color:'#ffffff',fontSize:20}}>
                      Current Investment Strategy
                  </Text>
              </View>
       
          <View style = {styles.aboutBackground}>
        

              <Text style = {{marginTop : 15 , marginLeft: 10 ,  color:'#ffffff'}}> Principal </Text>
              <TextInput style = {styles.input1}
                          underlineColorAndroid = "transparent"
                          placeholder = "Email"
                          placeholderTextColor = "#ffffff"
                          autoCapitalize = "none"
                          onChangeText = {this.handleEmail}/>
          </View>


           <TouchableOpacity style = {styles.btn_contact} >
                   <Image source={require("../assets/images/contactDetail.png")}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn_graph} >
                   <Image source={require("../assets/images/admin.png")}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn_graph} >
                   <Image source={require("../assets/images/email.png")}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn_graph} >
                   <Image source={require("../assets/images/telephone.png")}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn_graph} >
                   <Image source={require("../assets/images/level.png")}/>
          </TouchableOpacity>
         

          </Content>
           
          <Footer>
                    <FooterTab style = {{backgroundColor : '#004567'}}>
                        <Button style={styles.bottomButton} transparent onPress = {()=>navigate("Home")}>
                            <Icon style={{color:'#ffffff'}} type="FontAwesome" name="home" />
                            <Text style = {{color:'#ffffff'}}>   Home</Text>
                            </Button>
                            <Button style={styles.bottomButton}  transparent onPress = {()=>navigate("Calculator")}>
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="calculator" />
                            <Text style = {{color:'#ffffff'}}>Calculator</Text>
                            </Button>

                            <Button style={styles.bottomButton}  transparent onPress = {()=>this.onAmortization()}>
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="file-text" />
                            <Text style = {{color:'#ffffff'}}>Amortization</Text>
                            </Button>          

                            <Button style={styles.bottomButton}  transparent onPress = {()=>this.onGraph()}>
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="bar-chart" />
                            <Text style = {{color:'#ffffff'}}>   Graph</Text>
                            </Button>           
                            <Button style={{color:'#ffffff'}}  style={styles.bottomButton}  transparent onPress = {()=>navigate("AboutUs")}>       
                            <Icon style={{color:'#ffffff'}}  type="FontAwesome" name="user" />       
                            <Text style = {{color:'#ffffff'}}>About us</Text>
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
  aboutBackground: 
  {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 5,
      marginTop: 0,
      shadowColor: '#303838',
      height:200,
      backgroundColor : '#63656e',
    
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35,

  },
  btn_contact: {
    borderRadius: 20,
    marginTop: 0,
    shadowColor: '#303838',
    alignItems:'center',
    shadowOffset: { width: 0, height: 5 },

    shadowRadius: 10,
    shadowOpacity: 0.35,
},
btn_graph: {
  borderRadius: 20,
  marginTop: 20,
  width: 350,
  shadowColor: '#303838',
  alignItems:'center',
  shadowOffset: { width: 0, height: 5 },

  shadowRadius: 10,
  shadowOpacity: 0.35,
},
  
});

export default AboutUs;
