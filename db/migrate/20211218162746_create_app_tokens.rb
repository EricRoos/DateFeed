# frozen_string_literal: true

class CreateAppTokens < ActiveRecord::Migration[7.1]
  def change
    create_table :app_tokens do |t|
      t.string :token, unique: true
      t.string :app_name, unique: true

      t.timestamps
    end

    add_index :app_tokens, :token
  end
end
