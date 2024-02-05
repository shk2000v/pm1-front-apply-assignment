import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen/LoginScreen';
import ApplyScreen from './ApplyScreen/ApplyScreen';

const Stack = createStackNavigator();

const ApplyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Apply"
        component={ApplyScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ApplyStack;
