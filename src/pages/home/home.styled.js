import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    aboutBackground: {
        width: '95%',
        alignSelf: 'center',
        marginTop: Dimensions.get('screen').height / (67 / 20),
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

    buttonCalculator: {
        borderRadius: 20,
        marginTop: 0,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    buttonAbout: {
        alignSelf: 'center',
        width: '95%',
        borderRadius: 20,
        marginTop: 40,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    buttonTextView: {
        height: 70,
        flex: 12,
        flexDirection: 'row',
        backgroundColor: '#7a8291',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonImageView: {
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#7a8291',
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonImage: {
        marginLeft: 15,
    },

    buttonText: {
        fontSize: 23,
        textAlign: 'center',
        fontWeight: '700',
        color: '#fdfdfc',
    },

    buttonIconView: {
        height: 70,
        flex: 3,
        flexDirection: 'row',
        backgroundColor: '#afb3ba',
    },

    buttonIcon: {
        marginTop: 8,
        marginLeft: 25,
        fontSize: 55,
        color: '#eff0f0',
    },
});
