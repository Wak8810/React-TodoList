import React from "react";
import type { todo } from "../types/todo";
import { getPriorityColor } from "./../utils/bg-color";


type Props = {
  todo: todo;
  onClickChecked: (todo: todo) => void;
  onClickDeleteScrean: (index: number) => void;
  cardClass: string;
};

export const TodoItem: React.FC<Props> = ({ todo, onClickChecked, onClickDeleteScrean, cardClass }) => {
  return (
    <li key={todo.index} style={{ listStyle: "none" }}>
      <div className={cardClass + `${getPriorityColor(todo.priority)}`}>
        <div className="flex flex-row justify-between">
            <span className={todo.checked ? "line-through" : ""}>
                {todo.text}(優先度{todo.priority})
            </span>
        </div>
        <div className="flex flex-row justify-between w-[60%] mx-auto mt-4">
            <button 
            className={(todo.checked ? "bg-gray-500 hover:bg-gray-700" : "bg-blue-500 hover:bg-blue-700") +" text-white font-bold py-2 px-4 rounded ml-4"}
            onClick={() => onClickChecked(todo)}
            >
                {todo.checked ? "未完了" : "完了"}
            </button>
            <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={() => onClickDeleteScrean(todo.index)}
            >
               削除
            </button>
        </div>
      </div>
    </li>
  );
};
