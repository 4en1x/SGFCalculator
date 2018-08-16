import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ListItem from './ListItem';
import { Icon } from 'native-base';
// import {
//     AppStyles,
//     avenirBookObliqueFont,
//     avenirBookFont,
//     avenirFont,
//     avenirHeavyFont,
//     avenirMediumFont,
//     navigationOptions
// } from "../../Styles";

class ListView extends Component {

    // async componentWillMount() {
    //     //fonts
    //     await Expo.Font.loadAsync({
    //         avenir: avenirFont,
    //         avenirHeavy: avenirHeavyFont,
    //         AvenirBookOblique: avenirBookObliqueFont,
    //         avenirBook: avenirBookFont,
    //         avenirMedium: avenirMediumFont
    //     });
    // }

    render() {
        const { data, selectedItem, expandList, itemPicker, expanded } = this.props;
        return (

            <ScrollView style={styles.container}>
                <TouchableOpacity>
                
                <View style={styles.listHeader}>
                    


                <Text style = {{marginTop : 10, color: '#ffffff'}}>{selectedItem !== "" ? selectedItem : 'Apparel'}</Text>
                

                <TouchableOpacity onPress={() => expandList()}>

                    <Icon style = {{marginLeft : 50, color:'#ffffff'}} type = 'FontAwesome' name = 'angle-down'/>

                </TouchableOpacity>  


                
                    
                    
                </View>



                </TouchableOpacity>
                {
                    expanded ?  <View>
                    {
                        data.map((item, index) => <ListItem 
                                                    key={index}
                                                    index={index} 
                                                    item={item}
                                                    itemPicker={itemPicker}
                                                    selectedItem={selectedItem}
                                                    />)
                    }
                </View> : null
                }
            </ScrollView>
        );
    }
}

export default ListView;

const styles = {
    listHeader: {
        justifyContent: 'flex-end',
        flexDirection:'row'
    }
}

