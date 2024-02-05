import React from 'react';
import {Text, View} from 'native-base';
import dayjs from 'dayjs';
import Icon from '../Icon';
import {Platform, StatusBar} from 'react-native';
import {TopInset} from '../Inset';

const ApplyScreenHeader = () => {
  const today = dayjs();
  const PRIMARY = '#741FFF';

  return (
    <>
      <StatusBar backgroundColor={PRIMARY} />
      {/* SafeArea가 아이폰에서 왜인지 인식되지 못하여 직접 Inset 추가 */}
      {Platform.OS === 'ios' && <TopInset backgroundColor={PRIMARY} />}
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
    </>
  );
};

export default ApplyScreenHeader;
