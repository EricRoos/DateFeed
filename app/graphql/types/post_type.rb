# frozen_string_literal: true

module Types
  class PostType < Types::BaseObject
    field :content, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :id, ID, null: false
    field :profile, ProfileType, null: false
    field :profile_id, Integer, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
