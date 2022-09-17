import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import BulkAction from './components/bulkAction/BulkAction';
import Modal from './components/modal/Modal';
import SearchField from './components/searchField/SearchField';
import TodoList from './components/todoList/TodoList';
import { ITodoThingContent } from './utilities/interface';

function App() {
  const [todoList, setTodoList] = useState<ITodoThingContent[]>(() => {
    const localTodoList = localStorage.getItem('todoList');
    return localTodoList ? JSON.parse(localTodoList) : [];
  });

  const [searchValue, setSearchValue] = useState<string>('');
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  useEffect(() => {
    console.log('re-render App');
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleAddNewTodoThing = useCallback((todoThing: ITodoThingContent) => {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];
      newTodoList.push(todoThing);
      return newTodoList;
    });
  }, []);

  const handleRemoveTodoThing = useCallback((id: string) => {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];
      return newTodoList.filter((todoThing) => todoThing.id !== id);
    });
  }, []);

  const handleUpdateTodoThing = useCallback((content: ITodoThingContent) => {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];
      const indexOfUpdateThing = newTodoList.map((todoThing) => todoThing.id).indexOf(content.id);
      newTodoList[indexOfUpdateThing] = content;
      return newTodoList;
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleCheckbox = useCallback((id: string, checked: boolean) => {
    if (checked) {
      setCheckedValues((prevCheckedValues) => {
        const newCheckedValues = [...prevCheckedValues];
        newCheckedValues.push(id);
        return newCheckedValues;
      });
    } else {
      setCheckedValues((prevCheckedValues) => {
        const newCheckedValues = [...prevCheckedValues];
        return newCheckedValues.filter((item) => item !== id);
      });
    }
  }, []);

  const handleRemoveMultiple = useCallback(() => {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];
      return newTodoList.filter((todoThing) => !checkedValues.includes(todoThing.id));
    });
  }, [checkedValues]);

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <Modal handleAddNewTodoThing={handleAddNewTodoThing} />
      {todoList.length > 0 && <SearchField searchValue={searchValue} onSearch={handleSearch} />}
      <TodoList
        todoList={todoList}
        searchValue={searchValue}
        onRemoveTodoThing={handleRemoveTodoThing}
        onUpdateTodoThing={handleUpdateTodoThing}
        onCheckbox={handleCheckbox}
      />
      {checkedValues.length > 0 && todoList.length > 0 && <BulkAction onRemoveMultiple={handleRemoveMultiple} />}
    </div>
  );
}

export default App;
