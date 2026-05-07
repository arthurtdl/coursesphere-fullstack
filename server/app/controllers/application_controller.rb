class ApplicationController < ActionController::API
  def authenticate_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    
    decoded = JsonWebToken.decode(token)
    @current_user = User.find(decoded[:user_id]) if decoded

    unless @current_user
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  attr_reader :current_user
end