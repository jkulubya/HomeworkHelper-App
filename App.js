import Expo from 'expo';
import React from 'react';
import { Root } from './js/config/router';

export default class App extends React.Component {
  constructor() {
      super();
      this.state = {
        isLoading: false,
        isReady: false,
      };
    }

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      });

      this.setState({isReady: true});
  }
  render() {
      
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return <Root />;
  }
}
