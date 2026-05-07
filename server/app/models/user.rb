# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  # When a user is deleted, their courses will also be deleted
  has_many :courses, foreign_key: 'author_id', dependent: :destroy

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
end
