import React from 'react';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Home';
import InfoScreen from './Info';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import textReducer from './Reducer'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Info: {screen: InfoScreen},
});

const store = createStore(textReducer);

let Navigation = createAppContainer(MainNavigator);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <Navigation />
        </Provider>
    );
  }
}
