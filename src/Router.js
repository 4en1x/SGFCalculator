import { createStackNavigator } from 'react-navigation';
import Home from './pages/home/home.component';
import Calculator from './pages/calculator/calculator.component';
import Graph from './pages/graph/graph.component';
import Table from './pages/table/table.component';
import AboutUs from './pages/about/about.component';


export default createStackNavigator({
    Home: { screen: Home },
    Calculator: { screen: Calculator },
    Graph: { screen: Graph },
    Table: { screen: Table },
    AboutUs: { screen: AboutUs },
});
