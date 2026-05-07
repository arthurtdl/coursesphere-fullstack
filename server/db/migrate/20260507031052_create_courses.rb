# frozen_string_literal: true

class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.integer :status, default: 0, null: false
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
