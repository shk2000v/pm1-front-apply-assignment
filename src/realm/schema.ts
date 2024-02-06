export const personSchema = {
  name: 'member',
  properties: {
    name: 'string',
    age: 'string',
    // pets: {type: 'list'},
  },
  primaryKey: 'name',
};

export const TodoSchema = {
  name: 'todo',
  primaryKey: 'id',
  properties: {
    id: 'objectId',
    title: 'string',
    isChecked: 'bool',
    create_at: 'date',
  },
};
