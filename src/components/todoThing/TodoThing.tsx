import { FC, memo, useEffect, useRef, useState } from 'react';
import { LIST_PRIORIRY_VALUE } from '../../utilities/const';
import { ITodoThingContent } from '../../utilities/interface';
import './TodoThing.scss';

export interface ITodoThing {
  id: string;
  todoThingContent: ITodoThingContent;
  onRemoveTodoThing: (id: string) => void;
  onUpdateTodoThing: (content: ITodoThingContent) => void;
  onCheckbox: (id: string, value: boolean) => void;
}

const TodoThing: FC<ITodoThing> = (props) => {
  const { id, todoThingContent, onRemoveTodoThing, onUpdateTodoThing, onCheckbox } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const titleInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const descriptionTextAreaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const dueDateInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const selectRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const updateTodoThing = () => {
    const newContent = {
      id: id,
      title: titleInputRef.current.value,
      description: descriptionTextAreaRef.current.value,
      dueDate: dueDateInputRef.current.value,
      priority: selectRef.current.value,
    };

    onUpdateTodoThing(newContent);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="sub-content">
          <input type="checkbox" ref={checkboxRef} onChange={() => onCheckbox(id, checkboxRef.current.checked)} />
          <span>{todoThingContent.title}</span>
        </div>
        <div className="sub-content">
          <button className="sub-content__detail-button" onClick={() => setIsOpen(!isOpen)}>
            Detail
          </button>
          <button className="sub-content__remove-button" onClick={() => onRemoveTodoThing(id)}>
            Remove
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="infor">
          <input className="infor__title" defaultValue={todoThingContent.title} ref={titleInputRef} />

          <div className="infor__description">
            <h5>Description</h5>
            <textarea
              defaultValue={todoThingContent.description}
              ref={descriptionTextAreaRef}
              cols={30}
              rows={5}></textarea>
          </div>

          <div className="infor__due-date-and-priority">
            <div className="due-date">
              <h5>Due Date</h5>
              <input type="date" ref={dueDateInputRef} defaultValue={todoThingContent.dueDate} />
            </div>
            <div className="priority">
              <h5>Priority</h5>
              <select ref={selectRef} defaultValue={todoThingContent.priority}>
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

          <button className="update" onClick={updateTodoThing}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(TodoThing);
