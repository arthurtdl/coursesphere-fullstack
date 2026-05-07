# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Courses', type: :request do
  let!(:author) { User.create(name: 'John Doe', email: 'john@example.com', password: 'password123') }
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
        end_date: DateTime.now + 2.months,
        author_id: author.id
      }
    }
  end

  describe 'GET /api/v1/courses' do
    it 'returns a list of all courses with author information' do
      get '/api/v1/courses'

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json.size).to eq(1)
      expect(json.first['name']).to eq('Basic Ruby')
      expect(json.first['author']['name']).to eq('John Doe')
    end
  end

  describe 'GET /api/v1/courses/:id' do
    it 'returns the specific course details' do
      get "/api/v1/courses/#{course.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(course.id)
      expect(json['author']['email']).to eq('john@example.com')
    end
  end

  describe 'POST /api/v1/courses' do
    context 'with valid parameters' do
      it 'creates a new course and returns 201 Created' do
        expect do
          post '/api/v1/courses', params: valid_attributes
        end.to change(Course, :count).by(1)

        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'returns 422 Unprocessable Entity' do
        post '/api/v1/courses', params: { course: { name: '' } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /api/v1/courses/:id' do
    it 'updates the course description' do
      new_description = 'Updated description for testing.'
      patch "/api/v1/courses/#{course.id}", params: { course: { description: new_description } }

      expect(response).to have_http_status(:ok)
      expect(course.reload.description).to eq(new_description)
    end
  end

  describe 'DELETE /api/v1/courses/:id' do
    it 'removes the course from the database' do
      expect do
        delete "/api/v1/courses/#{course.id}"
      end.to change(Course, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
