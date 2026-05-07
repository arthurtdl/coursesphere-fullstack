# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Lessons', type: :request do
  let!(:author) { User.create(name: 'John Doe', email: 'john@example.com', password: 'password123') }
  let!(:course) do
    Course.create(
      name: 'React Fundamentals',
      description: 'Learn hooks and state.',
      status: :published,
      start_date: DateTime.now,
      end_date: DateTime.now + 1.month,
      author: author
    )
  end
  let!(:lesson) do
    Lesson.create(
      name: 'useState Hook',
      description: 'Managing local state.',
      video_url: 'https://youtube.com/watch?v=123',
      status: :published,
      course: course
    )
  end

  let(:valid_attributes) do
    {
      lesson: {
        name: 'useEffect Hook',
        description: 'Handling side effects.',
        video_url: 'https://youtube.com/watch?v=456',
        status: 'draft',
        course_id: course.id
      }
    }
  end

  describe 'GET /api/v1/lessons' do
    it 'returns a list of all lessons with course info' do
      get '/api/v1/lessons'

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json.size).to eq(1)
      expect(json.first['name']).to eq('useState Hook')
      expect(json.first['course']['name']).to eq('React Fundamentals')
    end
  end

  describe 'GET /api/v1/lessons/:id' do
    it 'returns specific lesson details' do
      get "/api/v1/lessons/#{lesson.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(lesson.id)
      expect(json['video_url']).to eq('https://youtube.com/watch?v=123')
    end
  end

  describe 'POST /api/v1/lessons' do
    context 'with valid parameters' do
      it 'creates a new lesson and returns 201 Created' do
        expect do
          post '/api/v1/lessons', params: valid_attributes
        end.to change(Lesson, :count).by(1)

        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'returns 422 Unprocessable Entity' do
        post '/api/v1/lessons', params: { lesson: { name: '' } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /api/v1/lessons/:id' do
    it 'updates the lesson video_url' do
      new_url = 'https://vimeo.com/789'
      patch "/api/v1/lessons/#{lesson.id}", params: { lesson: { video_url: new_url } }

      expect(response).to have_http_status(:ok)
      expect(lesson.reload.video_url).to eq(new_url)
    end
  end

  describe 'DELETE /api/v1/lessons/:id' do
    it 'removes the lesson from the database' do
      expect do
        delete "/api/v1/lessons/#{lesson.id}"
      end.to change(Lesson, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
