class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]

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
    @course = Course.new(course_params)

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

  def course_params
    params.require(:course).permit(:name, :description, :start_date, :end_date, :status, :author_id)
  end
end