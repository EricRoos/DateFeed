# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.text :content
      t.references :profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
