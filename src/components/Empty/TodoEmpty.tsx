import React from 'react';
import {Center, Text} from 'native-base';
import Icon from '../Icon';
import {StyleSheet, ViewStyle} from 'react-native';

const TodoEmpty = () => {
  return (
    <Center style={[styles.container]}>
      <Icon.Target />
      <Text
        textAlign={'center'}
        fontSize={'xl'}
        fontWeight={'semibold'}>{`체크 리스트에\n할 일을 등록해주세요`}</Text>
    </Center>
  );
};

export default TodoEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
});
