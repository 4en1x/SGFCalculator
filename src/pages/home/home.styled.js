import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    button1: {
        borderRadius: 20,
        marginTop: 0,
        shadowColor: '#303838',

        alignItems: 'center',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },

    button2: {
        borderRadius: 20,
        marginTop: 40,
        shadowColor: '#303838',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 5 },

        shadowRadius: 10,
        shadowOpacity: 0.35,
    },

    aboutBackground: {
        borderRadius: 10,
        marginTop: Dimensions.get('screen').height / 2 - 120,
        height: 140,
        backgroundColor: '#63656e',
    },

    aboutText: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '700',
        color: '#ffffff',
    },
});
