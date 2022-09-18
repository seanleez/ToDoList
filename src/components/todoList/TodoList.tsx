import { FC, memo, useEffect } from 'react';
import { ITodoThingContent } from '../../utilities/interface';
import TodoThing from '../todoThing/TodoThing';

interface ITodoList {
  todoList: ITodoThingContent[];
  searchValue: string;
  onRemoveTodoThing: (id: string) => void;
  onUpdateTodoThing: (content: ITodoThingContent) => void;
  onCheckbox: (id: string, value: boolean) => void;
}

const TodoList: FC<ITodoList> = (props) => {
  const { todoList, searchValue, onRemoveTodoThing, onUpdateTodoThing, onCheckbox } = props;

  return (
    <>
      {todoList
        .sort((prevTodoThing, nextTodoThing) => {
          return new Date(prevTodoThing.dueDate).getTime() - new Date(nextTodoThing.dueDate).getTime();
        })
        .filter((todoThing) => todoThing.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((todoThing) => {
          return (
            <TodoThing
              key={todoThing.id}
              id={todoThing.id}
              todoThingContent={todoThing}
              onRemoveTodoThing={onRemoveTodoThing}
              onUpdateTodoThing={onUpdateTodoThing}
              onCheckbox={onCheckbox}
            />
          );
        })}
    </>
  );
};

export default memo(TodoList);
