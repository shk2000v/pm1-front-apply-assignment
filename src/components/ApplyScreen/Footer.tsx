import React from 'react';
import {Button, Input, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';

type FooterType = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
};
const ApplyScreenFooter = ({setValue, onSubmit}: FooterType) => {
  return (
    <View paddingX={'16px'} backgroundColor={'white'}>
      <Input
        focusOutlineColor={'primary.500'}
        backgroundColor={'white'}
        borderRadius={10}
        marginBottom={'20px'}
        w={{base: '100%'}}
        placeholder="오늘은 무엇을 해야하나요?"
        keyboardType="name-phone-pad"
        onChangeText={setValue}
        onSubmitEditing={onSubmit}
      />
      <SumitButton onSubmit={onSubmit} />
    </View>
  );
};

export default ApplyScreenFooter;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    paddingRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SumitButton = ({onSubmit}: Pick<FooterType, 'onSubmit'>) => {
  return (
    <Button
      onPress={onSubmit}
      style={styles.button}
      backgroundColor={'transparent'}>
      <Text color={'primary.500'} bold fontSize={'md'}>
        등록
      </Text>
    </Button>
  );
};
