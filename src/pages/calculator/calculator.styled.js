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

    btn_graph: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 20,
    },

    btn_graph_inner: {
        width: '90%',
        resizeMode: 'contain',
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
