# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Lessons', type: :request do
  let!(:author) { User.create(name: 'John Doe', email: 'john@example.com', password: 'password123') }
  let(:token) { JsonWebToken.encode(user_id: author.id) }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

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
    it 'returns a list of lessons' do
      get '/api/v1/lessons', headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.first['course']['name']).to eq('React Fundamentals')
    end
  end

  describe 'POST /api/v1/lessons' do
    it 'creates a lesson when user is the course author' do
      expect do
        post '/api/v1/lessons', params: valid_attributes, headers: headers
      end.to change(Lesson, :count).by(1)

      expect(response).to have_http_status(:created)
    end

    it 'returns 403 when user is NOT the course author' do
      other_user = User.create(name: 'Hacker', email: 'hacker@example.com', password: '123')
      other_token = JsonWebToken.encode(user_id: other_user.id)
      other_headers = { 'Authorization' => "Bearer #{other_token}" }

      post '/api/v1/lessons', params: valid_attributes, headers: other_headers
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'DELETE /api/v1/lessons/:id' do
    it 'removes the lesson' do
      expect do
        delete "/api/v1/lessons/#{lesson.id}", headers: headers
      end.to change(Lesson, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
