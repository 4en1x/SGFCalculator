import React, { Component } from 'react';
import {
  Container,
  Footer,
  Button,
  FooterTab,
  Icon,
  Text,
  Content
} from 'native-base';

import {
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import Global from './Global';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag_param: 0
    };
  }

  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#ffffff',

    headerStyle: {
      backgroundColor: '#1b4567',
      borderBottomColor: '#888888',
      borderBottomWidth: 1
    },
    headerTitleStyle: {
      fontSize: 20
    }
  };

  onGraph() {
    if (Global.maxY > 1) this.props.navigation.navigate('Graph');
  }

  onAmortization() {
    if (Global.tableData.length > 1)
      this.props.navigation.navigate('Amortization');
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <ImageBackground
          source={require('../assets/images/home.png')}
          style={{ flex: 1 }}
        >
          <Content>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigate('Calculator')}
            >
              <Image source={require('../assets/images/btn_Return.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigate('AboutUs')}
            >
              <Image source={require('../assets/images/btn_AboutUs.png')} />
            </TouchableOpacity>
          </Content>

          <Footer>
            <FooterTab style={{ backgroundColor: '#004567' }}>
              <Button
                style={styles.bottomButton}
                transparent
                onPress={() => navigate('Calculator')}
              >
                <Icon
                  style={{ color: '#ffffff' }}
                  type="FontAwesome"
                  name="calculator"
                />
                <Text style={{ color: '#ffffff' }}>Calculator</Text>
              </Button>

              <Button
                style={styles.bottomButton}
                transparent
                onPress={() => this.onAmortization()}
              >
                <Icon
                  style={{ color: '#ffffff' }}
                  type="FontAwesome"
                  name="file-text"
                />
                <Text style={{ color: '#ffffff' }}>Amortization</Text>
              </Button>

              <Button
                style={styles.bottomButton}
                transparent
                onPress={() => this.onGraph()}
              >
                <Icon
                  style={{ color: '#ffffff' }}
                  type="FontAwesome"
                  name="bar-chart"
                />
                <Text style={{ color: '#ffffff' }}> Graph</Text>
              </Button>
              <Button
                style={{ color: '#ffffff' }}
                style={styles.bottomButton}
                transparent
                onPress={() => navigate('AboutUs')}
              >
                <Icon
                  style={{ color: '#ffffff' }}
                  type="FontAwesome"
                  name="user"
                />
                <Text style={{ color: '#ffffff' }}>About us</Text>
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
    flex: 1
  },
  button1: {
    borderRadius: 20,
    marginTop: Dimensions.get('screen').height / 2 - 120,
    shadowColor: '#303838',

    alignItems: 'center',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  button2: {
    borderRadius: 20,
    marginTop: 40,
    shadowColor: '#303838',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 5 },

    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  bottomButton: {
    borderRadius: 20,

    backgroundColor: '#1b4567'
  }
});
export default Home;
