class User < ApplicationRecord
  has_secure_password

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
end
