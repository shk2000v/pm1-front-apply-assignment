import React from 'react';
import {Text, View} from 'native-base';
import TodoEmpty from '../Empty/TodoEmpty';
import {StyleSheet} from 'react-native';

const ApplyScreenBody = () => {
  const data = [];
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <View>
          <Text>데이터 있음</Text>
        </View>
      ) : (
        <TodoEmpty />
      )}
    </View>
  );
};

export default ApplyScreenBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
