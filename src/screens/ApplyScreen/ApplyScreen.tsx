import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  FlatList,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
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
  const data: ArrayLike<TodoListDataType> | null | undefined = [
    {
      id: 1,
      name: '첼로 레슨 받기',
    },
    {
      id: 2,
      name: '도서관에 책 반납',
    },
    {
      id: 3,
      name: '일기 쓰기',
    },
  ];
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
    const len = todoData.length + 1;
    setTodoData([{id: len, name: inputTodo}, ...todoData]);
    setInputTodo('');
  };

  const {height} = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={[]}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.select({ios: 'padding', android: undefined})}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={todoData}
            // data={[] as TodoListDataType[]}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Header />}
            // ListFooterComponent={
            //   <Footer setValue={setInputTodo} onSubmit={onSubmit} />
            // }
            ListEmptyComponent={<TodoEmpty />}
            stickyHeaderIndices={[0]}
            // contentContainerStyle={[styles.listWrap, {height}]}
            contentContainerStyle={[styles.listWrap, {}]}
            renderItem={({item, _}) => {
              const isChecked = selectedTodo.includes(item.id);
              return (
                <TodoCard
                  isChecked={isChecked}
                  name={item.name}
                  // onPressCheck={() => onPressCheck(index)}
                  onPressCheck={() => onPressCheck(item.id)}
                  onPressComplete={onPressComplete}
                />
              );
            }}
          />
          <Footer setValue={setInputTodo} onSubmit={onSubmit} />
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
    flex: 1,
    // backgroundColor: 'red',
  },
});

export default ApplyScreen;
