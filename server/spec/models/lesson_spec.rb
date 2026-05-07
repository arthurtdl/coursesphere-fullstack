require 'rails_helper'

RSpec.describe Lesson, type: :model do
  let(:author) { User.create(name: "Jane Doe", email: "jane@example.com", password: "password123") }
  
  let(:course) do 
    Course.create(
      name: "Mastering React", 
      description: "Frontend framework guide.", 
      start_date: DateTime.now, 
      end_date: DateTime.now + 1.month, 
      status: :published, 
      author: author
    ) 
  end

  describe 'associations' do
    it 'belongs to a course' do
      lesson = Lesson.new(course: course)
      expect(lesson.course).to eq(course)
    end
  end

  describe 'validations' do
    it 'is valid with all attributes' do
      lesson = Lesson.new(
        name: "Introduction to Components",
        description: "Learn how to build reusable UI pieces.",
        video_url: "https://youtube.com/watch?v=example",
        status: :draft,
        course: course
      )
      expect(lesson).to be_valid
    end

    it 'is invalid without a name' do
      lesson = Lesson.new(name: nil)
      expect(lesson).to_not be_valid
      expect(lesson.errors[:name]).to include("can't be blank")
    end

    it 'is invalid without a course' do
      lesson = Lesson.new(course: nil)
      expect(lesson).to_not be_valid
    end
  end

  describe 'enums' do
    it 'defines statuses correctly' do
      lesson = Lesson.new(status: :draft)
      expect(lesson.draft?).to be true
      
      lesson.status = :published
      expect(lesson.published?).to be true
    end
  end
end