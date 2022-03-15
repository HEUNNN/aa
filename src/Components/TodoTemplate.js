//화면을 가운데에 정렬 시키며, 일정 관리를 보여준다.
import "./TodoTemplate.scss";
const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};
export default TodoTemplate;
