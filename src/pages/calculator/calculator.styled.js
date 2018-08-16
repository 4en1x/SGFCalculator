import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    first: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 0,
        height: 70,
        backgroundColor: '#63656e',
    },

    second: {
        flexDirection: 'row',
        marginTop: 0,
        height: 70,
        backgroundColor: '#3f434e',
    },

    input1: {
        margin: 15,
        height: 40,
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
        height: 40,
        width: 100,
        color: '#ffffff',
        backgroundColor: '#101010',
        borderColor: '#ffffff',
        borderWidth: 1,
        paddingRight: 10,
        textAlign: 'right',
        flex: 2,
    },

    btn_graph: {
        borderRadius: 20,
        marginTop: 20,
        shadowColor: '#303838',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 5 },

        shadowRadius: 10,
        shadowOpacity: 0.35,
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
});
