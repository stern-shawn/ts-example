type Todo = {
  text: string;
  done: boolean;
};

type AddTodo = {
  type: 'ADD_TODO';
  text: string;
};

type ToggleTodo = {
  type: 'TOGGLE_TODO';
  index: number;
};

type ReduxAction = AddTodo | ToggleTodo;

const todosReducer = (state: Todo[] = [], action: ReduxAction): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.text, done: false }];

    case 'TOGGLE_TODO':
      return state.map((todo, index) => {
        if (index !== action.index) {
          return todo;
        }

        return {
          text: todo.text,
          done: !todo.done,
        };
      });

    default:
      return state;
  }
};

console.log(
  todosReducer(undefined, {
    type: 'ADD_TODO',
    text: 'give typescript a chance',
  })
);
