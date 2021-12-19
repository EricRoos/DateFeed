# frozen_string_literal: true

module Types
  class ValidationErrorType < Types::BaseObject
    field :field, String, null: false
    field :messages, [String], null: false
  end
end
