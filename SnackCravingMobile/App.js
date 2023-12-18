// App.js
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingPage from './LandingPage';

const AppNavigator = createStackNavigator(
  {
    Home: LandingPage,
    // Add more screens if needed
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
