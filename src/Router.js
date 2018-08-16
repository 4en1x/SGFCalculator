import { createStackNavigator } from 'react-navigation';
import Home from './pages/home/home.component';
import Calculator from './pages/calculator/calculator.component';
import Graph from './pages/Graph';
import Amortization from './pages/Amortization';
import AboutUs from './pages/about/about.component';


export default createStackNavigator({
    Home: { screen: Home },
    Calculator: { screen: Calculator },
    Graph: { screen: Graph },
    Amortization: { screen: Amortization },
    AboutUs: { screen: AboutUs },
});
