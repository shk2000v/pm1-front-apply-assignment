import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {TodoTestSchema} from '../realm/TodoTestSchema';
import {Alert} from 'react-native';
import Realm from 'realm';
import NetInfo from '@react-native-community/netinfo';

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

  // ===================================
  // *동기화 로직 설계*
  // 로컬 변경 감지 : 앱이 오프라인 상태에서 변경된 데이터를 로컬에 저장
  // 서버와의 동기화 : 네트워크가 연결되면 로컬 변경 사항을 서버와 동기화함
  //
  // *충동 해결 전략*
  // 1. 클라이언트 우선
  // 2. 서버 우선
  // 3. 자동 병합
  // 4. 수동 충돌 해결
  // ===================================
  // Device 인터넷 연결 상태 확인
  NetInfo.addEventListener(state => {
    console.log('Connection type:', state.type);
    console.log('Is connected?', state.isConnected);
  });

  // 변경 내용을 로컬에 저장
  const saveToLocal = changes => {
    realm.write(() => {
      // Save changes to local database
    });
  };

  // 변경 내용 로컬에 저장
  function saveChangesToLocal(changes) {
    // 로컬 데이터베이스에 변경 사항 저장
  }

  // 네트워크 연결 시 서버와 동기화
  // function synchronizeWithServer() {
  //   const changes = getLocalChanges();
  //   sendChangesToServer(changes).then(response => {
  //     // 서버 응답 처리
  //   });
  // }

  // 네트워크 연결 복원 시 서버와 동기화
  // NetInfo.addEventListener(state => {
  //   if (state.isConnected) {
  //     const changes = getChangesFromLocal();
  //     syncWithServer(changes);
  //   }
  // });

  // 서버와 동기화 함수
  const syncWithServer = changes => {
    // Send changes to the server
    // Update local database with server response if needed
  };

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
