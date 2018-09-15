import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    first: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 0,
        height: 60,
        backgroundColor: '#63656e',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    second: {
        flexDirection: 'row',
        marginTop: 0,
        height: 60,
        backgroundColor: '#3f434e',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    input1: {
        margin: 15,
        height: 30,
        width: 250,
        color: '#ffffff',
        backgroundColor: '#101010',
        borderColor: '#ffffff',
        borderWidth: 1,
        paddingRight: 10,
        textAlign: 'right',
        flex: 2,
    },

    input2: {
        margin: 15,
        height: 30,
        width: 90,
        color: '#ffffff',
        backgroundColor: '#101010',
        borderColor: '#ffffff',
        borderWidth: 1,
        paddingRight: 10,
        textAlign: 'right',
        flex: 2,
    },

    dropdownContainer: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#101010',
        width: 150,
        height: 30,
        paddingLeft: 20,
    },

    dropdownInputContainer: {
        marginTop: -31,
        borderBottomColor: 'transparent',
    },

    bottomButton: {
        borderRadius: 20,
        backgroundColor: '#1b4567',
    },

    list_expand: {
        zIndex: 5,
        position: 'absolute',
        width: '100%',
        height: 110,
        borderWidth: 1,
    },

    list_close: {
        marginBottom: 24,
        zIndex: -1,
    },

    headerLeft: {
        flex: 1,
        flexDirection: 'row',
    },

    customBackTitle: {
        marginTop: 12,
        marginLeft: -16,
    },

    customBackTitleText: {
        color: '#ffffff',
        fontSize: 17,
    },

    button: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 20,
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
        marginLeft: 15,
        fontSize: 55,
        color: '#eff0f0',
    },
});
