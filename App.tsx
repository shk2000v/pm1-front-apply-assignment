import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import ApplyStack from './src/screens/ApplyStack';
import 'react-native-get-random-values';

const App = () => {
  const theme = extendTheme({
    colors: {
      primary: {
        500: '#741FFF', // 원하는 primary 컬러로 변경
      },
      border: {
        500: '#E5E7EC',
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <ApplyStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
