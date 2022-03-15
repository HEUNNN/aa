//각 할 일 항목에 대한 정보를 보여 주는 컴포넌트이다.
//todo 객체를 props로 받아와서 상태에 따라 다른 스타일의 UI를 보여준다.
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import "./TodoListItem.scss";
import React from "react";

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo; // 비구조화 할당
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        <div
          className={checked ? `checkbox checked` : "checkbox"}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove">
          <MdRemoveCircleOutline onClick={() => onRemove(id)} />
        </div>
      </div>
    </div>
  );
};
export default React.memo(TodoListItem);
