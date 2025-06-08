class CreateTodos < ActiveRecord::Migration[8.0]
  def change
    create_table :todos do |t|
      t.string :text, null: false
      t.integer :priority, default: 1, limit: 1
      t.boolean :checked, default: false

      t.timestamps
    end

    add_index :todos, :priority
    add_index :todos, :checked
  end
end
