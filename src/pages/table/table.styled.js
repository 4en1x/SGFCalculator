import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        paddingTop: 1,
        backgroundColor: '#2f333e',
    },

    header: {
        height: 50,
        backgroundColor: '#2f333e',
    },

    headertext: {
        textAlign: 'center',
        fontWeight: '100',
        color: '#999999',
        marginLeft: -10,
        marginRight: -10,
        alignItems: 'center',
    },

    text: {
        textAlign: 'center',
        fontWeight: '100',
        color: '#fff',
    },

    dataWrapper: {
        marginTop: -1,
    },

    row: {
        height: 40,
        backgroundColor: '#3f434e',
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
});
