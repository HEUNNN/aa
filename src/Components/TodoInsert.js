//새로운 항목을 입력하고 추가할 수 있는 컴포넌트. state를 통해 인풋의 상태를 관리한다.
import "./TodoInsert.scss";
import { MdAdd } from "react-icons/md";
import { useCallback, useState, useRef } from "react";
const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const inputRef = useRef();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); //submit 이벤트는 브라우저에서 새로고침을 발생시키는데, 이를 방지하기 위함
      if (value.length < 2) {
        inputRef.current.focus();
      } else {
        onInsert(value);
        setValue("");
      }
    },
    [onInsert, value]
  );
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={handleChange}
        ref={inputRef}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};
export default TodoInsert;
