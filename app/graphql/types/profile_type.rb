module Types
  class ProfileType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :age, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
