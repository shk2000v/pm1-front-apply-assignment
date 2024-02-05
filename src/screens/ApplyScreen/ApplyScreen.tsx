import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Alert, FlatList, Platform, StyleSheet} from 'react-native';
import {KeyboardAvoidingView} from 'native-base';
import Header from '@/components/ApplyScreen/Header';
import Footer from '@/components/ApplyScreen/Footer';
import TodoEmpty from '@/components/Empty/TodoEmpty';
import TodoCard from '@/components/Card/TodoCard';

type TodoListDataType = {
  id: number;
  name: string;
};

const ApplyScreen = () => {
  const [todoData, setTodoData] = useState<TodoListDataType[]>([]);
  const [inputTodo, setInputTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<number[]>([]);

  const onPressCheck = (idx: number) => {
    setSelectedTodo(prev => {
      const result = prev.includes(idx)
        ? prev.filter(i => i !== idx)
        : [idx, ...prev];
      return result;
    });
  };

  const onPressComplete = () => {
    console.log('[onPressComplete] : ', onPressComplete);
  };
  const onSubmit = () => {
    if (inputTodo.length > 0) {
      const len = todoData.length + 1;
      setTodoData([{id: len, name: inputTodo}, ...todoData]);
      setInputTodo('');
    } else {
      Alert.alert('알림', '할일을 적어주세요!', [
        {text: '확인', onPress: () => {}},
      ]);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={[]}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.select({ios: 'padding', android: undefined})}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={todoData}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Header />}
            // ListFooterComponent={
            //   <Footer setValue={setInputTodo} onSubmit={onSubmit} />
            // }
            ListEmptyComponent={<TodoEmpty />}
            stickyHeaderIndices={[0]}
            contentContainerStyle={[styles.listWrap]}
            renderItem={({item}) => {
              const isChecked = selectedTodo.includes(item.id);
              return (
                <TodoCard
                  isChecked={isChecked}
                  name={item.name}
                  onPressCheck={() => onPressCheck(item.id)}
                  onPressComplete={onPressComplete}
                />
              );
            }}
          />
          <Footer
            value={inputTodo}
            setValue={setInputTodo}
            onSubmit={onSubmit}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: 'white',
  },
  listWrap: {
    // flex: 1,
    flexGrow: 1,
    // backgroundColor: 'red',
  },
});

export default ApplyScreen;
