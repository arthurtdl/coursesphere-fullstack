# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      post 'auth/login', to: 'authentication#login'
      resources :users, only: %i[create show update destroy]
      resources :courses do
        get: :mine, on: :collection
      resources :lessons
    end
  end
end
