import React from 'react';
import {Pressable, Text, View} from 'native-base';
import Icon from '../Icon';
import {StyleSheet} from 'react-native';

type Todocard = {
  isChecked: boolean;
  name: string;
  onPressCheck: () => void;
  onPressComplete: () => void;
};
const TodoCard = ({
  isChecked = false,
  name = '',
  onPressCheck,
  onPressComplete,
}: Todocard) => {
  return (
    <Pressable
      onPress={onPressCheck}
      flexDirection={'row'}
      padding={'20px'}
      justifyContent={'space-between'}
      borderBottomWidth={1}
      borderBottomColor={'#D7D7D7'}
      style={styles.container}>
      <View flexDirection={'row'} alignItems={'center'} style={{gap: 16}}>
        {isChecked ? <Icon.CircleCheck /> : <Icon.Circle />}
        <Text
          color={isChecked ? 'primary.500' : '#000'}
          fontSize={'20px'}
          lineHeight={'23.87px'}
          letterSpacing={'-0.33px'}
          strikeThrough={isChecked}>
          {name}
        </Text>
      </View>

      {isChecked ? (
        <Pressable
          onPress={onPressComplete}
          width={'47px'}
          height={'24px'}
          paddingX={'4px'}
          justifyContent={'center'}
          backgroundColor={'#00DDD6'}
          hitSlop={10}
          borderRadius={'20px'}>
          <Text
            fontSize={'12px'}
            lineHeight={'12px'}
            color={'white'}
            textAlign={'center'}
            bold
            style={{includeFontPadding: false}}>
            끝내기
          </Text>
        </Pressable>
      ) : undefined}
    </Pressable>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {},
});
