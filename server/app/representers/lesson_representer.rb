# frozen_string_literal: true

class LessonRepresenter
  def initialize(lessons)
    @lessons = lessons
  end

  def as_json
    if lessons.respond_to?(:map)
      lessons.map { |lesson| format_lesson(lesson) }
    else
      format_lesson(lessons)
    end
  end

  private

  attr_reader :lessons

  def format_lesson(lesson)
    {
      id: lesson.id,
      name: lesson.name,
      description: lesson.description,
      video_url: lesson.video_url,
      status: lesson.status,
      # Course information is included as a nested object
      course: {
        id: lesson.course.id,
        name: lesson.course.name
      }
    }
  end
end
