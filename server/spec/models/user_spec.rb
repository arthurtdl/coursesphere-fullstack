require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    it 'is valid with name, email and password' do
      user = User.new(
        name: 'Generic User',
        email: 'generic@cin.ufpe.br',
        password: 'password123'
      )
      expect(user).to be_valid
    end

    it 'is invalid without a name' do
      user = User.new(name: nil)
      expect(user).to_not be_valid
    end

    it 'is invalid with a duplicate email' do
      User.create(name: 'Generic User', email: 'generic@cin.ufpe.br', password: 'password123')
      user_duplicate = User.new(name: 'Another User', email: 'generic@cin.ufpe.br', password: 'password456')

      expect(user_duplicate).to_not be_valid
    end
  end
end