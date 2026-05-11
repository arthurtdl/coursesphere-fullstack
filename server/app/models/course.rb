# frozen_string_literal: true

class Course < ApplicationRecord
  belongs_to :author, class_name: 'User'

  validates :author, presence: true

  has_many :lessons, dependent: :destroy

  enum status: { draft: 0, published: 1 }

  validates :name, :description, :start_date, :end_date, :status, presence: true
  
  validate :end_date_is_after_start_date

  scope :is_published, -> { where(status: :published) }

  scope :explore_for, ->(user_id) {
    is_published.where.not(author_id: user_id)
  }

  private

  def end_date_is_after_start_date
    return if end_date.blank? || start_date.blank?

    if end_date < start_date
      errors.add(:end_date, "must be equal to or after the start date")
    end
  end
end