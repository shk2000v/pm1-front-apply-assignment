# 개발 환경

**디바이스**

- MacBook Pro (Retina, 15-inch, Mid 2015)
  - macOs Monterey 버전 12.7.3

**IDE**

- vscode
- Xcode : Version 14.2 / 시뮬레이터 iOS (14.0)
- Android Studio : Android Studio Hedgehog | 2023.1.1 Patch 1

**리액트 네이티브**

- react-native : 0.73.3
- JDK : Java 17

# 프로젝트 설정

### 추가적으로 설치한 패키지

#### dependencies

- [@react-native-community/netinfo](https://www.npmjs.com/package/@react-native-community/netinfo)
- [dayjs](https://www.npmjs.com/package/dayjs)
- [realm, @realm/react](https://www.npmjs.com/package/@realm/react)
- [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values)

#### devDependencies

- [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)

### 과제

1. ApplyScreen 코드 제거 후 투두리스트 컴포넌트로 변경
   - 동일 디자인 컴포넌트 적용 후 Platform에 따라 다른 스타일 적용
   - TextInput 등의 padiding은 폰트에 따라 다를수있기에 해당 부분은 별도로 적용가능하게 분리
2. UI 구현 : 타이틀 및 날짜
   - Header 컴포넌트 작성후 FlatListHeaderCompoet에 적용
   - 날짜 사용엔 dayjs 사용
   - Navigation Stack의 header components로 적용해도 동일한 경험을 얻지만 가독성과 코드 추적이 용이하게 FlatList에 적용
3. 투두리스트 개발 : 할 일 등록, 완료, 삭제 기능
   - custom hooks로 로직 분리
4. 데이터 관리 : 앱 실행 여부와 상관없이 로컬 내 데이터 유지
   - AsyncStorage, sqlite, Realm중 **Realm** 을 택하여 적용
   - document와 usecase가 많고 지원하는 기능이 많아 채택
5. 사용자 경험 개선 : 키보드 활성화 시 하단 입력 창 동시 이동 처리
   - 키보드 활성화시 KeyboardAvoidingView 컴포넌트로 wrapping 하여 불필요하게 가려지는 일이 없게 방지

### 특이사항 및 이슈사항

- 안드로이드 환경에서 TextInput이 최하단에 위치해 있을때 FlatList에서 stickComponents로 지정된 컴포넌트가 고정되지않고 화면 위로 밀리게 된다.<br />때문에 AndroidManifest.xml에 있는 `android:windowSoftInputMode="adjustUnspecified"`의 값을 `"adjustNothing"`로 변경 후<br>
  KeyboardAvoidingView에 적용된 android의 behavior를 padding으로 변경

- 아이콘 적용을 위해 `react-native-svg-transformer`를 이용하여 프로젝트에 typscript svg가 적용되게 설정 후 Icon Components 를 생성

- SafeAreaView를 사용했지만 ios 환경에서 적용되지않아 Inset 컴포넌트를 별도로 생성하여 ios 환경에 적용되게 설정
