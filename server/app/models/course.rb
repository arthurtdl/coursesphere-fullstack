# frozen_string_literal: true

class Course < ApplicationRecord
  belongs_to :author, class_name: 'User'

  has_many :lessons, dependent: :destroy

  enum status: { draft: 0, published: 1 }

  validates :name, :description, :start_date, :end_date, :status, presence: true

  scope :is_published, -> { where(status: :published) }

  scope :explore_for ->(user_id) {
    is_published.where.not(author_id: user_id)
  }

end
