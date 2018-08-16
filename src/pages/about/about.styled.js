import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    aboutBackground: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 0,
        height: 200,
        backgroundColor: '#63656e',
    },

    aboutText: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '700',
        color: '#ffffff',
    },

    btn_contact: {
        borderRadius: 20,
        marginTop: 0,
        alignItems: 'center',
    },

    aboutContacts: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    aboutContactsInner: {
        width: '95%',
        resizeMode: 'contain',
    },
});
