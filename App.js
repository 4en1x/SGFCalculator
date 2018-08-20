import React from 'react';

import { Font, AppLoading } from 'expo';
import Router from './src/Router';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return (
                <AppLoading />
            );
        }
        return (
            <Router/>
        );
    }
}
