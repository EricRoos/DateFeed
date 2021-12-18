# frozen_string_literal: true

class CreatePostInteractions < ActiveRecord::Migration[7.1]
  def change
    create_table :post_interactions do |t|
      t.references :profile, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
