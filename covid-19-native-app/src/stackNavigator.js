import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyTabs from './MyTab';

const NavStack = createStackNavigator({
  ScreenOne: {
    screen: MyTabs,
  },
},{
    headerMode: false
});

const StackNavigator = createAppContainer(NavStack);

export default StackNavigator;
