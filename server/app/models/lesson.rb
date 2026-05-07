# frozen_string_literal: true

class Lesson < ApplicationRecord
  belongs_to :course

  enum status: { draft: 0, published: 1 }

  validates :name, :description, :video_url, :status, presence: true
end
