import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  Alert,
  Image,
  ImageStyle,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Flex,
  Input,
  KeyboardAvoidingView,
  Text,
  View,
} from 'native-base';
import {ApplyStackParamList} from '@navigations/navigation.type';
import {signIn} from '@utils/auth';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

const LoginScreen = () => {
  const [form, setForm] = useState({
    code: '',
    password: '',
  });

  const createFormHandler = (key: string) => (value: string) => {
    setForm({...form, [key]: value});
  };
  type LoginNavigationProps = StackNavigationProp<ApplyStackParamList, 'Login'>;
  const navigation = useNavigation<LoginNavigationProps>();

  const onSubmit = async () => {
    // 로그인 기능을 여기에 추가
    Keyboard.dismiss();
    try {
      const {user} = await signIn(form);
      navigation.navigate('Apply');
    } catch (e) {
      Alert.alert('로그인 실패');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={[]}>
        <LinearGradient
          colors={['#D8CBFF', 'white']}
          style={styles.linearGradient}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.select({ios: 'padding', android: undefined})}>
            <Flex style={styles.contentContainer}>
              <Image
                alt="intro"
                source={require('@assets/intro.png')}
                style={styles.image as ImageStyle}
              />
              <Input
                focusOutlineColor={'primary.500'}
                marginTop="40px"
                w={{base: '100%'}}
                placeholder="지원자 코드"
                keyboardType="name-phone-pad"
                onChangeText={createFormHandler('code')}
              />
              <Input
                focusOutlineColor={'primary.500'}
                marginTop="20px"
                w={{base: '100%'}}
                placeholder="비밀번호"
                keyboardType="number-pad"
                onChangeText={createFormHandler('password')}
                secureTextEntry
              />
              <Button
                style={styles.button}
                backgroundColor={'primary.500'}
                onPress={onSubmit}>
                <Text style={styles.buttonText}>{'시작하기'}</Text>
              </Button>
            </Flex>
          </KeyboardAvoidingView>
          <View style={styles.logoContainer}>
            <Image
              alt="logo"
              source={require('@assets/logo.png')}
              style={styles.logo as ImageStyle}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export const styles = StyleSheet.create({
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
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 37,
    alignItems: 'center',
  },
  image: {
    width: 275,
    height: 291,
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

export default LoginScreen;
