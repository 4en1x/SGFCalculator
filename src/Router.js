import { createStackNavigator } from 'react-navigation';
import Home from './components/home/home.component';
import Calculator from './components/Calculator';
import Graph from './components/Graph';
import Amortization from './components/Amortization';
import AboutUs from './components/about/about.component';


export default createStackNavigator({
    Home: { screen: Home },
    Calculator: { screen: Calculator },
    Graph: { screen: Graph },
    Amortization: { screen: Amortization },
    AboutUs: { screen: AboutUs },
});
