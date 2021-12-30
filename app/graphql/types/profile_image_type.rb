module Types
  class ProfileImageType < Types::BaseObject
    field :id, ID, null: false
    field :primary, Boolean, null: true
    field :profile_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
