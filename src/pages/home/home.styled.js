import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    button1: {
        borderRadius: 20,
        marginTop: -10,
        alignItems: 'center',
    },

    button2: {
        borderRadius: 20,
        marginTop: 40,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },

    aboutBackground: {
        marginTop: Dimensions.get('screen').height / 2 - 120,
        height: 120,
        backgroundColor: '#63656e',
    },

    aboutText: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
        fontWeight: '400',
        color: '#ffffff',
    },

    aboutContactsInner: {
        width: '102%',
        resizeMode: 'contain',
    },
});
