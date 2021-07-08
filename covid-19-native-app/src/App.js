import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stackNavigator';
import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}
export default App;
