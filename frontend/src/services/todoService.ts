import type { todo } from "../types/todo";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const API_KEY = import.meta.env.VITE_API_KEY;

export const todoService = {
  // 全Todoの取得
  async getAllTodos(): Promise<todo[]> {
    console.log('Fetching todos from:', API_BASE_URL); // デバッグ用
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    console.log('Fetched todos data:', data); // デバッグ用
    return data;
  },

  // 新しいTodoの作成
  async createTodo(todo: Omit<todo, 'id'>): Promise<todo> {
    console.log('Creating todo:', todo); // デバッグ用
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo }),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    const data = await response.json();
    console.log('Created todo data:', data); // デバッグ用
    return data;
  },

  // Todoの更新
  async updateTodo(id: number, todo: Partial<todo>): Promise<todo> {
    console.log('Updating todo:', { id, todo }); // デバッグ用
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update todo');
    }
    const data = await response.json();
    console.log('Updated todo data:', data); // デバッグ用
    return data;
  },

  // Todoの削除
  async deleteTodo(id: number): Promise<void> {
    console.log('Deleting todo:', id); // デバッグ用
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete todo');
    }
    console.log('Successfully deleted todo:', id); // デバッグ用
  },
}; 