module Api
  module V1
    class TodosController < ApplicationController
      def index
        @todos = Todo.all.order(priority: :asc)
        render json: @todos
      end

      def show
        @todo = Todo.find(params[:id])
        render json: @todo
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Todo not found' }, status: :not_found
      end

      def create
        @todo = Todo.new(todo_params)
        if @todo.save
          render json: @todo, status: :created
        else
          render json: @todo.errors, status: :unprocessable_entity
        end
      end

      def update
        @todo = Todo.find(params[:id])
        if @todo.update(todo_params)
          render json: @todo
        else
          render json: @todo.errors, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Todo not found' }, status: :not_found
      end

      def destroy
        @todo = Todo.find(params[:id])
        @todo.destroy
        head :no_content
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Todo not found' }, status: :not_found
      end

      private

      def todo_params
        params.require(:todo).permit(:text, :priority, :checked)
      end
    end
  end
end
