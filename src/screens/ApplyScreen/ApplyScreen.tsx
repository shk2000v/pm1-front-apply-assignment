import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, Platform, StyleSheet} from 'react-native';
import {KeyboardAvoidingView} from 'native-base';
import Header from '@/components/ApplyScreen/Header';
import Footer from '@/components/ApplyScreen/Footer';
import TodoEmpty from '@/components/Empty/TodoEmpty';
import TodoCard from '@/components/Card/TodoCard';
import useApplyScreenHooks from '@/hooks/useApplyScreenHooks';

const ApplyScreen = () => {
  const {
    inputTodo,
    setInputTodo,
    todoList,
    deleteTodoList,
    onSubmit,
    updateTodoList,
  } = useApplyScreenHooks();

  // Issue : TextInput이 하단배치시에 헤더고정이 안되어 native 설정 변경
  // AndroidManifest.xml에서
  // android:windowSoftInputMode="adjustUnspecified" => "adjustNothing"
  // sideEffect : 키보드가 올라올때 컨텐츠가 밀려야 하는 경우는 avoidingView를 필수적으로 적용시켜줘야함
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={[]}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.select({ios: 'padding', android: 'padding'})}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.listWrap]}
            ListHeaderComponent={<Header />}
            ListEmptyComponent={<TodoEmpty />}
            stickyHeaderIndices={[0]}
            data={todoList}
            renderItem={({item}) => {
              return (
                <TodoCard
                  isChecked={item.isChecked}
                  name={item.title}
                  onPressCheck={() => updateTodoList(item.id)}
                  onPressComplete={() => deleteTodoList(item.id)}
                />
              );
            }}
          />

          {/* 하단 Todo 입력 input */}
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
    flexGrow: 1,
  },
});

export default ApplyScreen;
