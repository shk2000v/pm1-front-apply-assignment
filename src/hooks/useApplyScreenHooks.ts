import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {TodoTestSchema} from '../realm/TodoTestSchema';
import {Alert} from 'react-native';
import Realm from 'realm';

type TodoListType = {
  id: string;
  title: string;
  isChecked: false;
  create_at: string;
};
const useApplyScreenHooks = () => {
  const [todoList, setTodoList] = useState<TodoListType[]>([]);
  const [inputTodo, setInputTodo] = useState('');

  // *legacy
  // const [selectedTodo, setSelectedTodo] = useState<string[]>([]);
  // const onPressCheck = (idx: string) => {
  //   setSelectedTodo(prev => {
  //     const result = prev.includes(idx)
  //       ? prev.filter(i => i !== idx)
  //       : [idx, ...prev];
  //     return result;
  //   });
  // };

  // * 입력후 전달하는 sumit function
  const onSubmit = () => {
    if (inputTodo.length > 0) {
      // DB에 입력값 전달
      createDB(inputTodo);
      // 입력 후 input init
      setInputTodo('');
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

  // *TodoList 데이터 Read
  const readTodo = () => {
    const result = realm.objects('todotest').toJSON() as TodoListType[];
    setTodoList(result);
  };

  // *Todolist localDb에 등록
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

  // 데이터 삭제 후 갱신
  const deleteTodoList = (id: string) => {
    const deleteDB = realm.objects('todotest').filtered(`id = '${id}'`)[0];
    realm.write(() => {
      realm.delete(deleteDB);
    });

    readTodo();
  };

  // 데이터 상태 업데이트 후 갱신
  const updateTodoList = (id: string) => {
    const targetData = realm.objects('todotest').filtered(`id = '${id}'`)[0];
    realm.write(() => {
      targetData.isChecked = !targetData.isChecked;
    });

    readTodo();
  };

  // 최초 localDB Read
  useEffect(() => {
    readTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onSubmit,
    deleteTodoList,
    updateTodoList,
    todoList,
    // setTodoList,
    inputTodo,
    setInputTodo,
  };
};

export default useApplyScreenHooks;
