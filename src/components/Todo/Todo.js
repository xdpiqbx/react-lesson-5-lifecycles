// import IconButton from '../IconButton';
// import {ReactComponent as DelIcon} from '../../icons/del.svg'

const Todo = ({ completed, text, onToggleCompleted, onDelete }) => {
  return (
    <>
      <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={completed}
        onChange={onToggleCompleted}
      />
      <p className="TodoList__text">{text}</p>
      <button type="button" className="TodoList__btn" onClick={onDelete}>
        Delete
      </button>
      {/* <IconButton>
          <DelIcon width="32" height="32" fill="#ffffff"/>
        </IconButton> */}
    </>
  );
};

export default Todo;
