import React from 'react';
import type { todo } from "../types/todo.js";
import { TodoCard } from '../css/TodoCard.js';
import { getPriorityColor } from "./../utils/bg-color";

type CheckdeleteProps = {
    todo: todo | undefined;  // 削除する todo（undefined の可能性がある）
    onDelete: (id: number) => void;  // 削除する関数
    onCancel: () => void;  // キャンセルする関数
  };

export const Checkdelete: React.FC<CheckdeleteProps> = ({ todo, onDelete, onCancel }) => {
    if(!todo) 
        return (
            <>
                <div className={TodoCard}>
                    <div>エラーです</div>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={ () => onCancel() }>戻る</button>
                </div>
            </>
        )

    return (
        <>
            <div className={TodoCard + `${getPriorityColor(todo.priority)}`}>
                {todo.text}(優先度{todo.priority})
                <div className="flex flex-row justify-between w-[60%] mx-auto mt-4">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={ () => onDelete(todo.id) }>削除</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={ () => onCancel() }>キャンセル</button>
                </div>
            </div>
            
        </>
    )
}