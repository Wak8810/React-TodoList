class Todo < ApplicationRecord
  validates :text, presence: true
  validates :priority, inclusion: { in: 1..5 }
end
