# frozen_string_literal: true

module Api
  module V1
    class LessonsController < ApplicationController
      before_action :set_lesson, only: %i[show update destroy]

      # GET /api/v1/lessons
      def index
        lessons = Lesson.includes(:course).all
        render json: LessonRepresenter.new(lessons).as_json
      end

      # GET /api/v1/lessons/:id
      def show
        render json: LessonRepresenter.new(@lesson).as_json
      end

      # POST /api/v1/lessons
      def create
        @lesson = Lesson.new(lesson_params)

        if @lesson.save
          render json: LessonRepresenter.new(@lesson).as_json, status: :created
        else
          render json: @lesson.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/lessons/:id
      def update
        if @lesson.update(lesson_params)
          render json: LessonRepresenter.new(@lesson).as_json
        else
          render json: @lesson.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/lessons/:id
      def destroy
        @lesson.destroy
        head :no_content
      end

      private

      def set_lesson
        @lesson = Lesson.find(params[:id])
      end

      def lesson_params
        params.require(:lesson).permit(:name, :description, :video_url, :status, :course_id)
      end
    end
  end
end
