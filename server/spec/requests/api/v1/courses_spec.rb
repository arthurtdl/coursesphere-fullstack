# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Courses', type: :request do
  let!(:author) { User.create(name: 'John Doe', email: 'john@example.com', password: 'password123') }

  let(:token) { JsonWebToken.encode(user_id: author.id) }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  let!(:course) do
    Course.create(
      name: 'Basic Ruby',
      description: 'Learn the fundamentals of Ruby.',
      status: :published,
      start_date: DateTime.now,
      end_date: DateTime.now + 1.month,
      author: author
    )
  end

  let(:valid_attributes) do
    {
      course: {
        name: 'Advanced Rails',
        description: 'Mastering API-only applications.',
        status: 'draft',
        start_date: DateTime.now,
        end_date: DateTime.now + 2.months
      }
    }
  end

  describe 'GET /api/v1/courses' do
    it 'returns a list of all courses' do
      get '/api/v1/courses', headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json.size).to eq(1)
      expect(json.first['author']['name']).to eq('John Doe')
    end
  end

  describe 'GET /api/v1/courses/:id' do
    it 'returns the specific course' do
      get "/api/v1/courses/#{course.id}", headers: headers

      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST /api/v1/courses' do
    context 'with valid parameters' do
      it 'creates a new course' do
        expect do
          post '/api/v1/courses', params: valid_attributes, headers: headers
        end.to change(Course, :count).by(1)

        expect(response).to have_http_status(:created)
      end
    end

    context 'without authentication' do
      it 'returns 401 Unauthorized' do
        post '/api/v1/courses', params: valid_attributes
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PATCH /api/v1/courses/:id' do
    it 'updates the course' do
      new_description = 'Updated description.'
      patch "/api/v1/courses/#{course.id}",
            params: { course: { description: new_description } },
            headers: headers

      expect(response).to have_http_status(:ok)
      expect(course.reload.description).to eq(new_description)
    end
  end

  describe 'DELETE /api/v1/courses/:id' do
    it 'removes the course' do
      expect do
        delete "/api/v1/courses/#{course.id}", headers: headers
      end.to change(Course, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
