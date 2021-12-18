# frozen_string_literal: true

class AddHostToAppToken < ActiveRecord::Migration[7.1]
  def change
    add_column :app_tokens, :host, :string
  end
end
