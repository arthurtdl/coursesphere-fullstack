# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'auth/login', to: 'authentication#login'
      resources :users, only: %i[create show update destroy]
      resources :courses do
        get :mine, on: :collection
      end
      resources :lessons
    end
  end

  # Root route
  root to: proc { [200, { 'Content-Type' => 'text/plain' }, ['CourseSphere API is running!']] }
end