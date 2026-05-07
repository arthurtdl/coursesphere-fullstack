require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  let!(:user) { User.create(name: "Student", email: "student@cin.ufpe.br", password: "password123") }

  let(:valid_attributes) do
    {
      user: {
        name: "Outro Aluno",
        email: "outro_aluno@cin.ufpe.br",
        password: "password123",
        password_confirmation: "password123"
      }
    }
  end

  describe "GET /api/v1/users/:id" do
    it "return the user correctly formatted by the Representer" do
      get "/api/v1/users/#{user.id}"

      expect(response).to have_http_status(:ok)
      
      json = JSON.parse(response.body)
      expect(json['id']).to eq(user.id)
      expect(json['name']).to eq(user.name)
      expect(json['email']).to eq(user.email)
      expect(json).not_to have_key('password_digest')
    end
  end

  describe "POST /api/v1/users" do
    context "with valid parameters" do
      it "creates a new user and returns 201 Created" do
        expect {
          post "/api/v1/users", params: valid_attributes
        }.to change(User, :count).by(1)

        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "does not create the user and returns 422 Unprocessable Entity" do
        post "/api/v1/users", params: { user: { name: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /api/v1/users/:id" do
    it "updates the user's name and returns 200 OK" do
      patch "/api/v1/users/#{user.id}", params: { user: { name: "Nome Editado" } }
      
      expect(response).to have_http_status(:ok)
      
      user.reload 
      expect(user.name).to eq("Nome Editado")
    end
  end

  describe "DELETE /api/v1/users/:id" do
    it "removes the user from the database and returns 204 No Content" do
      expect {
        delete "/api/v1/users/#{user.id}"
      }.to change(User, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end