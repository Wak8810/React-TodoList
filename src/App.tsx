import { useState } from 'react'
import type { todo } from "./types/todo.tsx";
import { Checkdelete } from './components/Checkdelete.tsx';
import { TodoCard } from './css/TodoCard.tsx';
import { TodoItem } from './components/TodoItem.tsx';

function App() {

  const onClickAdd = () => {
    if(text === ""){
      alert("No Content");
      return;
    }
    setId(id+1);
    const newTodo: todo = {
      index: id,
      text,
      priority,
      checked: false,
    };
    const todolist: todo[] = [...todos,newTodo].sort((a, b) => b.priority - a.priority);
    setTodos(todolist);
    setText("");
  }

  const onClickDeleteScrean = (index: number) => {
    setDelTodo(index);
    setDelCheck(true);
  }

  const onClickCancel = () => {
    setDelCheck(false);
  }

  const onClickDelete = (index: number) => {
    setTodos(todos.filter((todo)=>{
      if(todo.index != index){
        return todo;
      }
    }))
    alert("削除しました");
    setDelCheck(false);
  }

  const onClickChecked = (checktodo: todo) => {
    const newTodos = todos.map((todo) => 
      todo.index === checktodo.index ? { ...todo, checked:!todo.checked } : todo
    );
    setTodos(newTodos);
  }
  const [id, setId] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<todo[]>([]);
  const [priority, setPriority] = useState<number>(3);
  const [DelCheck, setDelCheck] = useState<boolean>(false);
  const [DelTodo, setDelTodo] = useState<number>(0);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 py-3 px-3 mb-3">
        <span className="text-gray-200 font-mono text-2xl tracking-[-2px] font-bold">SIMPLE-TODOLIST</span>
      </nav>
      {DelCheck ? (
      <>
        <Checkdelete 
          todo={todos.find((todo) => todo.index === DelTodo)}
          onDelete={onClickDelete}
          onCancel={onClickCancel}
        />
      </>
      ) : (
      <>
        <div className="bg-white w-[55%] px-10 py-6 rounded-2xl shadow-lg border border-gray-200 mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              やること
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Todoを入力" value = {text} onChange={(e) => setText(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              優先度
            </label>
            <div className="flex justify-between">
              <div>
                <input type="range" min="1" max="5" value={priority} onChange={(e) => setPriority(parseInt(e.target.value))}></input>
                <span className="ml-3">
                  {priority}
                </span>
              </div>
              <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClickAdd}>Add</button>
              </div>
            </div>
          </div>
        </div>
        <ul>
          { todos.map((todo) => (
              <TodoItem 
                key={todo.index}
                todo={todo}
                onClickChecked={onClickChecked}
                onClickDeleteScrean={onClickDeleteScrean}
                cardClass={TodoCard}
              />
          ))}
        </ul>
      </>
    )}
    </>
  )
}

export default App
