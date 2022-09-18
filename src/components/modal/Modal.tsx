import React, { memo, useEffect } from 'react';
import { FC, useRef, useState } from 'react';
import {
  DEFAULT_PRIORITY_VALUE,
  DUE_DATE_ERROR_MESSAGE,
  INPUT_ERROR_MESSAGE,
  LIST_PRIORIRY_VALUE,
} from '../../utilities/const';
import { ITodoThingContent } from '../../utilities/interface';
import './Modal.scss';

interface IModal {
  handleAddNewTodoThing: (todoThing: ITodoThingContent) => void;
}

function getCurrentDate() {
  var today = new Date();

  return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
}

const Modal: FC<IModal> = ({ handleAddNewTodoThing }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const titleInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const descriptionTextAreaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const dueDateInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const selectRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const isValidData = () => {
    let isValid = true;

    const modal = document.querySelector('.modal');
    const addNewTaskInput = modal?.querySelector('.modal__input') as HTMLInputElement;
    const inputErrorMes = modal?.querySelector('.input__error-message') as HTMLParagraphElement;

    const dueDateInput = modal?.querySelector('.due-date input') as HTMLInputElement;
    const dueDateErrorMes = modal?.querySelector('.due-date__error-message') as HTMLParagraphElement;

    if (addNewTaskInput?.value === '') {
      addNewTaskInput.classList.add('error');
      inputErrorMes.innerText = INPUT_ERROR_MESSAGE;
      isValid = false;
    } else {
      addNewTaskInput.classList.remove('error');
      inputErrorMes.innerText = '';
    }

    if (new Date(dueDateInput.value).getTime() - new Date().getTime() < 0) {
      dueDateInput.classList.add('error');
      dueDateErrorMes.innerText = DUE_DATE_ERROR_MESSAGE;
      isValid = false;
    } else {
      dueDateInput.classList.remove('error');
      dueDateErrorMes.innerText = '';
    }

    return isValid;
  };

  const addNewTodoThing = () => {
    console.log(isValidData());
    if (isValidData()) {
      const todoThing = {
        id: String(Date.now()),
        title: titleInputRef.current.value,
        description: descriptionTextAreaRef.current.value,
        dueDate: dueDateInputRef.current.value,
        priority: selectRef.current.value,
      };

      handleAddNewTodoThing(todoThing);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="button__add-new">
        Add New To Do Thing
      </button>
      {isOpen && (
        <div className="modal">
          <div className="modal__content">
            <button className="modal__close-button" onClick={() => setIsOpen(false)}>
              X
            </button>
            <h2>New Task</h2>
            <input className="modal__input" placeholder="Add new task..." ref={titleInputRef} />
            <p className="input__error-message"></p>
            <div className="description">
              <h5>Description</h5>
              <textarea ref={descriptionTextAreaRef} cols={30} rows={5}></textarea>
            </div>

            <div className="modal__other-infor">
              <div className="due-date">
                <h5>Due Date</h5>
                <input type="date" ref={dueDateInputRef} defaultValue={getCurrentDate()} />
              </div>
              <div className="priority">
                <h5>Priority</h5>
                <select ref={selectRef} defaultValue={DEFAULT_PRIORITY_VALUE}>
                  {LIST_PRIORIRY_VALUE.map((opt, index) => {
                    return (
                      <option key={index} value={opt}>
                        {opt}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <p className="due-date__error-message"></p>

            <button onClick={addNewTodoThing}>Add</button>
          </div>
          <div
            className={isOpen ? 'modal__overlay--active' : 'modal__overlay--hidden'}
            onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
};

export default memo(Modal);
