# frozen_string_literal: true

class UserRepresenter
  def initialize(user)
    @user = user
  end

  # Returns a JSON representation of the user with only the id, name, and email attributes
  def as_json
    {
      id: user.id,
      name: user.name,
      email: user.email
    }
  end

  private

  # Provides read access to the user instance variable for use in the as_json method
  attr_reader :user
end
