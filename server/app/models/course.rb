class Course < ApplicationRecord
  belongs_to :author, class_name: 'User'
  
  enum status: { draft: 0, published: 1 }

  validates :name, :description, :start_date, :end_date, :status, presence: true
end