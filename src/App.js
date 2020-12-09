import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import Painting from './components/Painting'
// import paintingsData from './painting.json';
// import PaintingList from './components/PaintingList';
// import Section from './components/Section';
// import Panel from './components/Panel';
// import Dropdown from './components/Dropdown';
// import ColorPicker from './components/ColorPicker/ColorPicker';
// import Form from './components/Form/Form'
import TodoList from './components/TodoList';
import initialTodos from '../src/todos.json';
import TodoEditor from './components/TodoEditor';
import TodoFilter from './components/TodoFilter';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
// import Clock from './components/Clock';
// import Tabs from './components/Tabs'
// import tabs from './tabs.json'

class App extends Component {
  /*
    State
    LifeCycles
    CustomMethods
    Render
  */

  state = {
    todos: initialTodos,
    filter: '',
    showModal: false,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  toggteCompleted = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  addTodo = text => {
    console.log(text);
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [newTodo, ...prevState.todos],
    }));

    this.toggleModal();
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizeFilter),
    );
  };

  getCompletedTodoCount = todos => {
    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  //---------------------------------------------------------------
  // componentDidMount(){
  //   // Вызывается после рендера только 1 раз
  //   // Тут ещё можно повесить слушателя на window
  //   console.log('App component Did Mount')
  // }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('todos'))) {
      this.setState({
        todos: JSON.parse(localStorage.getItem('todos')),
      });
    }
  }

  //---------------------------------------------------------------
  // componentDidUpdate(prevProps, prevState, snapshot){
  //   // Этот метод сам знает когда ему работать
  //   // На первом рендере НЕ вызывается
  //   // Вызывается когда приходят новые props или обновится state
  //   // !!! Никогда не вызывать тут this.setState() !!!
  //   console.log('App component Did Update')
  // }
  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      localStorage.setItem('todos', JSON.stringify(nextTodos));
      //console.log("Todos udate");
    }

    // if (
    //   nextTodos.length > prevTodos.length &&
    //   prevTodos.length !== 0
    // ) {
    //   this.toggleModal();
    // }
  }

  //---------------------------------------------------------------
  // componentWillUnmount(){
  //   // Вызывается один раз перед уничтожением компонента
  //   // Тут например можно снимать слушатель события, интервалы
  //   console.log('App component Will Unmount')
  // }
  //---------------------------------------------------------------

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    // this.setState(prevState => ({
    //   showModal: !prevState.showModal
    // }))
  };

  render() {
    //console.log('render App');
    const { todos, showModal, filter } = this.state;

    const completedTodoCount = this.getCompletedTodoCount(todos);

    const visibleTodos = this.getVisibleTodos();

    return (
      <div>
        {/* <Clock /> */}
        {/* <Tabs items={tabs} /> */}
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        <IconButton onClick={this.toggleModal} aria-label="Add todo">
          <AddIcon width="40" height="40" fill="#ffffff" />
        </IconButton>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
        {/* <Form formSubmitHandler={this.formSubmitHandler} /> */}

        <p>Общее количество туду: {todos.length}</p>
        <p>Общее количество выполненых туду: {completedTodoCount}</p>
        {/* <p>Общее количество выполненых туду: {todos.filter(todo => todo.completed).length}</p> */}

        <TodoFilter value={filter} onChangeFilter={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggteCompleted}
        />

        {/* <ColorPicker options={colorPickerOptions} /> */}
        {/* <Dropdown /> */}
        {/* <Panel title="Last News">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          </p>
        </Panel> */}
        {/* <PaintingList paintingList={paintingsData} /> */}
        {/* <Section title="ТОП недели!">
          <PaintingList paintingList={paintingsData} />{' '}
        </Section>
        <Section /> */}
      </div>
    );
  }
}
export default App;
//https://github.com/luxplanjay/react-18/tree/05-%D0%B6%D0%B8%D0%B7%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D1%86%D0%B8%D0%BA%D0%BB

//https://youtu.be/w6MW1szKuT4?t=1457

//Portals
// В индексе под рутом прописать доп id
//https://youtu.be/w6MW1szKuT4?t=1913

// Табы
//https://youtu.be/w6MW1szKuT4?t=3301
