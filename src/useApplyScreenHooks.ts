import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {TodoTestSchema} from './realm/TodoTestSchema';
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
  const updateTodoList = (id: string) => {
    const targetData = realm.objects('todotest').filtered(`id = '${id}'`)[0];
    // console.log('[targetData] : ', targetData);

    realm.write(() => {
      targetData.isChecked = !targetData.isChecked;
    });

    // 수정 후 데이터 갱신
    readTodo();
  };

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
