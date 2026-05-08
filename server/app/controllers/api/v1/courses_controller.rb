# frozen_string_literal: true

module Api
  module V1
    class CoursesController < ApplicationController
      before_action :authenticate_request
      before_action :set_course, only: %i[show update destroy]
      before_action :authorize_author, only: %i[update destroy]

      # GET /api/v1/courses
      def index
        courses = Course.includes(:author).all
        render json: CourseRepresenter.new(courses).as_json
      end

      # GET /api/v1/courses/:id
      def show
        render json: CourseRepresenter.new(@course).as_json
      end

      # POST /api/v1/courses
      def create
        @course = current_user.courses.build(course_params)

        if @course.save
          render json: CourseRepresenter.new(@course).as_json, status: :created
        else
          render json: @course.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/courses/:id
      def update
        if @course.update(course_params)
          render json: CourseRepresenter.new(@course).as_json
        else
          render json: @course.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/courses/:id
      def destroy
        @course.destroy
        head :no_content
      end

      private

      def set_course
        @course = Course.find(params[:id])
      end

      def authorize_author
        return if @course.author == current_user

        render json: { error: 'Forbidden: You are not the author of this course' }, status: :forbidden
      end

      def course_params
        params.require(:course).permit(:name, :description, :start_date, :end_date, :status)
      end
    end
  end
end
