# frozen_string_literal: true

class AppToken < ApplicationRecord
  validates_uniqueness_of :app_name
  validates_uniqueness_of :token
  def self.generate_for; end
end
