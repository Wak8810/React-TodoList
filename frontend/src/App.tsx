import { useState, useEffect } from 'react'
import type { todo } from "./types/todo.tsx";
import { Checkdelete } from './components/Checkdelete.tsx';
import { TodoCard } from './css/TodoCard.tsx';
import { TodoItem } from './components/TodoItem.tsx';
import { todoService } from './services/todoService';

function App() {
  const [id, setId] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<todo[]>([]);
  const [priority, setPriority] = useState<number>(3);
  const [DelCheck, setDelCheck] = useState<boolean>(false);
  const [DelTodo, setDelTodo] = useState<number>(0);

  // 初期データの取得
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todoService.getAllTodos();
        console.log('Fetched todos:', data); // デバッグ用
        setTodos(data);
        // バックエンドのIDを使用するため、独自のID生成は不要
        // const maxId = Math.max(...data.map(todo => todo.index), 0);
        // setId(maxId + 1);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
        alert('Todoの取得に失敗しました');
      }
    };
    fetchTodos();
  }, []);

  const onClickAdd = async () => {
    if(text === ""){
      alert("No Content");
      return;
    }
    try {
      const newTodo = await todoService.createTodo({
        text,
        priority,
        checked: false,
      });
      setTodos([...todos, newTodo].sort((a, b) => b.priority - a.priority));
      setText("");
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('Todoの作成に失敗しました');
    }
  }

  const onClickDeleteScrean = (id: number) => {
    console.log('Delete screen opened for id:', id); // デバッグ用
    setDelTodo(id);
    setDelCheck(true);
  }

  const onClickDelete = async (id: number) => {
    console.log('Deleting todo with id:', id); // デバッグ用
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      setDelCheck(false);
      alert("削除しました");
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Todoの削除に失敗しました');
    }
  }

  const onClickChecked = async (checktodo: todo) => {
    console.log('Checking todo:', checktodo); // デバッグ用
    try {
      const updatedTodo = await todoService.updateTodo(checktodo.id, {
        checked: !checktodo.checked
      });
      console.log('Updated todo:', updatedTodo); // デバッグ用
      setTodos(todos.map((todo) => 
        todo.id === checktodo.id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Todoの更新に失敗しました');
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 py-3 px-3 mb-4">
        <span className="text-gray-200 font-mono text-2xl tracking-[-2px] font-bold">SIMPLE-TODOLIST</span>
      </nav>
      {DelCheck ? (
        <Checkdelete 
          todo={todos.find((todo) => {
            console.log('Finding todo for deletion:', { DelTodo, todo }); // デバッグ用
            return todo.id === DelTodo;
          })}
          onDelete={onClickDelete}
          onCancel={() => setDelCheck(false)}
        />
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
            {todos.map((todo) => {
              console.log('Rendering todo:', todo); // デバッグ用
              return (
                <TodoItem 
                  key={todo.id}
                  todo={todo}
                  onClickChecked={onClickChecked}
                  onClickDeleteScrean={onClickDeleteScrean}
                  cardClass={TodoCard}
                />
              );
            })}
          </ul>
        </>
      )}
    </>
  )
}

export default App
