import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AppState, ImageStyle, Linking, StyleSheet} from 'react-native';
import {Button, Flex, Image, StatusBar, Text, View} from 'native-base';
import Header from '@/components/ApplyScreen/Header';
import Body from '@/components/ApplyScreen/Body';
import Footer from '@/components/ApplyScreen/Footer';

const ApplyScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={[]}>
        {/* header status bar */}
        <StatusBar backgroundColor={'#741FFF'} />
        {/* 헤더 */}
        <Header />
        {/*  */}
        <Body />
        {/* footer : 할일등록 TextInput */}
        <Footer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export const styles = StyleSheet.create({
  image: {
    width: 204,
    height: 228,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: 'white',
  },
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 37,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 115,
    height: 25,
    marginBottom: 40,
    resizeMode: 'contain',
  },
});

export default ApplyScreen;
