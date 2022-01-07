# frozen_string_literal: true

module Types
  class ProfileSearchInputType < Types::BaseInputObject
    argument :max_age, Integer, 'max age to return', required: false
    argument :min_age, Integer, 'min age to return', required: false
    argument :looking_for, [String], 'looking for', required: false
  end
end
