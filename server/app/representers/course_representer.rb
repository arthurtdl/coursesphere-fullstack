# frozen_string_literal: true

class CourseRepresenter
  def initialize(courses, options = {})
    @courses = courses
    @include_lessons = options.fetch(:include_lessons, false)
  end

  def as_json
    if courses.respond_to?(:map)
      courses.map { |course| format_course(course) }
    else
      format_course(courses)
    end
  end

  private

  attr_reader :courses, :include_lessons

  def format_course(course)
    data = {
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

    if include_lessons
      data[:lessons] = course.lessons.order(:position).map do |lesson|
        {
          id: lesson.id,
          name: lesson.name, 
          description: lesson.description, 
          video_url: lesson.video_url,
          status: lesson.status,
          position: lesson.position
        }
      end
    end

    data
  end
end