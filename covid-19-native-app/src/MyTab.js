import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import World from './screens/World';
import India from './screens/India';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="World"
      tabBarOptions={{
        activeTintColor: 'black',
        activeBackgroundColor: '#ffd450',
        inactiveBackgroundColor: '#FFC30E',
        inactiveTintColor: 'black',
        tabStyle: {
          borderRightColor: 'black',
          borderLeftWidth: 0.5,
        },
        style: {
          height: 60,
        },
        labelStyle: {
          paddingBottom: 7,
          fontSize: 13,
          fontFamily: 'Ubuntu-Regular'
        },
      }}
    >
      <Tab.Screen
        name="World"
        component={World}
        options={{
          tabBarLabel: 'World',
          tabBarIcon: () => {
            return (
              <Image source={require('./assets/img/earth.png')} style={{ height: 20, width: 20 }} />
            )
          },
        }}
      />
      <Tab.Screen
        name="India"
        component={India}
        options={{
          tabBarLabel: 'India',
          tabBarIcon: () => {
            return (
              <Image source={require('./assets/img/india.png')} style={{ height: 20, width: 20 }} />
            )
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;