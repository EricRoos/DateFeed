# frozen_string_literal: true

class AppToken < ApplicationRecord
  validates :app_name, uniqueness: true
  validates :token, uniqueness: true
  def self.generate_for; end
end
