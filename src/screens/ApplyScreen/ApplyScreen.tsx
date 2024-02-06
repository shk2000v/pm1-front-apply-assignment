import React, {useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Alert, FlatList, Platform, StyleSheet} from 'react-native';
import {KeyboardAvoidingView} from 'native-base';
import Header from '@/components/ApplyScreen/Header';
import Footer from '@/components/ApplyScreen/Footer';
import TodoEmpty from '@/components/Empty/TodoEmpty';
import TodoCard from '@/components/Card/TodoCard';
import Realm from 'realm';
import dayjs from 'dayjs';
import {TodoTestSchema} from '@/realm/TodoTestSchema';

type TodoListType = {
  id: string;
  title: string;
  isChecked: false;
  create_at: string;
};

const ApplyScreen = () => {
  const [todoList, setTodoList] = useState<TodoListType[]>([]);
  const [inputTodo, setInputTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<string[]>([]);

  const onPressCheck = (idx: string) => {
    setSelectedTodo(prev => {
      const result = prev.includes(idx)
        ? prev.filter(i => i !== idx)
        : [idx, ...prev];
      return result;
    });
  };

  const onSubmit = () => {
    if (inputTodo.length > 0) {
      setInputTodo('');
      // realm todo create
      createDB(inputTodo);
    } else {
      Alert.alert('알림', '할일을 적어주세요!', [
        {text: '확인', onPress: () => {}},
      ]);
    }
  };

  // ==================
  // ===[Realm Test]===
  // ==================
  // * relam config
  // The initial schemaVersion is 0.
  const realm = new Realm({
    schema: [TodoTestSchema],
  });
  const readTodo = () => {
    const result = realm.objects('todotest').toJSON() as TodoListType[];
    setTodoList(result);
    // console.log(result);
  };
  const createDB = (title: string) => {
    const id = new Realm.BSON.UUID();
    realm.write(() => {
      realm.create('todotest', {
        id: id.toString(),
        title,
        isChecked: false,
        create_at: dayjs().toString(),
      });
    });
    readTodo();
  };
  const deleteTodoList = (id: string) => {
    const deleteDB = realm.objects('todotest').filtered(`id = '${id}'`)[0];
    realm.write(() => {
      realm.delete(deleteDB);
    });

    // 삭제 후 데이터 갱신
    readTodo();
  };
  // const updateDB = () => {
  //   realm.write (() => {
  //     realm.create('member', {})
  //   })
  // }

  useEffect(() => {
    // const fetchLocalData = readTodo();
    // setTodoList(fetchLocalData);
    readTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            // data={todoData}
            data={todoList}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Header />}
            // ListFooterComponent={
            //   <Footer
            //     value={inputTodo}
            //     setValue={setInputTodo}
            //     onSubmit={onSubmit}
            //   />
            // }
            ListEmptyComponent={<TodoEmpty />}
            stickyHeaderIndices={[0]}
            contentContainerStyle={[styles.listWrap]}
            renderItem={({item}) => {
              const isChecked = selectedTodo.includes(item.id);
              return (
                <TodoCard
                  isChecked={isChecked}
                  name={item.title}
                  onPressCheck={() => onPressCheck(item.id)}
                  onPressComplete={() => deleteTodoList(item.id)}
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
