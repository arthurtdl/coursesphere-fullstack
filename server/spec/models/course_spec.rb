require 'rails_helper'

RSpec.describe Course, type: :model do
  let(:user) { User.create(name: "Professor X", email: "profx@cin.ufpe.br", password: "password123") }

  describe 'associations' do
    it 'belongs to an author' do
      course = Course.new(author: user)
      expect(course.author).to eq(user)
      expect(course.author_id).to eq(user.id)
    end
  end

  describe 'validations' do
    it 'is valid with all attributes' do
      course = Course.new(
        name: "Desenvolvimento Web com Rails",
        description: "Aprenda a criar APIs robustas.",
        start_date: DateTime.now,
        end_date: DateTime.now + 1.month,
        status: :draft,
        author: user
      )
      expect(course).to be_valid
    end

    it 'is invalid without a name' do
      course = Course.new(name: nil)
      expect(course).to_not be_valid
      expect(course.errors[:name]).to include("can't be blank")
    end

    it 'is invalid without an author' do
      course = Course.new(author: nil)
      expect(course).to_not be_valid
    end
  end

  describe 'enums' do
    it 'defines statuses correctly' do
      course = Course.new(status: :draft)
      expect(course.draft?).to be true
      
      course.status = :published
      expect(course.published?).to be true
    end
  end
end