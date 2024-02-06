// import {ObjectSchema} from 'realm';

// export default class TodoTestSchema extends Realm.Object<TodoTestSchema> {
//   id!: string;
//   title!: string;
//   isChecked?: boolean = false;
//   created_at?: Date = new Date();

//   static schema: ObjectSchema = {
//     name: 'todotest',
//     properties: {
//       id: 'string',
//       title: 'string',
//       isChecked: 'bool?',
//       created_at: 'date?',
//     },
//   };
// }

export const TodoTestSchema = {
  name: 'todotest',
  properties: {
    id: 'string',
    title: 'string',
    isChecked: 'bool',
    create_at: 'string',
  },
  primaryKey: 'id',
};
