# frozen_string_literal: true

class CourseRepresenter
  def initialize(courses)
    @courses = courses
  end

  # Converts the course to a JSON-friendly format
  def as_json
    if courses.respond_to?(:map)
      courses.map { |course| format_course(course) }
    else
      format_course(courses)
    end
  end

  private

  attr_reader :courses

  # Formats a single course into a hash suitable for JSON serialization
  def format_course(course)
    {
      id: course.id,
      name: course.name,
      description: course.description,
      status: course.status,
      start_date: course.start_date,
      end_date: course.end_date,
      author: {
        # Author information is included as a nested object
        id: course.author.id,
        name: course.author.name,
        email: course.author.email
      }
    }
  end
end
