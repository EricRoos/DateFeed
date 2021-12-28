# frozen_string_literal: true

module Types
  class ProfileInputType < Types::BaseInputObject
    argument :age, Integer, 'your age', required: false
    argument :name, String, 'your display name', required: false
  end
end
