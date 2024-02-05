import React from 'react';
import {Text, View} from 'native-base';
import dayjs from 'dayjs';
import Icon from '../Icon';

const ApplyScreenHeader = () => {
  const today = dayjs();
  return (
    <View backgroundColor={'primary.500'} padding={'4'}>
      <View flexDirection={'row'} style={{gap: 16, alignItems: 'center'}}>
        <Text color={'white'} fontSize={'2xl'} bold>
          해냄이의 체크 리스트
        </Text>
        <Icon.Mountain width={25} height={25} />
      </View>
      <Text color={'white'} fontSize={'xl'}>
        {today.format('YYYY년 M월 D일')}
      </Text>
    </View>
  );
};

export default ApplyScreenHeader;
