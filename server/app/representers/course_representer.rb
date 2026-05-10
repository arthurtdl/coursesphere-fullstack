# frozen_string_literal: true

class CourseRepresenter
  def initialize(courses)
    @courses = courses
  end

  def as_json
    if courses.respond_to?(:map)
      courses.map { |course| format_course(course) }
    else
      format_course(courses)
    end
  end

  private

  attr_reader :courses

  def format_course(course)
    {
      id: course.id,
      name: course.name,
      description: course.description,
      status: course.status,
      start_date: course.start_date,
      end_date: course.end_date,
      author: {
        id: course.author&.id,
        name: course.author&.name || "Autor Desconhecido",
        email: course.author&.email
      }
    }
  end
end